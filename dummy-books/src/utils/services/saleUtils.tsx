import { BookData, SaleData } from "@/types/BookData";

export function getSaleData({ priceSales, priceStandard }: BookData) : SaleData {
    return {
        priceSales: priceSales,
        priceStandard: priceStandard,
        isSale: (priceSales != priceStandard),
        percentSale: Math.round(((priceStandard - priceSales) / priceStandard) * 100),
    };
}

export function getSaleTotalPrice({ priceSales, priceStandard }: BookData, count: number) {
    return (priceSales != priceStandard ? priceSales : priceStandard) * count;
}