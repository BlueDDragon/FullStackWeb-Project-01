import { useLoginState } from "@/utils/services/userUtils";
import ConfirmPopup from "./ConfirmPopup";

type CartConfirmProps = {
    isOpen: boolean;
    onOpen: (isOpen: boolean) => void;
};

export default function LoginConfirm({ isOpen, onOpen }: CartConfirmProps) {
    const { isLogined, isVerifyId, login } = useLoginState("0");

    return (
        <div>
            {!isLogined &&
            <ConfirmPopup
                info={ `로그인 후 이용 가능합니다.`}
                no={`취소`}
                yes={`로그인`}
                routerURL={`/login`}
                isOpen={isOpen}
                onOpen={onOpen}
            />}
        </div>
    );
}