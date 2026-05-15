import ConfirmPopup from "./ConfirmPopup";
import { IsCartDuplicate } from "@/utils/cartUtils";

type CartConfirmProps = {
    // book: BookData;
    isOpen: boolean;
    onOpen: (isOpen: boolean) => void;
    onConfirm?: () => void;
};

export default function CartConfirm({ isOpen, onOpen, onConfirm }: CartConfirmProps) {
  // const isCartDuplicate = IsCartDuplicate(book.isbn13);
  // const info = (isCartDuplicate ? 
  //   `같은 상품이 이미 장바구니에 담겨있습니다.\n장바구니로 이동하시겠습니까?` :
  //   `상품이 장바구니에 담겼습니다.\n장바구니로 이동하시겠습니까?`);

  return (
    <div>
      <ConfirmPopup
        info={ `상품이 장바구니에 담겼습니다.\n장바구니로 이동하시겠습니까?`}
        no={`취소`}
        yes={`이동`}
        routerURL={`/mypage/0/cart`}
        isOpen={isOpen}
        onOpen={onOpen}
        onConfirm={onConfirm}
      />
    </div>
  );
}