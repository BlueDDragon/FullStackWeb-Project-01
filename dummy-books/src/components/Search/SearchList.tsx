import styles from "@/components/Search/SearchList.module.css"
import SearchItem from "./SearchItem";
import { BookData } from "@/types/BookData";

type SearchListProps = {
    books: BookData[];
}

export default function SearchList({ books }: SearchListProps) {
    return (
        <div className={styles.container}>
            {books.map((book) => <SearchItem key={book.isbn13} book={book}/>)}
        </div>
    );
}