import { createContext } from "react";

export type SearchViewContextType = { viewType: "detail" } | { viewType: "simple" };

export const SearchViewContext = createContext<SearchViewContextType>( {
    viewType: "detail",
});