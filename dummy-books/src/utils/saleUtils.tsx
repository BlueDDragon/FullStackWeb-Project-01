import { BookData, SaleData } from "@/types/BookData";

export function GetSaleData({ priceSales, priceStandard }: BookData) : SaleData {
    return {
        priceSales: priceSales,
        priceStandard: priceStandard,
        isSale: (priceSales != priceStandard),
        percentSale: Math.round(((priceStandard - priceSales) / priceStandard) * 100),
    };
}