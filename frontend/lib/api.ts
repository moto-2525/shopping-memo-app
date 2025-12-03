// lib/api.ts
import { auth } from "@/lib/firebase/config";

/**
 * 認証付きで FastAPI にリクエストを送る関数
 */
export async function fetchWithAuth(
    url: string,
    options: RequestInit = {}
) {
    // Firebase のログインユーザー取得
    const user = auth.currentUser;

    // 未ログインの場合
    if (!user) {
        throw new Error("ログインが必要です");
    }

    // Firebase IDトークン取得
    const token = await user.getIdToken();

    //トークンをAuthorizationヘッダー追加して送信
    const res = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...options.headers,
        },
    });

    return res;
}
