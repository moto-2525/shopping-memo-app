//ログイン、ログアウト機能実装
"use client";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    type User,
    getIdToken,
    setPersistence,
    browserLocalPersistence,
} from 'firebase/auth';
import { auth } from './config';
import { useEffect, useState } from 'react';

//新規登録
export const signup = async (email: string, password: string) => {
    await setPersistence(auth, browserLocalPersistence);
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    return cred.user;
};
//ログイン
export const login = async (email: string, password: string) => {
    await setPersistence(auth, browserLocalPersistence);
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
}
//ログアウト
export const signout = async () => {
    await firebaseSignOut(auth);
};
//IDトークンを取得
export const getIdTokenForBackend = async (): Promise<string | null> => {
    const user = auth.currentUser;
    if (!user) return null;
    return await getIdToken(user, false);
}
//現在のログインユーザー(キャッシュがあればログインできるようにHooksで実装)
export const useAuth = () => {
    const [user, setUser] = useState<User | null>(auth.currentUser);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false)
        });
        return () => unsub();
    }, []);
    return { user, loading };
};