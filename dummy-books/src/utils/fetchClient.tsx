import type { ItemListResponse, ItemLookUpResponse, ItemSearchResponse } from "@/types/ApiData";
import type { BookData } from "@/types/BookData"
import mock_books from "@/mocks/mock_books.json"
import { useEffect } from "react";

async function fetchData<T>(url: string) : Promise<T | undefined> {
    console.log(`fetch: ${url}`);

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error();

        const data = await response.json();
        if (!data || data === null || data === undefined) throw new Error();

        return data;
    }
    catch (error) {
        console.log(error);
        return undefined;
    }
}

export function fetchItemSearch(setData: (data: BookData[]) => void, q: string, maxResults: number = 10) {
    useEffect(() => {
      if (!q.trim()) {
        setData([]);
        return;
      }

      const timer = setTimeout(async () => {
        const data = await fetchData(`/api/search?q=${q}&maxResults=${maxResults}`) as ItemSearchResponse;
        setData(data.item || []);
      }, 300);

      return () => clearTimeout(timer);
    }, [q]);
}

export function fetchItemLookUpByISBN13(setData: (data: BookData[]) => void, isbn13: number) {
    useEffect(() => {
      if (!isbn13) {
        setData([]);
        return;
      }

      const fetchAPI = async () => {
        const data = await fetchData(`/api/detail?q=${isbn13}`) as ItemLookUpResponse;
        setData(data.item || []);
      };

      fetchAPI();
    }, [isbn13]);
}