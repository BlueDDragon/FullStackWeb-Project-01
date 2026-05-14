import ConfirmPopup from "./ConfirmPopup";

type OrderConfirmProps = {
    count: number;
    isOpen: boolean;
    onOpen: (isOpen: boolean) => void;
    onConfirm: () => void;
};

export default function OrderConfirm({ count, isOpen, onOpen, onConfirm }: OrderConfirmProps) {
  return (
    <div>
      <ConfirmPopup
        info={`${count}개의 상품을 주문하시겠어요?`}
        no={`취소`}
        yes={`주문`}
        routerURL={`/mypage/0/order`}
        isOpen={isOpen}
        onOpen={onOpen}
        onConfirm={onConfirm}
      />
    </div>
  );
}