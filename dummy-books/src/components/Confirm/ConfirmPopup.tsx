'use client';

import styles from "@/components/Confirm/ConfirmPopup.module.css"
import { usePathname, useRouter } from "next/navigation";

type ConfirmPopupProps = {
    info: string;
    no: string;
    yes: string;
    routerURL: string;
    isOpen: boolean;
    onOpen: (isOpen: boolean) => void;
    onConfirm?: () => void;
};

export default function ConfirmPopup({ info, no, yes, routerURL, isOpen, onOpen, onConfirm = () => {} }: ConfirmPopupProps) {
  const router = useRouter();

  const handleClickNo = () => {
    onOpen(false);
  };

  const handleClickYes = () => {
    onOpen(false);
    onConfirm();

    if (routerURL) {
      router.push(routerURL);
    }
  };

  return (
    <div>
      {isOpen && (
        <div className={styles.container}>
          <div className={styles.box}>
            <p className={styles.confirm}>{info}</p>
            <div className={styles.btns}>
              <button className={styles.btn_no} onClick={handleClickNo}>
                {no}
              </button>
              <button className={styles.btn_yes} onClick={handleClickYes}>
                {yes}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}