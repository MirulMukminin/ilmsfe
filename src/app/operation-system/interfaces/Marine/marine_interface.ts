export interface BerthForm {
    companyName?: string;
    requestBy?: string;
    vesselName?: string;
    requestOnBehalf?: string;
    PONum?: string;
    eaDate?: string;
    eta?: string;
    edDate?: string;
    etd?: string;
    nextLocation?: string;
    lastLocation?: string;
    remarks?: string;
    agent?: string;
    agent_fuelwater?: string;
    documentList?: DocumentList[];
}

export interface DocumentList {
    id?: number;
    idApi?: string;
    docType?: string;
    wasteCode?: string;
    docID?: string;
    docPath?: string;
    uploadBy?: string;
    dateTime?: string;
    upload?:  Array<any>;
    select?: boolean;
}

export interface DocumentForm {
    docType?: string;
    wasteCode?: string;
    docID?: string;
    uploadBy?: string;
    dateTime?: string;
    upload?:  Array<any>;
}

export interface MaterialRequisitionForm {
    request_ref?: string;
    clientName?: string;
    customerName?: string;
    locationName?: string;
    vesselName?: string;
    typeOfServices?: string;
    remarks?: string;
    documentList?: DocumentList[];
}

export interface MaterialRequisition {
    id?: number;
    underdeck_services?: string;
    tank_no?: string;
    product?: string;
    barrels_quantity?: number;
    tonnes_quantity?: number;
    start_date?: string;
    end_date?: string;
    start_time?: string;
    end_time?: string;
    Selected?: any;
}