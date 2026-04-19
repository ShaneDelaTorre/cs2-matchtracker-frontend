import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function getAccessToken(): string | null {
  return Cookies.get("access") ?? null;
}

type FetchOptions = {
  method?: string;
  body?: object;
  requiresAuth?: boolean;
};

export async function apiRequest<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { method = "GET", body, requiresAuth = true } = options;

  console.log("API REQUEST:", {
    url: `${BASE_URL}${endpoint}`,
    method,
    body,
  });

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (requiresAuth) {
    const token = getAccessToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) return undefined as T;

  if (!res.ok) {
    let errorMessage = `Request failed: ${res.status}`;

    try {
      const errorData = await res.json();

      errorMessage =
        errorData.detail ||
        Object.values(errorData).flat().join(" ") ||
        errorMessage;

      console.error("API ERROR:", {
        endpoint,
        status: res.status,
        errorData,
      });
    } catch {
      console.error("API ERROR: No JSON response", res.status);
    }

    throw new Error(`[${endpoint}] ${errorMessage}`);
  }

  return res.json();
}
