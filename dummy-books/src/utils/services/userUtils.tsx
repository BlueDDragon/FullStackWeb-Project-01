import { LoginData, UserData } from "@/types/UserData";
import { loadData, saveData } from "@/utils/storage/saveload";
import crypto from "crypto";
import { useEffect, useState } from "react";

// 비밀번호 해시 생성
const SALT_LENGTH = 16;
function hashPassword(password: string) {
    const salt = crypto.randomBytes(SALT_LENGTH).toString("hex");
    const hash = crypto
        .createHash("sha256")
        .update(password + salt)
        .digest("hex");

    return `${salt}:${hash}`;
}

// 비밀번호 검증
function verifyPassword(password: string, storedPassword: string) {
    const [salt, originalHash] = storedPassword.split(":");
    const hash = crypto
        .createHash("sha256")
        .update(password + salt)
        .digest("hex");

    return hash === originalHash;
}

export function getUsers(): UserData[] {
    return loadData<UserData[]>({ type: "Users" }, ("[]"));
}

export function isUsersEmpty(users: UserData[]) {
    return (!users || !Array.isArray(users) || users.length === 0);
}

export function isUserIdDuplicate(id: string) {
    const users = getUsers();
    const isEmpty = isUsersEmpty(users);

    if (isEmpty) return false;

    const isUserIdDuplicate = users.filter((user) => user.id === id).length > 0;
    return isUserIdDuplicate;
}

export function addUser(id: string, pw: string, uname: string) {
    const newUser: UserData = {
        id: id,
        password: hashPassword(pw),
        nickname: uname,
    };

    const users = getUsers();
    const isEmpty = isUsersEmpty(users);

    // 기존에 저장된 값이 없을 경우
    if (isEmpty) {
        saveData<UserData[]>({ type: "Users" }, [newUser]);
        return;
    }

    // 기존에 같은 아이디가 존재할 경우
    const isDuplicate = isUserIdDuplicate(id);
    if (isDuplicate) {
        return;
    }

    saveData<UserData[]>({ type: "Users" }, [...users, newUser]);
}

export function getLogin(): LoginData {
    return loadData<LoginData>({ type: "Login" }, ("{}"));
}

export function isLoginEmpty(login: LoginData): boolean {
    return (!login);
}

export function loginUser(id: string, pw: string) {
    if (isAlreadyLogin()) return false;

    const users = getUsers();
    const isEmpty = isUsersEmpty(users);

    if (isEmpty) return false;

    for (let idx = 0; idx < users.length; idx++) {
        if (users[idx].id !== id) continue;
        if (!verifyPassword(pw, users[idx].password)) continue;

        setLogin(idx, users[idx]);
        return true;
    }
    
    return false;
}

export function isAlreadyLogin() {
    const login = getLogin();
    const isEmpty = isLoginEmpty(login);

    if (isEmpty) return false;
    if (!login.isLogined) return false;

    return true;
}

export function setLogin(idx: number, user: UserData) {
    if (isAlreadyLogin()) return false;

    const newLogin: LoginData = {
        isLogined: true,
        idx: idx,
        id: user.id,
        nickname: user.nickname,
    };

    saveData<LoginData>({ type: "Login" }, newLogin);
}

export function logoutUser() {
    if (!isAlreadyLogin()) return;

    const newLogin: LoginData = {
        isLogined: false,
        idx: 0,
        id: "0",
        nickname: "",
    };

    saveData<LoginData>({ type: "Login" }, newLogin);
}

export function useLoginState(id: string) {
    const [login, setLogin] = useState<LoginData>({ isLogined: false, idx: 0, id: "0", nickname: "" });
    useEffect(() => { setLogin(getLogin()); }, []);
    const isLogined = !isLoginEmpty(login) && login.isLogined;
    const isVerifyId = login.isLogined && login.id === id;

    return { isLogined, isVerifyId, login };
}