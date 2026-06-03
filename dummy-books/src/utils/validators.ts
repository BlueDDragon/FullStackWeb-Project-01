import { isUserIdDuplicate } from "@/utils/services/userUtils";

export function validateId(id: string) {
    if (!id || id === null || id === "" || id === undefined)
        return '아이디 입력은 필수입니다.';

    if (id.search(/\s/) != -1) 
        return '아이디는 빈 칸을 포함할 수 없습니다.';

    if (id.length < 6 || id.length > 30)
        return '아이디는 영문 및 숫자 6~30자 입니다.';

    var specialCheck = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    if (specialCheck.test(id))
        return '아이디는 특수문자를 포함할 수 없습니다.';

    const koreanCheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    if (koreanCheck.test(id))
        return '아이디는 한글을 포함할 수 없습니다.';

    const isDuplicate = isUserIdDuplicate(id);
    if (isDuplicate)
        return '아이디가 중복되어 사용할 수 없습니다.';

    return '';
}

export function validatePassword(password: string, rePassword: string) {
    if (!password || password === null || password === "" || password === undefined)
        return '비밀번호 입력은 필수입니다.';
    
    if (password.search(/\s/) != -1) 
        return '비밀번호는 빈 칸을 포함할 수 없습니다.';

    if (password.length < 8 || password.length > 20)
        return '비밀번호는 영문 및 숫자 8~16자 입니다.';

    var specialCheck = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    if (!specialCheck.test(password))
        return '비밀번호는 특수문자를 포함해야합니다.';

    const koreanCheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    if (koreanCheck.test(password))
        return '비밀번호는 한글을 포함할 수 없습니다.';

    if (!rePassword || rePassword === null || rePassword === "" || rePassword === undefined || rePassword != password)
        return '비밀번호가 일치하지 않습니다.';

    return '';
}

export function validateNickname(nickname: string) {
    if (!nickname || nickname === null || nickname === "" || nickname === undefined)
        return '닉네임 입력은 필수입니다.';

    // if (nickname.search(/\s/) != -1) 
    //     return '닉네임은 빈 칸을 포함할 수 없습니다.';

    if (nickname.length < 2 || nickname.length > 20)
        return '닉네임은 한글, 영문 및 숫자 2~20자 입니다.';

    return '';
}
