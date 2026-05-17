import styles from "@/app/detail/[id]/detail.module.css"
import { fetchItemLookUpByISBN13 } from "@/utils/fetchServer";
import Empty from "@/components/Empty/Empty";
import DeatilBook from "@/components/Detail/DetailBook";

export default async function Page({ params }: { params: Promise<{ id: string }>}) {
    const { id } = await params;
    const books = await fetchItemLookUpByISBN13(parseInt(id));

    const isBooksEmpty = (!books || books.length === 0);
    if (isBooksEmpty) {
        return <Empty info="상품을 불러오고 있습니다."/>;
    }

    return (
        <div>
            <DeatilBook book={books[0]} />
        </div>
    );
}