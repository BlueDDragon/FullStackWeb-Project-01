import { useLoginState } from "@/utils/userUtils";
import ConfirmPopup from "./ConfirmPopup";
import { IsCartDuplicate } from "@/utils/cartUtils";
import { LoginData } from "@/types/UserData";

type CartConfirmProps = {
    // book: BookData;
    isOpen: boolean;
    onOpen: (isOpen: boolean) => void;
    onConfirm?: () => void;
};

export default function CartConfirm({ isOpen, onOpen, onConfirm }: CartConfirmProps) {
    const [isLogined, isVerifyId, login] = useLoginState("0");

  // const isCartDuplicate = IsCartDuplicate(book.isbn13);
  // const info = (isCartDuplicate ? 
  //   `같은 상품이 이미 장바구니에 담겨있습니다.\n장바구니로 이동하시겠습니까?` :
  //   `상품이 장바구니에 담겼습니다.\n장바구니로 이동하시겠습니까?`);

  return (
    <div>
      {isLogined &&
      <ConfirmPopup
        info={ `상품이 장바구니에 담겼습니다.\n장바구니로 이동하시겠습니까?`}
        no={`취소`}
        yes={`이동`}
        routerURL={`/mypage/${(login as LoginData).id}/cart`}
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