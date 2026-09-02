export class ApiRequestError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly url: string,
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}

export const isApiNotFoundError = (error: unknown): boolean =>
  error instanceof ApiRequestError && error.status === 404;

export const getData = async ({
  url,
  headers = {},
  cache,
  throwOnError = false,
}: {
  url: string;
  headers?: Record<string, string>;
  cache?: RequestCache;
  throwOnError?: boolean;
}) => {
  const normalizedUrl = url.startsWith("/") ? url : `/${url}`;
  const requestUrl = `${process.env.NEXT_PUBLIC_API_URL}${normalizedUrl}`;

  try {
    const resourceTag = `api:${normalizedUrl.split("?")[0]}`;

    const requestInit: RequestInit & {
      next?: { revalidate?: number; tags?: string[] };
    } = {
      headers,
    };

    if (cache === "no-store") {
      requestInit.cache = "no-store";
    } else {
      requestInit.next = {
        revalidate: 300,
        tags: [...new Set([`api:${normalizedUrl}`, resourceTag])],
      };
    }

    const response = await fetch(
      requestUrl,
      requestInit,
    );

    if (!response.ok) {
      const error = new ApiRequestError(
        `API request failed with status ${response.status}`,
        response.status,
        requestUrl,
      );
      if (throwOnError) throw error;
      console.error("getData error:", error);
      return { data: null };
    }

    return await response.json();
  } catch (error) {
    if (throwOnError) throw error;
    console.error("getData error: ", error);
    return { data: null };
  }
};
