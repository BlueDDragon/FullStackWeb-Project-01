import styles from "./WishButton.module.css"

type WishButtonProps = {
    isWished: boolean;
    onClick: () => void;
};

export default function WishButton({ isWished, onClick }: WishButtonProps) {
    return (
        <div>
            {isWished ?
            <button className={styles.btn_wish_already}onClick={onClick}>♥</button> :
            <button className={styles.btn_wish} onClick={onClick}>♡</button>}
        </div>
    )
}