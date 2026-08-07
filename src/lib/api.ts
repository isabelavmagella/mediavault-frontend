const BASE_URL = import.meta.env.VITE_API_URL;

type opcoes = {
    method?: string;
    body?: unknown;
    headers?: Record<string, string>;
}

export async function fetchData(caminho : string, options? : opcoes) {
    const url = `${BASE_URL}${caminho}`;
    const { method = "POST", body, headers = {} } = options || {};
    const finalHeaders = {
        "Content-Type": "application/json",
        ...headers
    }
    const response = await fetch(url, { method, ...(!!body && { body: JSON.stringify(body) }), headers: finalHeaders });

    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}