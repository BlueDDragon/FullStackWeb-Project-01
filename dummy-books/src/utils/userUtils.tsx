import { LoginData, UserData } from "@/types/UseData";
import { LoadData, SaveData } from "./saveload";
import crypto from "crypto";

// 비밀번호 해시 생성
const SALT_LENGTH = 16;
function HashPassword(password: string) {
    const salt = crypto.randomBytes(SALT_LENGTH).toString("hex");
    const hash = crypto
        .createHash("sha256")
        .update(password + salt)
        .digest("hex");

    return `${salt}:${hash}`;
}

// 비밀번호 검증
function VerifyPassword(password: string, storedPassword: string) {
    const [salt, originalHash] = storedPassword.split(":");
    const hash = crypto
        .createHash("sha256")
        .update(password + salt)
        .digest("hex");

    return hash === originalHash;
}

export function GetUsers(): UserData[] {
    return LoadData<UserData[]>({ type: "Users" }, ("[]"));
}

export function IsUsersEmpty(users: UserData[]) {
    return (!users || !Array.isArray(users) || users.length === 0);
}

export function IsUserIdDuplicate(id: string) {
    const users = GetUsers();
    const isUsersEmpty = IsUsersEmpty(users);

    if (isUsersEmpty) return false;

    const isUserIdDuplicate = users.filter((user) => user.id === id).length > 0;
    return isUserIdDuplicate;
}

export function AddUser(id: string, pw: string, uname: string) {
    const newUser: UserData = {
        id: id,
        password: HashPassword(pw),
        nickname: uname,
    };

    const users = GetUsers();
    const isUsersEmpty = IsUsersEmpty(users);

    // 기존에 저장된 값이 없을 경우
    if (isUsersEmpty) {
        SaveData<UserData[]>({ type: "Users" }, [newUser]);
        return;
    }

    // 기존에 같은 아이디가 존재할 경우
    const isUserIdDuplicate = IsUserIdDuplicate(id);
    if (isUserIdDuplicate) {
        return;
    }

    SaveData<UserData[]>({ type: "Users" }, [...users, newUser]);
}

export function GetLogin(): LoginData {
    return LoadData<LoginData>({ type: "Login" }, ("{}"));
}

export function IsLoginEmpty(login: LoginData) {
    return (!login);
}

export function Login(id: string, pw: string) {
    if (IsAlreadyLogin()) return false;

    const users = GetUsers();
    const isUsersEmpty = IsUsersEmpty(users);

    if (isUsersEmpty) return false;

    for (let idx = 0; idx < users.length; idx++) {
        if (users[idx].id !== id) continue;
        if (!VerifyPassword(pw, users[idx].password)) continue;

        SetLogin(idx, users[idx]);
        return true;
    }
    
    return false;
}

export function IsAlreadyLogin() {
    const login = GetLogin();
    const isLoginEmpty = IsLoginEmpty(login);

    if (isLoginEmpty) return false;
    if (!login.isLogined) return false;

    return true;
}

export function SetLogin(idx: number, user: UserData) {
    if (IsAlreadyLogin()) return false;

    const newLogin: LoginData = {
        isLogined: true,
        idx: idx,
        id: user.id,
        nickname: user.nickname,
    };

    SaveData<LoginData>({ type: "Login" }, newLogin);
}

export function Logout() {

}