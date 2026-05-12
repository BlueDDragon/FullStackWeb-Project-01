import styles from "./page.module.css";
import BestsellerList from "@/components/Bestseller/BestsellerList";
import BestsellerBanner from "@/components/Bestseller/BestsellerBanner";
import books_ItemNewAll from "@/mocks/mock_ItemNewAll.json";
import books_ItemNewSpecial from "@/mocks/mock_ItemNewSpecial.json";
import books_Bestseller from "@/mocks/mock_Bestseller.json";
import books_BlogBest from "@/mocks/mock_BlogBest.json";
import books from "@/mocks/mock_books.json";
import { BookData } from "@/types/BookData";

export default function Home() {
  return (
    <div>
      <BestsellerBanner />
      <BestsellerList title="전체 신간 리스트" books={books_ItemNewAll.item} />
      <BestsellerList title="주목할 만한 신간 리스트" books={books_ItemNewSpecial.item} />
      <BestsellerList title="이달의 베스트셀러" books={books_Bestseller.item} />
      <BestsellerList title="블로거 선정 베스트셀러" books={books_BlogBest.item} />
    </div>
  );
}
