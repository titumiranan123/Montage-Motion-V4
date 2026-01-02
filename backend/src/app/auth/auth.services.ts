/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import config from "../../config";
import { db } from "../../db/db";
import { errorLogger, logger } from "../../logger/logger";
import ApiError from "../../utils/ApiError";
import { checkUser } from "../../utils/checkUser";
import { generateVerificationCode } from "../../utils/generateVerificationCode";
import { sendVerificationEmail } from "../../utils/sendVerificationEmail";
import { IUser, UserLoginHistory } from "./auth.interface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const authService = {
  async createUser(data: IUser) {
    const client = await db.connect();
    await client.query("BEGIN");

    try {
      const { name, email, password } = data;

      if (!name || !email || !password) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "MISSING_FIELDS",
          "Name, email, and password are required."
        );
      }

      const exists = await checkUser(email);
      if (exists) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "USER_ALREADY_EXISTS",
          "User already exists with this email."
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationToken = generateVerificationCode();
      const verificationTokenExpiresAt = new Date(
        Date.now() + 24 * 60 * 60 * 1000
      );

      // Create user
      const userResult = await client.query(
        `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
        [name, email, hashedPassword]
      );

      const userId = userResult.rows[0].id;

      // Store verification token
      await client.query(
        `INSERT INTO user_dynamic_data 
         (user_id, verification_token, verification_token_expires_at, updated_at) 
         VALUES ($1, $2, $3, $4)`,
        [userId, verificationToken, verificationTokenExpiresAt, new Date()]
      );

      await client.query("COMMIT");

      await sendVerificationEmail({ name, email, code: verificationToken });

      return userResult.rows[0];
    } catch (error: any) {
      await client.query("ROLLBACK");
      errorLogger.error("User creation failed:", error);
      throw error instanceof ApiError
        ? error
        : new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            "USER_CREATION_FAILED",
            "Failed to create user"
          );
    } finally {
      client.release();
    }
  },

  async verifyToken(code: string) {
    const client = await db.connect();
    try {
      await client.query("BEGIN");

      const result = await client.query(
        `SELECT user_id FROM user_dynamic_data 
         WHERE verification_token = $1 
         AND verification_token_expires_at > NOW() 
         FOR UPDATE LIMIT 1`,
        [code]
      );

      if (result.rowCount === 0) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          "INVALID_OR_EXPIRED_TOKEN",
          "Invalid or expired verification code"
        );
      }

      const userId = result.rows[0].user_id;

      const updatedUser = await client.query(
        `UPDATE users SET verified = true WHERE id = $1 RETURNING id, name, email, verified`,
        [userId]
      );

      await client.query(
        `UPDATE user_dynamic_data 
         SET verification_token = NULL, verification_token_expires_at = NULL 
         WHERE user_id = $1`,
        [userId]
      );

      await client.query("COMMIT");
      return updatedUser.rows[0];
    } catch (error: any) {
      await client.query("ROLLBACK");
      errorLogger.error("Email verification failed:", error);
      throw error instanceof ApiError
        ? error
        : new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            "VERIFICATION_FAILED",
            "Email verification failed"
          );
    } finally {
      client.release();
    }
  },

  async login(
    data: { email: string; password: string },
    logData: Partial<UserLoginHistory>
  ) {
    const client = await db.connect();
    let loginSuccessful = false;

    try {
      const result = await client.query(
        `SELECT * FROM users WHERE email = $1`,
        [data.email]
      );

      if (result.rowCount === 0) {
        throw new ApiError(
          httpStatus.NOT_FOUND,
          "USER_NOT_FOUND",
          "No account found with this email"
        );
      }

      const user = result.rows[0];

      // Uncomment when needed
      // if (!user.verified) {
      //   throw new ApiError(httpStatus.FORBIDDEN, "EMAIL_NOT_VERIFIED", "Please verify your email first", "ইমেইল ভেরিফাই করুন");
      // }

      const isPasswordValid = await bcrypt.compare(
        data.password,
        user.password
      );
      if (!isPasswordValid) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          "INVALID_CREDENTIALS",
          "Invalid email or password"
        );
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        config.jwt_secret as string,
        { expiresIn: "24h" }
      );

      loginSuccessful = true;

      const loginLog = {
        user_id: user.id,
        device: logData.device,
        browser: logData.browser,
        ip_address: logData.ip_address,
        location: logData.location,
        is_successful: true,
        login_time: new Date(),
      };

      logger.info("Login successful", loginLog);
      await this.logUserLogin(loginLog);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        verified: user.verified,
        status: user.status,
        token,
      };
    } catch (error: any) {
      errorLogger.error("Login failed:", error);
      throw error instanceof ApiError
        ? error
        : new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            "LOGIN_FAILED",
            "Login failed. Please try again."
          );
    } finally {
      if (!loginSuccessful && data.email) {
        try {
          await this.logUserLogin({
            user_id: data.email,
            device: logData.device,
            browser: logData.browser,
            ip_address: logData.ip_address,
            location: logData.location,
            is_successful: false,
            login_time: new Date(),
          });
        } catch (logError) {
          errorLogger.error("Failed to log failed login attempt:", logError);
        }
      }
      client.release();
    }
  },

  async allUsers() {
    try {
      const res = await db.query(
        "SELECT id, name, email, role, verified, status, created_at FROM users ORDER BY created_at DESC"
      );
      return res.rows;
    } catch (error: any) {
      errorLogger.error("Error fetching users:", error);
      throw new ApiError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "FETCH_USERS_FAILED",
        "Failed to fetch users"
      );
    }
  },

  async makeAdmin(id: string) {
    const client = await db.connect();
    try {
      await client.query("BEGIN");

      const result = await client.query(
        `UPDATE users SET role = 'ADMIN' WHERE id = $1 RETURNING id, name, email, role`,
        [id]
      );

      if (result.rowCount === 0) {
        throw new ApiError(
          httpStatus.NOT_FOUND,
          "USER_NOT_FOUND",
          "User not found"
        );
      }

      await client.query("COMMIT");
      return result.rows[0];
    } catch (error: any) {
      await client.query("ROLLBACK");
      errorLogger.error("Make admin failed:", error);
      throw error instanceof ApiError
        ? error
        : new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            "MAKE_ADMIN_FAILED",
            "Failed to update user role"
          );
    } finally {
      client.release();
    }
  },

  async logUserLogin(data: Partial<UserLoginHistory>) {
    const query = `
      INSERT INTO user_login_history 
      (user_id, device, browser, ip_address, login_time, location, is_successful)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    try {
      const res = await db.query(query, [
        data.user_id ?? null,
        data.device ?? null,
        data.browser ?? null,
        data.ip_address ?? null,
        data.login_time ?? new Date(),
        data.location ?? null,
        data.is_successful ?? false,
      ]);
      return res.rows[0];
    } catch (error) {
      errorLogger.error("Failed to save login history:", error);
      // Don't throw here — login should not fail because of logging
    }
  },

  async deleteUser(id: string) {
    const client = await db.connect();
    try {
      await client.query("BEGIN");

      await client.query(`DELETE FROM user_dynamic_data WHERE user_id = $1`, [
        id,
      ]);
      await client.query(`DELETE FROM user_login_history WHERE user_id = $1`, [
        id,
      ]);

      const result = await client.query(
        `DELETE FROM users WHERE id = $1 RETURNING id`,
        [id]
      );

      if (result.rowCount === 0) {
        throw new ApiError(
          httpStatus.NOT_FOUND,
          "USER_NOT_FOUND",
          "User not found"
        );
      }

      await client.query("COMMIT");
      return true;
    } catch (error: any) {
      await client.query("ROLLBACK");
      errorLogger.error("Delete user failed:", error);
      throw error instanceof ApiError
        ? error
        : new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            "DELETE_USER_FAILED",
            "Failed to delete user"
          );
    } finally {
      client.release();
    }
  },
};

export const findUserByEmail = async (email: string) => {
  const res = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  return res.rows[0] || null;
};

export const findUserById = async (id: string) => {
  const res = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  return res.rows[0] || null;
};
