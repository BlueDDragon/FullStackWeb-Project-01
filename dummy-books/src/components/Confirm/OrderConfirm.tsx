import { useLoginState } from "@/utils/userUtils";
import ConfirmPopup from "./ConfirmPopup";
import { LoginData } from "@/types/UserData";

type OrderConfirmProps = {
    count: number;
    isOpen: boolean;
    onOpen: (isOpen: boolean) => void;
    onConfirm: () => void;
};

export default function OrderConfirm({ count, isOpen, onOpen, onConfirm }: OrderConfirmProps) {
    const [isLogined, isVerifyId, login] = useLoginState("0");
    
  return (
    <div>
      {isLogined &&
      <ConfirmPopup
        info={`${count}개의 상품을 주문하시겠어요?`}
        no={`취소`}
        yes={`주문`}
        routerURL={`/mypage/${(login as LoginData).id}/order`}
        isOpen={isOpen}
        onOpen={onOpen}
        onConfirm={onConfirm}
      />}
      
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