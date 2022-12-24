export const REQUESTS = {
  SERVER: {
    PING: "/healthcheck",
  },
  AUTH: {
    GET_LINK: "/auth/link",
    GET_TOKEN: "/auth/token",
  },
};

type Methods = "POST" | "GET";

type Payload = {
  query?: Record<string, string>;
  body?: Record<string, string>;
};

const _fetch = async <T>(
  req: string,
  method?: Methods,
  payload?: Payload
): Promise<T | undefined> => {
  const query = new URLSearchParams(payload?.query);

  const result = await fetch(req + "?" + query, {
    method: method || "GET",
    body: JSON.stringify(payload?.body),
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
