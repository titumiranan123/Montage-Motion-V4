import { Router } from "express";
import {
  getAllAboutData,
  getAllBlogs,
  getAllhomeData,
  getAllServicesData,
  getSingleBlogs,
} from "./homeapi.controller";
import { getAllServiceSectionsType } from "../homeservice/homeservice.controller";

const webRoute = Router();
webRoute.get("/website/data", getAllhomeData);
webRoute.get("/website/services/data", getAllServicesData);
webRoute.get("/website/about", getAllAboutData);
webRoute.get("/website/blog", getAllBlogs);
webRoute.get("/website/blog/:slug", getSingleBlogs);
webRoute.get("/website/service/type", getAllServiceSectionsType);

export default webRoute;
