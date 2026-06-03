import { WishData } from "@/types/WishData";
import { loadData, saveData } from "@/utils/storage/saveload";
import { BookData } from "@/types/BookData";
import { getLogin } from "./userUtils";

export function getWish() : WishData{
    const login = getLogin();
    if (!login || !login.isLogined) return { books: [] };

    return loadData<WishData>({ type: "Wish", id: login.id }, ("{}"));
}

export function isWishEmpty(wish: WishData) {
    return (!wish || !wish.books || wish.books.length === 0);
}

export function isWishAlready(isbn13: string) {
    const wish = getWish();
    const isEmpty = isWishEmpty(wish);
    if (isEmpty) return !isEmpty;

    const isAlready = wish.books.filter((book) => book.isbn13 === isbn13).length > 0;
    return isAlready;
}

export function addWish(selectBook: BookData) {
    const login = getLogin();
    if (!login || !login.isLogined) return;

    const wish = getWish();
    const isEmpty = isWishEmpty(wish);
    
    // 기존에 저장된 값이 없을 경우
    if (isEmpty) {
        console.log("isWishEmpty");
        saveData<WishData>({ type: "Wish", id: login.id }, { books: [selectBook, ] });
        return;
    }

    // 기존에 같은 상품이 존재할 경우
    const isAlready = isWishAlready(selectBook.isbn13);
    if (isAlready) {
        console.log("isWishAlready");
        return;
    }

    saveData<WishData>({ type: "Wish", id: login.id }, { books: [...wish.books, selectBook] });
}

export function removeWish(selectBook: BookData) {
    const login = getLogin();
    if (!login || !login.isLogined) return;

    const wish = getWish();
    const isEmpty = isWishEmpty(wish);

    // 기존에 저장된 값이 없을 경우
    if (isEmpty) {
        return;
    }
    
    const newWish = { books: wish.books.filter((book) => book.isbn13 !== selectBook.isbn13) };
    saveData<WishData>({ type: "Wish", id: login.id }, newWish);
}

export function toggleWish(book: BookData) {
    if (isWishAlready(book.isbn13)) {
        removeWish(book);
        return false;
    }

    addWish(book);
    return true;
}
