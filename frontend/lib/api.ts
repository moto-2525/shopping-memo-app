// ログイン中のIDトークンを取得してAPIに送る

import { getAuth } from "firebase/auth";

export async function fetchWithAuth() {
    const auth = getAuth()
    const token = await auth.currentUser?.getIdToken
    const res = await fetch("http://localhost:8000/shopping_lists", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    return res.json()

}