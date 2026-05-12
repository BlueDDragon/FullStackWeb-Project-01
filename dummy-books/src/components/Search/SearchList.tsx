import styles from "@/components/Search/SearchList.module.css"
import books from "@/mocks/mock_books.json"
import SearchItem from "./SearchItem";

export default function SearchList() {
    return (
        <div className={styles.container}>
            {books.item.map((book) => <SearchItem key={book.isbn13} book={book}/>)}
        </div>
    );
}