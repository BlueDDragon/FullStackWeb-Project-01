import styles from "@/components/Home/BestsellerItem.module.css"
import Image from "next/image";
import { BookData } from "@/types/BookData";
import Link from "next/link";

type BestsellerItemProps = {
    book: BookData;
}

export default function BestsellerItem({ book }: BestsellerItemProps) {
    return (
        <div className={styles.container}>
            <Link href={(`/detail/${book.isbn13}`)}>
                <Image className={styles.cover} src={book.cover} width={100} height={150} alt=""/>
                <span className={styles.title}>{book.title}</span>
            </Link>
        </div>
    );
}