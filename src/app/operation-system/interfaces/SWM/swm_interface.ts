export interface outBoundForm {
    requestOnBehalf?: string;
    jobDescription?: string;
    PONumber?: string;
    bookingDate?: string;
    remarks?: string;
    refNo?: string;
    OutboundWasteDetails?: OutboundWasteDetails[];
}

export interface OutboundWasteDetails {
    id?: number;
    palletID?: string;
    wasteCode?: string;
    qty?: string;
    uom?: string;
    palletWeight?: string;
    locationID?: string;
    expiryDate?: string;
    refNo?: string;
    Selected?: any;
}


export interface typeOfWasteList {
    id?: number;
    wasteCode?: string;
    description?: string;
    qty?: string;
}