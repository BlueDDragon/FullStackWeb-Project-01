import { CartData } from "@/types/CartData";
import { loadData, saveData } from "@/utils/storage/saveload";
import { BookData } from "@/types/BookData";
import { getLogin } from "./userUtils";

export function getCarts() : CartData[] {
    const login = getLogin();
    if (!login || !login.isLogined) return [];

    return loadData<CartData[]>({ type: "Carts", id: login.id }, ("[]"));
}

export function isCartEmpty(carts: CartData[]) {
    return (!carts || !Array.isArray(carts) || carts.length === 0);
}

export function isCartDuplicate(isbn13: string) {
    const carts = getCarts();
    const isEmpty = isCartEmpty(carts);

    if (isEmpty) return isEmpty;

    const isDuplicate = carts.filter((cart) => cart.book.isbn13 === isbn13).length > 0;
    return isDuplicate;
}

export function addCart(selectCart: CartData) {
    const login = getLogin();
    if (!login || !login.isLogined) return;

    const carts = getCarts();
    const isEmpty = isCartEmpty(carts);

    // 기존에 저장된 값이 없을 경우
    if (isEmpty) {
        saveData<CartData[]>({ type: "Carts", id: login.id }, [selectCart]);
        return;
    }

    // 기존에 같은 상품이 존재할 경우
    const isDuplicate = isCartDuplicate(selectCart.book.isbn13);
    if (isDuplicate) {
        carts.map((cart) => {
            if (cart.book.isbn13 === selectCart.book.isbn13) {
                cart.count += selectCart.count;
            }
            return cart;
        });
        saveData<CartData[]>({ type: "Carts", id: login.id }, carts);
        return;
    }

    saveData<CartData[]>({ type: "Carts", id: login.id }, [...carts, selectCart]);
}

export function removeCart(selectBook: BookData) {
    const login = getLogin();
    if (!login || !login.isLogined) return;

    const carts = getCarts();
    const isEmpty = isCartEmpty(carts);

    // 기존에 저장된 값이 없을 경우
    if (isEmpty) {
        return;
    }
    
    const newCarts = carts.filter((cart) => cart.book.isbn13 !== selectBook.isbn13);
    saveData<CartData[]>({ type: "Carts", id: login.id }, newCarts);
}

export function removeCartAll() {
    const login = getLogin();
    if (!login || !login.isLogined) return;

    saveData<CartData[]>({ type: "Carts", id: login.id }, []);
}

export function changeCartCount(selectBook: BookData, count: number) {
    const login = getLogin();
    if (!login || !login.isLogined) return;
    
    const carts = getCarts();
    const isEmpty = isCartEmpty(carts);

    // 기존에 저장된 값이 없을 경우
    if (isEmpty) {
        return;
    }
    
    carts.map((cart) => {
        if (cart.book.isbn13 === selectBook.isbn13) {
            cart.count = count;
        }
        return cart;
    });
    saveData<CartData[]>({ type: "Carts", id: login.id }, carts);
}

export function getCartTotalCount(): number {
  return getCarts()?.reduce((sum, cur) => sum + (cur.count ?? 0), 0) ?? 0;
}