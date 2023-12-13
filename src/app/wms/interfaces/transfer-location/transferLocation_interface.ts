export interface TransferForm {

    transferdate?: string;
    category?: string;
    type_of_goods?:string;
    companyname?: string;
    requestby?: string;
    remarks?: string;

}

export interface TransferLocation {

    no?: number;
    item?: string;
    formtype?: string;
    regno?: string;
    quantity?: number;
    location?: string;
    selected?: string;

}

export interface GoodsDetails{

    selected?: string;
    no?: number;
    formtype?: string;
    regno?: string;
    desc?: string;
    oriqty?: number;
    currqty?: number;
    value?: number;
    location?: string;

}