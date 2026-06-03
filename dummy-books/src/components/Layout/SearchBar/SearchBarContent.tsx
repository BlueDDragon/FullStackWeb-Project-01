'use client';

import styles from "@/components/Layout/SearchBar/SearchBar.module.css"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";
import SearchBarDropdown from "./SearchBarDropdown";
import { fetchItemSearch } from "@/utils/api/fetchClient";
import { BookData } from "@/types/BookData";
import CartConfirm from "@/components/Confirm/CartConfirm";

export default function SearchBarContent() {
    // 라우터 정보
    const query = useSearchParams().get('q');

    // 검색어 업데이트 - input 입력
    const [search, setSearch] = useState('');
    const handleChangeSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }, []);

    // 검색 정보
    const [books, setBooks] = useState<BookData[]>([]);
    fetchItemSearch(setBooks, search, 4);

    // 검색 실행 - enter 입력
    const handleSubmitKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSubmitSearch();
    }, [search, query]);
    // 검색 실행 - 버튼
    const router = useRouter();
    const handleSubmitSearch = useCallback(() => {
        console.log(`search: ${search}`);
        console.log(`query: ${query}`);
        if (!search || query === search) return;
        router.push(`/search?q=${search}&page=${1}`);
    }, [search, query]);

    // 드롭다운 상태
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleDropdownFocus = useCallback(() => {
        setIsDropdownOpen(true);
    }, []);
    const handleDropdownBlur = useCallback(() => {
        setTimeout(() => {
            setIsDropdownOpen(false);
        }, 150);
    }, []);

    // 장바구니 확인창
    const [isCartConfirm, setIsCartConfirm] = useState(false);
    const handleCartOpen = useCallback(() => {
      setIsCartConfirm(true);
    }, []);

    return (
      <div className={styles.container}>
        <div className={styles.search_container}>
          <div className={styles.search}>
            {/* <button className={styles.btn_searchcategory}>통합검색 ▼</button> */}
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
            {isDropdownOpen && books.length > 0 && <SearchBarDropdown books={books} onCartOpen={handleCartOpen} />}
          </div>
        </div>
        <div className={styles.confirm}>
          <CartConfirm isOpen={isCartConfirm} onOpen={setIsCartConfirm} />
        </div>
      </div>
    );
}