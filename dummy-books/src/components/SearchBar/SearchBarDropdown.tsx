import styles from "@/components/SearchBar/SearchBarDropdown.module.css"
import { BookData } from "@/types/BookData";
import mocks_books from "@/mocks/mock_books.json"
import SearchBarDropdownItem from "./SearchBarDropdownItem";
import { fetchItemSearch } from "@/utils/fetchServer";
import { useEffect, useState } from "react";

type SearchBarDropdownProps = {
    books: BookData[];
}

export default function SearchBarDropdown({ books }: SearchBarDropdownProps) {
    // const books = [mocks_books.item[0], mocks_books.item[1], mocks_books.item[2], mocks_books.item[3]];

    return (
        <div className={styles.container}>
            {books.map((book, idx) => <SearchBarDropdownItem key={idx} book={book}/>)}
        </div>
    );
}