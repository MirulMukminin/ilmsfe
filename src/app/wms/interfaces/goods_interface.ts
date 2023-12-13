export interface listOfGoodsIn {
    id?: number|string;
    angularID?: number|string;
    customs_code?: string;
    description?: string;
    quantity?: number;
    value?: number;
    uom?: string;
    totalValue?: number;
    Selected?: boolean;
}
export interface GoodsIn {
    formType?: string;
    remark?: string;
    regNo?: string;
    moveDate?: Date|string;
    location?: string;
    invoiceNumber?: string;
    bookingType?: string;
    listOfGoods?: listOfGoodsIn[];
}

export interface listOfGoodsOut {
    id?:number|string;
    good_ID?: number;
    form_type?: string;
    registration_no?: string;
    goodsDescription?: string;
    withdrawal_qty?: number;
    remainingQTY?: number;
    totalValue?: number;
    maxQTY?: number;
    value?: number;
    form_number?:string;
    uom?: string;
    customs_code?: string;
    location?: string;
    pendingRtnQty?: string;
    completedRtnQty?: string;
    quantity?: string;
    Selected?: boolean;
}

export interface listOfReturnGoodsOut {
    id?:number|string;
    good_ID?: number;
    form_type?: string;
    registration_no?: string;
    pendingRtnQty?: string;
    dateReturn?: Date|string;
    good_name?: string;
    withdrawal_qty?: number;
    remain_qty?: number;
    constRemainingQTY?: number;
    totalValue?: number;
    maxQTY?: number;
    usedMaxQTY?: number;
    returnMaxQTY?: number;
    value?: number;
    status?: string;
    form_number?:string;
    expected_return?:string;
    used_qty?:number;
    return_qty?:number;
    uom?: string;
    customs_code?: string;
    location?: string;
    fixed?: boolean;
    Selected?: boolean;
}
export interface listOfGoodsOutModal {
    id?: number;
    form_type?: string;
    registration_no?: string;
    goodsDescription?: string;
    originalQTY?: number;
    currentQTY?: number;
    value?: number;
    formNo?:string;
    uom?: string;
    customs_code?: string;
    location?: string;
    Selected?: boolean;
}
export interface GoodsOut {
    form_type?: string;
    registration_no?: string;
    moveDate?: Date|string;
    transactionType?: string;
    destination?: string;
    category?: string;
    uom?: string;
    reason?:string;
    customs_code?: string;
    location?: string;
    listOfGoods?: listOfGoodsIn[];
}

export interface DueDateChangeLogModel {
    previus_expected_date?: string;
    expected_date?: string;
    request_date?: string;
    request_by?: string;
    remarks?: string;
}