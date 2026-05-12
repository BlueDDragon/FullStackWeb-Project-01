'use client';

import styles from "@/components/SearchBar.module.css"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function SearchBar() {
    const [search, setSearch] = useState('');

    const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const router = useRouter();
    const query = useSearchParams().get('q');
    const handleSubmitSearch = () => {
        if (!search || query === search) return;
        router.push(`/search?q=${search}`);
    };

    return (
        <div className={styles.search}>
          <button className={styles.btn_searchcategory}>통합검색▼</button>
          <input
            className={styles.input_searchbar}
            placeholder="도서 검색"
            onChange={handleChangeSearch}
          ></input>
          <Image
            className={styles.img_search}
            src="/images/search.png"
            width={20}
            height={20}
            alt=""
            onClick={handleSubmitSearch}
          />
        </div>
    );
}