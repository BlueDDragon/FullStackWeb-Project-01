import { CartData } from "@/types/CartData";
import { LoadData, SaveData } from "@/utils/storage/saveload";
import { BookData } from "@/types/BookData";
import { GetLogin } from "./userUtils";

export function GetCarts() : CartData[] {
    const login = GetLogin();
    if (!login || !login.isLogined) return [];

    return LoadData<CartData[]>({ type: "Carts", id: login.id }, ("[]"));
}

export function IsCartEmpty(carts: CartData[]) {
    return (!carts || !Array.isArray(carts) || carts.length === 0);
}

export function IsCartDuplicate(isbn13: string) {
    const carts = GetCarts();
    const isCartsEmpty = IsCartEmpty(carts);

    if (isCartsEmpty) return isCartsEmpty;

    const isCartDuplicate = carts.filter((cart) => cart.book.isbn13 === isbn13).length > 0;
    return isCartDuplicate;
}

export function AddCart(selectCart: CartData) {
    const login = GetLogin();
    if (!login || !login.isLogined) return;

    const carts = GetCarts();
    const isCartsEmpty = IsCartEmpty(carts);

    // 기존에 저장된 값이 없을 경우
    if (isCartsEmpty) {
        SaveData<CartData[]>({ type: "Carts", id: login.id }, [selectCart]);
        return;
    }

    // 기존에 같은 상품이 존재할 경우
    const isCartDuplicate = IsCartDuplicate(selectCart.book.isbn13);
    if (isCartDuplicate) {
        carts.map((cart) => {
            if (cart.book.isbn13 === selectCart.book.isbn13) {
                cart.count += selectCart.count;
            }
            return cart;
        });
        SaveData<CartData[]>({ type: "Carts", id: login.id }, carts);
        return;
    }

    SaveData<CartData[]>({ type: "Carts", id: login.id }, [...carts, selectCart]);
}

export function RemoveCart(selectBook: BookData) {
    const login = GetLogin();
    if (!login || !login.isLogined) return;

    const carts = GetCarts();
    const isCartsEmpty = IsCartEmpty(carts);

    // 기존에 저장된 값이 없을 경우
    if (isCartsEmpty) {
        return;
    }
    
    const newCarts = carts.filter((cart) => cart.book.isbn13 !== selectBook.isbn13);
    SaveData<CartData[]>({ type: "Carts", id: login.id }, newCarts);
}

export function RemoveCartAll() {
    const login = GetLogin();
    if (!login || !login.isLogined) return;

    SaveData<CartData[]>({ type: "Carts", id: login.id }, []);
}

export function ChangeCartCount(selectBook: BookData, count: number) {
    const login = GetLogin();
    if (!login || !login.isLogined) return;
    
    const carts = GetCarts();
    const isCartsEmpty = IsCartEmpty(carts);

    // 기존에 저장된 값이 없을 경우
    if (isCartsEmpty) {
        return;
    }
    
    carts.map((cart) => {
        if (cart.book.isbn13 === selectBook.isbn13) {
            cart.count = count;
        }
        return cart;
    });
    SaveData<CartData[]>({ type: "Carts", id: login.id }, carts);
}

export function GetCartTotalCount(): number {
  return GetCarts()?.reduce((sum, cur) => sum + (cur.count ?? 0), 0) ?? 0;
}