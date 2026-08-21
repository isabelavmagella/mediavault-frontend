const BASE_URL = import.meta.env.VITE_API_URL;

type opcoes = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
};

export class ApiError extends Error {
  status: number;
  body?: unknown;

  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

// type UnauthorizedHandler = () => void;
// let onUnauthorized: UnauthorizedHandler | null = null;
// export function setUnauthorizedHandler(fn: UnauthorizedHandler): void{
//   onUnauthorized = fn;
// }

export async function fetchData<T>(
  caminho: string,
  options?: opcoes,
): Promise<T> {
  const url = `${BASE_URL}${caminho}`;
  const { method = "POST", body, headers = {} } = options || {};
  const finalHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };
  const response = await fetch(url, {
    method,
    ...(!!body && { body: JSON.stringify(body) }),
    headers: finalHeaders,
  });

  if (!response.ok) {
    let body: unknown;
    let message = response.statusText;

    try {
      body = await response.json();
      if (typeof body === "object" && body !== null && "message" in body){
        message = String(body.message);
      }
    } catch {
        // corpo não é JSON; mantém o fallback
    }
    throw new ApiError(message, response.status, body);
  }
  return response.json();
}
