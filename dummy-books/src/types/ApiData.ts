import { BookData } from "./BookData";

export interface ItemSearchResponse {
    version: string;
    title: string;
    link: string;
    pubDate: string;
    imageUrl: string;
    totalResults: number;
    startIndex: number;
    itemsPerPage: number;
    query: string;
    searchCategoryId: number;
    searchCategoryName: string;
    item: BookData[];
}
