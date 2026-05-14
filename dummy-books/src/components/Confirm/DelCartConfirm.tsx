import ConfirmPopup from "./ConfirmPopup";

type DelCartConfirmProps = {
    isOpen: boolean;
    onOpen: (isOpen: boolean) => void;
    onConfirm: () => void;
};

export default function DelCartConfirm({ isOpen, onOpen, onConfirm }: DelCartConfirmProps) {
  return (
    <div>
      <ConfirmPopup
        info={`선택 상품을 삭제하시겠어요?`}
        no={`취소`}
        yes={`삭제`}
        routerURL={``}
        isOpen={isOpen}
        onOpen={onOpen}
        onConfirm={onConfirm}
      />
    </div>
  );
}