import styles from "./page.module.css";
import BestsellerList from "@/components/Bestseller/BestsellerList";
import BestsellerBanner from "@/components/Bestseller/BestsellerBanner";
import { fetchItemList } from "@/utils/fetchServer";

export default async function Home() {
  const books_ItemNewSpecial = await fetchItemList(`ItemNewSpecial`);
  const books_ItemNewAll = await fetchItemList(`ItemNewAll`);
  const books_Bestseller = await fetchItemList(`Bestseller`);
  const books_BlogBest = await fetchItemList(`BlogBest`);

  return (
    <div>
      <BestsellerBanner title="주목할 만한 신간 리스트 👍" books={books_ItemNewSpecial}/>
      <BestsellerList title="전체 신간 리스트 💐" books={books_ItemNewAll} />
      <BestsellerList title="이달의 베스트셀러 🩵" books={books_Bestseller} />
      <BestsellerList title="블로거 선정 베스트셀러 🖥️" books={books_BlogBest} />
    </div>
  );
}
