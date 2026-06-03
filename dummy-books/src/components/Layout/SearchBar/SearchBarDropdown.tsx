import styles from "@/components/Layout/SearchBar/SearchBarDropdown.module.css"
import { BookData } from "@/types/BookData";
import SearchBarDropdownItem from "./SearchBarDropdownItem";

type SearchBarDropdownProps = {
    books: BookData[];
    onCartOpen: () => void;
}

export default function SearchBarDropdown({ books, onCartOpen }: SearchBarDropdownProps) {
  return (
    <div className={styles.container}>
      {books.map((book, idx) => (
        <SearchBarDropdownItem key={idx} book={book} onCartOpen={onCartOpen} />
      ))}
    </div>
  );
}