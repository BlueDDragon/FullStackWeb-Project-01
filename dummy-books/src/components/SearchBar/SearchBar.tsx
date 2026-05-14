'use client';

import styles from "@/components/SearchBar/SearchBar.module.css"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import SearchBarDropdown from "./SearchBarDropdown";
import { fetchItemSearch } from "@/utils/fetchClient";
import { BookData } from "@/types/BookData";

export default function SearchBar() {
    const [search, setSearch] = useState('');
    const router = useRouter();
    const query = useSearchParams().get('q');

    const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    const handleSubmitKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') handleSubmitSearch();
    };

    const handleSubmitSearch = () => {
        if (!search || query === search) return;
        router.push(`/search?q=${search}`);
    };

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownFocus = () => {
        setIsDropdownOpen(true);
    };

    const handleDropdownBlur = () => {
        setTimeout(() => {
            setIsDropdownOpen(false);
        }, 150);
    };

    const [books, setBooks] = useState<BookData[]>([]);
    fetchItemSearch(setBooks, search, 4);

    return (
      <div className={styles.search_container}>
        <div className={styles.search}>
          <button className={styles.btn_searchcategory}>통합검색 ▼</button>
          <input
            className={styles.input_searchbar}
            placeholder="도서 검색"
            onChange={handleChangeSearch}
            onKeyDown={handleSubmitKeyDown}
            onFocus={handleDropdownFocus}
            onBlur={handleDropdownBlur}
          />
          <Image
            className={styles.img_search}
            src="/images/search.png"
            width={20}
            height={20}
            alt=""
            onClick={handleSubmitSearch}
          />
        </div>

        <div className={styles.dropdown}>
          {isDropdownOpen && books.length > 0 && <SearchBarDropdown books={books} />}
        </div>
      </div>
    );
}