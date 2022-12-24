export const REQUESTS = {
  SERVER: {
    PING: "/healthcheck",
  },
  AUTH: {
    GET_LINK: "/auth/link",
    GET_TOKEN: "/auth/token",
  },
  STORAGE: {
    FILES: "/storage/files",
    SHARE_FILE: "/storage/share",
    GET_SHARED_FILES: "/storage/shared-files",
    GET_LINKS: "/storage/links",
  },
};

type Methods = "POST" | "GET";

type Payload = {
  query?: Record<string, string>;
  body?: FormData;
};

export const _fetch = async <T>(
  req: string,
  method?: Methods,
  payload?: Payload
): Promise<T | undefined> => {
  const query = new URLSearchParams(payload?.query);

  const headers: Record<string, string> = {};

  const id = localStorage.getItem("id");

  if (id) {
    headers["X-USER-ID"] = id;
  }

  if (payload?.body) {
    headers["Content-type"] = "multipart/form-data";
  }

  const result = await fetch(req + "?" + query, {
    method: method || "GET",
    body: payload?.body,
    headers: { ...headers },
  });

  if (!result.ok) {
    let err = new Error("HTTP status code: " + result.status);
    throw err;
  }

  return result.json() as T;
};

export const pingServer = async () => {
  const result = await _fetch<{ message: string }>(REQUESTS.SERVER.PING);

  return result?.message;
};

export const getAuthLink = async () => {
  const result = await _fetch<{ link: string }>(REQUESTS.AUTH.GET_LINK, "GET", {
    query: { redirectUri: "http://localhost:4000/auth/token" },
  });

  return result?.link;
};

export const getUserEntity = async (code: string) => {
  const result = await _fetch<{ link: string }>(
    REQUESTS.AUTH.GET_TOKEN,
    "GET",
    {
      query: { code },
    }
  );

  return result;
};

export const getFiles = async (folder?: string) => {
  return await _fetch<{ id: string; name: string; mimeType: string }[]>(
    REQUESTS.STORAGE.FILES,
    "GET",
    folder
      ? {
          query: { folder },
        }
      : {}
  );
};

export const getSharedFiles = async () => {
  return await _fetch<
    { driveId: string; downloads: number; id: number; driveLink: string }[]
  >(REQUESTS.STORAGE.GET_SHARED_FILES, "GET");
};

export const getLinks = async () => {
  return await _fetch<{ id: number; link: string }[]>(
    REQUESTS.STORAGE.GET_LINKS,
    "GET"
  );
};
