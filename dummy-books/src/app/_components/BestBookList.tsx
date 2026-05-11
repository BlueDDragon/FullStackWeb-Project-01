import mock_books from "@/app/_mocks/mock_books.json"
import { BookData } from "../_types/BookData";
import BestBookItem from "./BestBookItem";

export default function BestBookList() {
    const books: BookData[] = mock_books.item;

    return (
        <div>
            <h4>이달의 베스트셀러</h4>
            {books.map((book) => <BestBookItem key={book.itemId} book={book}/>)}
        </div>
    );
}