import styles from "@/components/Empty/Empty.module.css"

type EmptyProps = {
    info: string;
}

export default function Empty({ info = `비어 있습니다.` }: EmptyProps) {
    return (
        <div className={styles.container}>
            <div className={styles.mark}>!</div>
            <div className={styles.info}>{info}</div>
        </div>
    );
}