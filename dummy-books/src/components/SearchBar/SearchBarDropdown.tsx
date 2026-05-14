import styles from "@/components/SearchBar/SearchBarDropdown.module.css"
import { BookData } from "@/types/BookData";
import SearchBarDropdownItem from "./SearchBarDropdownItem";

type SearchBarDropdownProps = {
    books: BookData[];
}

export default function SearchBarDropdown({ books }: SearchBarDropdownProps) {
    return (
        <div className={styles.container}>
            {books.map((book, idx) => <SearchBarDropdownItem key={idx} book={book}/>)}
        </div>
    );
}