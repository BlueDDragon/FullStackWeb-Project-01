import styles from "@/components/Bestseller/BestsellerList.module.css"
import mock_books from "@/mocks/mock_books.json"
import { BookData } from "@/types/BookData";
import BestsellerItem from "@/components/Bestseller/BestsellerItem";

type BestsellerListProps = {
    title: string;
    books: BookData[];
}

export default function BestsellerList({ title, books }: BestsellerListProps) {
    return (
        <div className={styles.list}>
            <h4 className={styles.title}>{title}</h4>
            {books.map((book) => <BestsellerItem key={book.itemId} book={book}/>)}
        </div>
    );
}