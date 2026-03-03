// lib/http.ts
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthToken = () => localStorage.getItem("auth_token") || "";

const getHeaders = () => {
  const token = getAuthToken();
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    // DO NOT set Content-Type here; set per-request when needed
  };
};

export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const baseHeaders = getHeaders();

  // Merge headers but strip Content-Type if body is FormData
  const isFormData = options?.body instanceof FormData;
  const mergedHeaders: Record<string, string> = {
    ...baseHeaders,
    ...(options?.headers as Record<string, string> | undefined),
  };

  if (isFormData) {
    // Let browser add multipart/form-data; boundary
    delete mergedHeaders["Content-Type"];
  } else {
    // Default JSON when not sending FormData and not already specified
    if (!("Content-Type" in mergedHeaders)) {
      mergedHeaders["Content-Type"] = "application/json";
    }
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: mergedHeaders,
  });

  if (!response.ok) {
    let errMsg = `HTTP error! status: ${response.status}`;
    try {
      const errData = await response.json();
      if (errData?.message) errMsg = errData.message;
    } catch {
      /* ignore */
    }
    throw new Error(errMsg);
  }

  // ✅ Handle empty response
  if (response.status === 204 || response.status === 205) {
    return {} as T;
  }

  const text = await response.text();
  if (!text) return {} as T;

  const data = JSON.parse(text);
  if (data?.status === "success" && "data" in data) {
    if (data.app_order) {
      return data;
    }
    return data.data as T;
  }
  return data as T;
}
