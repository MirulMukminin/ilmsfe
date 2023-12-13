import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { RequestCFSType } from 'enums/enums';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import {
  housekeepingData,
  OtherActivityService,
} from '../../services/CFS/other-activity.service';

export interface housekeepingDetails {
  containerNo?: string;
  containerType?: string;
  isChiller?: boolean;
  housekeeping?: boolean;
  cleaning?: boolean;
  stuffing?: boolean;
  time?: string;
  remarks?: string;
  invalidContainerNo?: boolean;
  invalidContainerText?: string;
  invalidRemarks?: boolean;
  selected?: boolean;
}

@Component({
  selector: 'app-cfs-housekeeping',
  templateUrl: './cfs-housekeeping.component.html',
  styleUrls: ['./cfs-housekeeping.component.scss'],
})
export class CfsHousekeepingComponent implements OnInit, OnChanges {
  @Input() companyName: string;
  @Input() requestBy: string;
  @Input() isEdit: boolean;
  @Input() orderNo: any;
  housekeepingData = [];

  @Output() housekeepingTabFilled = new EventEmitter<boolean>();

  housekeepingDetails: housekeepingDetails[] = [];

  timeList = [];
  @Input() containerNoList: any = [];
  containerNoArr: any = [];
  containerNoSelect: any = [];
  containerTypeList: any = [{ content: 'DRY' }, { content: 'CHILLER_FREEZER' }];

  constructor(
    private appService: AppService,
    private cfsService: OtherActivityService
  ) {}

  ngOnInit(): void {
    // this.addRow();
    this.getTimeDropdown();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['companyName']) {
      if (this.companyName) {
        this.getRestServiceApi();
      }
    }

