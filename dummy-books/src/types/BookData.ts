export type BookData = {
    title: string;
    link: string;
    author: string;
    pubDate: string;
    description: string;
    creator?: string;
    isbn: string;
    isbn13: string;
    itemId: number;
    priceSales: number;
    priceStandard: number;
    stockStatus: string;
    mileage: number;
    cover: string;
    categoryId: number;
    categoryName: string;
    publisher: string;
    customerReviewRank: number;
}

export type SaleData = {
    priceSales: number;
    priceStandard: number;
    isSale: boolean;
    percentSale: number;
}