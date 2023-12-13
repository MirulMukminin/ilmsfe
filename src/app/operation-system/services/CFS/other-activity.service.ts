import { Injectable } from '@angular/core';
export interface plugOnOffData {
  containerNumber?: string;
  containerType?: string;
  plugOn?: boolean;
  plugOff?: boolean;
  temperature?: string;
  time?: string;
  remarks?: string;
}

export interface loadingCablingData {
  containerNumber?: string;
  containerType?: string;
  cablingOnVessel?: boolean;
  fourCore?: boolean;
  time?: string;
  remarks?: string;
}

export interface housekeepingData {
  containerNumber?: string;
  containerType?: string;
  housekeepingRequired?: boolean;
  cleaningRequired?: boolean;
  stuffingRequired?: boolean;
  time?: string;
  remarks?: string;
}

export interface repairData {
  containerNumber?: string;
  repairRequired?: boolean;
  repair?: string;
  outsideInsideBonded?: string;
  containerReturn?: boolean;
  time?: string;
  remarks?: string;
}

export interface formData {
  form: {
    poNumber: any;
    ticketNo?: string;
    companyName: string;
    requestBy: string;
    requestType: string;
    // requestPriority: string;
    date: string;
    location: string;
    vessel: string;
    requestPlugOnLineList: plugOnOffData[];
    requestLoadingLineList: loadingCablingData[];
    requestHousekeepingLineList: housekeepingData[];
    requestRepairLineList: repairData[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class OtherActivityService {
  plugOnLineRequest: plugOnOffData[];
  loadingCablingLineRequest: loadingCablingData[];
  housekeepingLineRequest: housekeepingData[];
  repairLineRequest: repairData[];

  companyName: string;
  requestBy: string;
  requestType: string;
  requestPriority: string;
  date: string;
  location: string;
  vessel: string;
  poNumber: string;

  plugOnError: boolean = false;
  loadingCablingError: boolean = false;
  housekeepingError: boolean = false;
  repairError: boolean = false;

  form: formData = {
    form: {
      ticketNo: undefined,
      companyName: '',
      requestBy: '',
      requestType: '',
      // requestPriority: '',
      poNumber: '',
      date: '',
      location: null,
      vessel: null,
      requestPlugOnLineList: [],
      requestHousekeepingLineList: [],
      requestLoadingLineList: [],
      requestRepairLineList: [],
    },
  };

  setPlugOnLineRequest(data) {
    this.plugOnLineRequest = data;
  }

  getPlugOnLineRequest() {
    return this.plugOnLineRequest;
  }

  setLoadingCablingLineRequest(data) {
    this.loadingCablingLineRequest = data;
  }

  getLoadingCablingLineRequest() {
    return this.loadingCablingLineRequest;
  }

  setHousekeepingLineRequest(data) {
    this.housekeepingLineRequest = data;
  }

  getHousekeepingLineRequest() {
    return this.housekeepingLineRequest;
  }

  setRepairLineRequest(data) {
    this.repairLineRequest = data;
  }

  getRepairLineRequest() {
    return this.repairLineRequest;
  }

  setPlugOnError(error: boolean) {
    this.plugOnError = error;
  }

  getPlugOnError() {
    return this.plugOnError;
  }

  setloadingCablingError(error: boolean) {
    this.loadingCablingError = error;
  }

  getloadingCablingError() {
    return this.loadingCablingError;
  }

  setHousekeepingError(error: boolean) {
    this.housekeepingError = error;
  }

  getHousekeepingError() {
    return this.housekeepingError;
  }

  setRepairError(error: boolean) {
    this.repairError = error;
  }

  getRepairError() {
    return this.repairError;
  }

  getAllError() {
    let allError = [];
    if (this.plugOnError) {
      allError.push('plugOnOff');
    }
    if (this.loadingCablingError) {
      allError.push('loadingCabling');
    }
    if (this.housekeepingError) {
      allError.push('housekeeping');
    }
    if (this.repairError) {
      allError.push('repair');
    }

    return allError;
  }

  setLocation(data) {
    this.location = data;
  }

  getLocation() {
    return this.location;
  }

  setVessel(data) {
    this.vessel = data;
  }

  getVessel() {
    return this.vessel;
  }

  validateLoadingCabling() {
    if (
      this.loadingCablingLineRequest.length > 0 &&
      this.location &&
      this.vessel
    ) {
      return true;
    } else {
      return false;
    }
  }

  resetData() {
    this.plugOnLineRequest = [];
    this.loadingCablingLineRequest = [];
    this.housekeepingLineRequest = [];
    this.repairLineRequest = [];
    this.plugOnError = false;
    this.loadingCablingError = false;
    this.housekeepingError = false;
    this.repairError = false;
    this.location = null;
    this.vessel = null;
    this.form.form.ticketNo = undefined;
  }

  setMainData(companyName, requestBy, date, poNumber) {
    this.companyName = companyName;
    this.requestBy = requestBy;
    this.date = date;
    this.requestType = 'OTHER_ACTIVITIES';
    // this.requestPriority = requestPriority;
    this.poNumber = poNumber;

    this.form.form.companyName = companyName;
    this.form.form.requestBy = requestBy;
    this.form.form.date = date;
    // this.form.form.requestPriority = requestPriority;
    this.form.form.poNumber = poNumber;
  }

  setFormNo(ticketNo) {
    this.form.form.ticketNo = ticketNo;
  }

  getFormData() {
    this.form.form.location = this.location;
    this.form.form.vessel = this.vessel;
    this.form.form.requestType = 'OTHER_ACTIVITIES';
    this.form.form.requestPlugOnLineList = this.plugOnLineRequest;
    this.form.form.requestLoadingLineList = this.loadingCablingLineRequest;
    this.form.form.requestHousekeepingLineList = this.housekeepingLineRequest;
    this.form.form.requestRepairLineList = this.repairLineRequest;
    return this.form;
  }

  constructor() {}
}
