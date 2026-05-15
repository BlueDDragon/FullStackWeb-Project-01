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
    adult: boolean;
    cover: string;
    categoryId: number;
    categoryName: string;
    publisher: string;
    customerReviewRank: number;
    subInfo: {
        subTitle: string;
        originalTitle: string;
        itemPage: number;
        ratingInfo: {
            ratingScore: number;
            ratingCount: number;
            commentReviewCount: number;
            myReviewCount: number;
        }
    }
}

export type SaleData = {
    priceSales: number;
    priceStandard: number;
    isSale: boolean;
    percentSale: number;
}