    // if (changes['housekeepingData'] && changes['containerNoList']) {
    //   if (this.housekeepingData) {
    //     this.populateData();
    //   }
    // }
  }

  populateData() {
    let params = { ticketNo: this.orderNo };
    restServices.pbksb_RequestCFSService
      .getRequestByTicketNumber(this.appService.myApp)(params)
      .then((result) => {
        let resArr: any = result;
        let cfsRequest = this.appService.jsonToArray(resArr);
        this.housekeepingData = cfsRequest.housekeepingLine;

        if (this.housekeepingData !== undefined) {
          this.housekeepingDetails = [];

          this.housekeepingData.forEach((item) => {
            this.containerNoList.push({
              content: item.container.containerNumber,
            });
            this.housekeepingDetails.push({
              containerNo: item.container.containerNumber,
              containerType: item.containerType,
              cleaning: item.cleaningRequired,
              stuffing: item.stuffingRequired,
              housekeeping: item.housekeepingRequired,
              isChiller: item.container.containerType === 'DRY' ? false : true,
              remarks: item.remarks,
              time: item.time ? item.time.substr(0, 5) : '',
              selected: false,
              invalidContainerNo: false,
              invalidRemarks: false,
            });
          });

          this.saveLineRequest();
        }
      });
  }

  getRestServiceApi() {
    let params = {
      customer: this.companyName,
      requestType: RequestCFSType['HOUSEKEEPING_CLEANING_STUFFING'],
    };
    let containerNoPromise = restServices.pbksb_RequestCFSService
      .getContainersByRequestType(this.appService.myApp)(params)
      .then((result) => {
        let array: any = result;
        const containerNoDropdown = JSON.parse(array);

        this.containerNoArr = containerNoDropdown;

        for (let i = 0; i < this.containerNoArr.length; i++) {
          this.containerNoSelect.push({
            content: this.containerNoArr[i].containerNumber,
            conType: this.containerNoArr[i].containerType,
          });
        }
        this.containerNoList = this.containerNoSelect;
      });
    Promise.all([containerNoPromise]).then((values) => {
      this.addRow();
      if (this.isEdit) {
        this.populateData();
      }
    });
  }

  addRow() {
    this.housekeepingDetails.push({
      containerNo: '',
      containerType: '',
      isChiller: false,
      housekeeping: false,
      cleaning: false,
      stuffing: false,
      time: '',
      remarks: '',
      selected: false,
      invalidContainerNo: false,
      invalidRemarks: false,
    });
  }

  deleteRow() {
    this.housekeepingDetails.forEach((rowDetail, i) => {
      if (rowDetail.selected) {
        this.housekeepingDetails = this.housekeepingDetails.filter(
          (item) => item.selected !== rowDetail.selected
        );
      }
    });
    this.validateDuplicate();
    this.inputValueChange();
  }

  cancelAction() {
    this.housekeepingDetails.forEach((rowDetail) => {
      if (rowDetail.selected) {
        rowDetail.selected = false;
      }
    });
  }

  checkSelected() {
    return this.housekeepingDetails.some((item) => item.selected === true);
  }

  onSelected(event, postIndex) {
    if (event.item) {
      if (event.item.conType === 'DRY') {
        this.housekeepingDetails[postIndex].containerType = event.item.conType;
        this.housekeepingDetails[postIndex].isChiller = false;
      } else {
        this.housekeepingDetails[postIndex].containerType = 'CHILLER_FREEZER';
        this.housekeepingDetails[postIndex].isChiller = true;
      }
    } else {
      this.housekeepingDetails[postIndex].containerType = '';
      this.housekeepingDetails[postIndex].isChiller = false;
      this.housekeepingDetails[postIndex].housekeeping = false;
      this.housekeepingDetails[postIndex].cleaning = false;
      this.housekeepingDetails[postIndex].stuffing = false;
    }
  }

  inputValueChange() {
    this.rowFilled();
    if (this.validation()) {
      this.saveLineRequest();
    }
    let error = this.housekeepingDetails.some((item) => {
      return item.invalidContainerNo === true;
    });
    this.cfsService.setHousekeepingError(error);
    let test = this.cfsService.getHousekeepingLineRequest();
  }

  saveLineRequest() {
    let requestLineList: housekeepingData[] = [];
    this.housekeepingDetails.forEach((item) => {
      requestLineList.push({
        containerNumber: item.containerNo,
        containerType: item.containerType,
        housekeepingRequired: item.housekeeping,
        cleaningRequired: item.cleaning,
        stuffingRequired: item.stuffing,
        time: item.time == null || item.time.length === 0 ? null : item.time,
        remarks: item.remarks,
      });
    });
    this.cfsService.setHousekeepingLineRequest(requestLineList);
  }

  validation() {
    let validate = true;
    this.housekeepingDetails.forEach((item) => {
      if (!item.containerNo || item.containerNo.length < 1) {
        item.invalidContainerNo = true;
        item.invalidContainerText = 'Required';
        validate = false;
      }
      if (item.invalidContainerNo) {
        validate = false;
      }
    });

    return validate;
  }

  validateDuplicate() {
    const ids = new Set(this.housekeepingDetails.map((row) => row.containerNo));
    if ([...ids].length !== this.housekeepingDetails.length) {
      const keys = this.housekeepingDetails.map((item) => item['containerNo']);
      let duplicate = keys.filter(
        (key) => keys.indexOf(key) !== keys.lastIndexOf(key)
      );
      let a = new Set(duplicate);
      a.forEach((item) =>
        this.housekeepingDetails.forEach((row) => {
          if (item == row.containerNo) {
            row.invalidContainerNo = true;
            row.invalidContainerText = 'Duplicate Container';
          }
        })
      );
    } else {
      this.housekeepingDetails.forEach((row) => {
        row.invalidContainerNo = false;
        row.invalidContainerText = '';
      });
    }
  }

  getTimeDropdown() {
    this.timeList = [];
    const interval = 60; // 1 Hour interval
    const time = [];
    let startT = 0;
    for (let i = 0; startT < 24 * 60; i++) {
      const hh = Math.floor(startT / 60);
      const mm = startT % 60;
      time[i] = ('0' + (hh % 24)).slice(-2) + ':' + ('0' + mm).slice(-2);
      startT += interval;
    }

    for (let i = 0; i < time.length; i++) {
      this.timeList.push({
        content: time[i],
      });
    }
  }

  rowFilled() {
    if (this.housekeepingDetails.length > 0) {
      if (
        this.housekeepingDetails.some((item) => {
          return item.containerNo !== '';
        })
      ) {
        this.housekeepingTabFilled.emit(true);
      } else {
        this.housekeepingTabFilled.emit(false);
      }
    } else {
      this.housekeepingTabFilled.emit(false);
    }
  }
}
