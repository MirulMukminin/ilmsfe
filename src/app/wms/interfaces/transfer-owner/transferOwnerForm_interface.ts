export interface SellerForm {
    companyName?: string;
    requestBy?: string;
    buyer?:string;
    poNumber?: string;
    invoiceNumber?: string;
    sellingPrice?: string;
    saleDate?: string;
    category?: string;
    typeOfGoods?: string;
    othersText?: string;
    relatedDocuments?: Array<any>;
    remarks?: string;
    goodsToSell?: GoodsToSell[]
}

export interface GoodsToSell {
    id?: number;
    items?: string;
    formtype?: string;
    regNo?: number;
    qty?: number;
    maxQty?: number;
    location?: string;
    selected?: boolean;
}