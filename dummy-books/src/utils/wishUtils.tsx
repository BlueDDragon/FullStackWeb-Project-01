import { WishData } from "@/types/WishData";
import { LoadData, SaveData } from "./saveload";
import { BookData } from "@/types/BookData";

export function GetWish() : WishData{
    return LoadData<WishData>({ type: "Wish" }, ("{}"));
}

export function IsWishEmpty(wish: WishData) {
    return (!wish || !wish.books || wish.books.length === 0);
}

export function IsWishAlready(isbn13: string) {
    const wish = GetWish();
    const isWishEmpty = IsWishEmpty(wish);

    if (isWishEmpty) return !isWishEmpty;

    const isWishAlready = wish.books.filter((book) => book.isbn13 === isbn13).length > 0;
    return isWishAlready;
}

export function AddWish(selectBook: BookData) {
    const wish = GetWish();
    const isWishEmpty = IsWishEmpty(wish);
    
    // 기존에 저장된 값이 없을 경우
    if (isWishEmpty) {
        console.log("isWishEmpty");
        SaveData<WishData>({ type: "Wish" }, { books: [selectBook, ] });
        return;
    }

    // 기존에 같은 상품이 존재할 경우
    const isWishAlready = IsWishAlready(selectBook.isbn13);
    if (isWishAlready) {
        console.log("isWishAlready");
        return;
    }

    SaveData<WishData>({ type: "Wish" }, { books: [...wish.books, selectBook] });
}

export function RemoveWish(selectBook: BookData) {
    const wish = GetWish();
    const isWishEmpty = IsWishEmpty(wish);

    // 기존에 저장된 값이 없을 경우
    if (isWishEmpty) {
        return;
    }
    
    const newWish = { books: wish.books.filter((book) => book.isbn13 !== selectBook.isbn13) };
    SaveData<WishData>({ type: "Wish" }, newWish);
}

export function ToggleWish(book: BookData) {
    if (IsWishAlready(book.isbn13)) {
        RemoveWish(book);
        return false;
    }

    AddWish(book);
    return true;
}
