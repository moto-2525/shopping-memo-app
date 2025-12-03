//IDトークンを付与して、バックエンドAPIを呼び出すための汎用的なfetch関数
import { getIdTokenForBackend } from "./firebase/auth";

/** Authorization header を付けて fetch */
export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = await getIdTokenForBackend();
    const headers = new Headers(options.headers ?? {});
    if (token) headers.set("Authorization", `Bearer ${token}`);
    headers.set("Content-Type", "application/json");
    const res = await fetch(url, { ...options, headers, credentials: "include" });
    if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
    return res.json();
};
