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
  OtherActivityService,
  repairData,
} from '../../services/CFS/other-activity.service';

export interface repairDetails {
  containerNo?: string;
  repairRequired?: boolean;
  repair?: string;
  outsideInsideBonded?: string;
  return?: boolean;
  time?: string;
  remarks?: string;
  invalidContainerNo?: boolean;
  invalidContainerText?: string;
  invalidRepair?: boolean;
  invalidRemarks?: boolean;
  canOnlyReturn: boolean;
  selected?: boolean;
}

@Component({
  selector: 'app-cfs-repair',
  templateUrl: './cfs-repair.component.html',
  styleUrls: ['./cfs-repair.component.scss'],
})
export class CfsRepairComponent implements OnInit, OnChanges {
  @Input() companyName: string;
  @Input() requestBy: string;
  @Input() isEdit: boolean;
  @Input() orderNo: any;
  repairData = [];

  @Output() repairTabFilled = new EventEmitter<boolean>();

  repairDetails: repairDetails[] = [];

  timeList = [];
  @Input() containerNoList: any = [];
  containerNoArr: any = [];
  containerNoSelect: any = [];
  containerNoStorageArr: any = [];
  containerNoStorageSelect: any = [];

  constructor(
    private appService: AppService,
    private cfsService: OtherActivityService
  ) {}

  ngOnInit(): void {
    this.getTimeDropdown();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['companyName']) {
      if (this.companyName) {
        this.getRestServiceApi();
      }
    }

    // if (changes['loadingData'] && changes['containerNoList']) {
    //   if (this.repairData) {
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
        this.repairData = cfsRequest.repairLine;

        if (this.repairData !== undefined) {
          this.repairDetails = [];

          this.repairData.forEach((item) => {
            this.containerNoList.push({
              content: item.container.containerNumber,
            });
            this.repairDetails.push({
              containerNo: item.container.containerNumber,
              repairRequired: item.repair,
              repair: item.repairRequest,
              outsideInsideBonded: item.outsideInsideBonded,
              return: item.containerReturn,
              remarks: item.remarks,
              time: item.time ? item.time.substr(0, 5) : '',
              selected: false,
              invalidContainerNo: false,
              invalidRemarks: false,
              canOnlyReturn: item.containerReturn ?? false,
            });
          });

          this.saveLineRequest();
        }
      });
  }

  getRestServiceApi() {
    this.containerNoList = [];
    let params = {
      customer: this.companyName,
      requestType: RequestCFSType['REPAIR'],
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
            status: this.containerNoArr[i].status,
            repair: true,
          });
        }
        // this.containerNoList = this.containerNoSelect;
        console.log('this.containerNoSelect: ', this.containerNoSelect);
        this.containerNoList.push(...this.containerNoSelect);
      });

    let storageParams = {
      customer: this.companyName,
      requestType: RequestCFSType['STORAGE'],
    };
    let containerNoStoragePromise = restServices.pbksb_RequestCFSService
      .getContainersByRequestType(this.appService.myApp)(storageParams)
      .then((result) => {
        let array: any = result;

        const containerNoDropdown = JSON.parse(array);

        this.containerNoStorageArr = containerNoDropdown;

        for (let i = 0; i < this.containerNoStorageArr.length; i++) {
          this.containerNoStorageSelect.push({
            content: this.containerNoStorageArr[i].containerNumber,
            status: this.containerNoStorageArr[i].status,
            repair: false,
          });
        }
        // this.containerNoList = this.containerNoSelect;
        console.log(
          'this.containerNoStorageSelect: ',
          this.containerNoStorageSelect
        );
        this.containerNoList.push(...this.containerNoStorageSelect);
      });
    Promise.all([containerNoPromise, containerNoStoragePromise]).then(
      (values) => {
        console.log(this.containerNoList);
        this.addRow();
        if (this.isEdit) {
          this.populateData();
        }
      }
    );
  }

  addRow() {
    this.repairDetails.push({
      containerNo: '',
      repair: '',
      repairRequired: false,
      outsideInsideBonded: 'Inside Bonded',
      return: false,
      time: '',
      remarks: '',
      selected: false,
      invalidContainerNo: false,
      invalidRemarks: false,
      canOnlyReturn: false,
    });
  }

  deleteRow() {
    this.repairDetails.forEach((rowDetail, i) => {
      if (rowDetail.selected) {
        this.repairDetails = this.repairDetails.filter(
          (item) => item.selected !== rowDetail.selected
        );
      }
    });
    this.validateDuplicate();
    this.inputValueChange();
  }

  cancelAction() {
    this.repairDetails.forEach((rowDetail) => {
      if (rowDetail.selected) {
        rowDetail.selected = false;
      }
    });
  }

  checkSelected() {
    return this.repairDetails.some((item) => item.selected === true);
  }

  inputValueChange() {
    this.rowFilled();
    if (this.validation()) {
      this.saveLineRequest();
    }
    let error = this.repairDetails.some((item) => {
      return item.invalidContainerNo === true;
    });
    this.cfsService.setRepairError(error);
    let test = this.cfsService.getRepairLineRequest();
  }

  saveLineRequest() {
    let requestLineList: repairData[] = [];
    this.repairDetails.forEach((item) => {
      requestLineList.push({
        containerNumber: item.containerNo,
        repairRequired: item.repairRequired,
        repair: item.repair,
        outsideInsideBonded: item.outsideInsideBonded,
        containerReturn: item.return,
        time: item.time == null || item.time.length === 0 ? null : item.time,
        remarks: item.remarks,
      });
    });
    this.cfsService.setRepairLineRequest(requestLineList);
  }

  validation() {
    let validate = true;
    this.repairDetails.forEach((item) => {
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
    const ids = new Set(this.repairDetails.map((row) => row.containerNo));
    if ([...ids].length !== this.repairDetails.length) {
      const keys = this.repairDetails.map((item) => item['containerNo']);
      let duplicate = keys.filter(
        (key) => keys.indexOf(key) !== keys.lastIndexOf(key)
      );
      let a = new Set(duplicate);
      a.forEach((item) =>
        this.repairDetails.forEach((row) => {
          if (item == row.containerNo) {
            row.invalidContainerNo = true;
            row.invalidContainerText = 'Duplicate Container';
          }
        })
      );
    } else {
      this.repairDetails.forEach((row) => {
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
    if (this.repairDetails.length > 0) {
      if (
        this.repairDetails.some((item) => {
          return item.containerNo !== '' || item.containerNo.length != 0;
        })
      ) {
        this.repairTabFilled.emit(true);
      } else {
        this.repairTabFilled.emit(false);
      }
    } else {
      this.repairTabFilled.emit(false);
    }
  }

  onContainerNoSelected(event, index) {
    console.log('event: ', event);
    this.repairDetails[index].repairRequired = false;
    this.repairDetails[index].repair = '';
    this.repairDetails[index].outsideInsideBonded = 'Inside Bonded';
    this.repairDetails[index].return = false;
    let isRepair = event.item?.repair;
    if (isRepair) {
      this.repairDetails[index].canOnlyReturn = false;
    } else if (isRepair == false) {
      this.repairDetails[index].canOnlyReturn = true;
      this.repairDetails[index].return = true;
    }
  }
}
