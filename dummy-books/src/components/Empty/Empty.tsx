import styles from "@/components/Empty/Empty.module.css"

export default function Empty() {
    return (
        <div className={styles.container}>
            <div className={styles.mark}>!</div>
            <div className={styles.info}>비어 있습니다.</div>
        </div>
    );
}