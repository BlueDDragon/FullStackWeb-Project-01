import { BookData } from "./BookData";

export type ItemSearchResponse = {
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
};

export type ItemListResponse = {
    version: string;
    logo: string;
    title: string;
    link: string;
    pubDate: string;
    totalResults: number;
    startIndex: number;
    itemsPerPage: number;
    query: string;
    searchCategoryId: number;
    searchCategoryName: string;
    item: BookData[];
};

export type ItemLookUpResponse = {
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
};