export interface BuildParts {
    companyName?: string;
    requestBy?: string;
    issueDate?: string;
    category?: string;
    typeOfGoods?: string;
    otherTypeOfGood?: string;
    upload?:  Array<any>;
    remarks?: string;
    partsIssue?: PartsIssue[];
    newParts?: NewParts[];
    goodDetails?: GoodDetails[];
}

export interface PartsIssue {
    id?: string;
    piItem?: string;
    piFormType?: string;
    formNum?: string;
    piQuantity?: number;
    piLocation?: string;
    piMaxQty?:number;
    piValue?: number;
    piUOM?: string;
    piCustomCode?: string;
    piSelect?: any;
}

export interface NewParts {
    id?: string;
    npItem?: string;
    npFormType?: string;
    npFormNum?: string;
    npQuantity?: number;
    npLocation?: string;
    npValue?: number;
    npUOM?: string;
    npCustomCode?: string;
    npSelect?: any;
}

export interface GoodDetails {
    id?: string;
    gdFormType?: string;
    formNum?: string;
    goodsDesc?: string;
    oriQuantity?: number;
    currentQuantity?: number;
    value?: number;
    gdLocation?: string;
    gdUOM?: string;
    gdCustomCode?: string;
    gdSelect?: any;
}
