import Image from "next/image";
import { BookData } from "../_types/BookData";

type BestBookItemProps = {
    book: BookData;
}

export default function BestBookItem({ book }: BestBookItemProps) {
    return (
        <div>
            <Image src={book.cover} width={100} height={150} alt=""/>
            <span>{book.title}</span>
        </div>
    );
}