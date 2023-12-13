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
  plugOnOffData,
} from '../../services/CFS/other-activity.service';

export interface plugOnOffDetails {
  containerNo?: string;
  containerType?: string;
  plugOnOff?: string;
  time?: string;
  remarks?: string;
  invalidContainerNo?: boolean;
  invalidContainerText?: string;
  invalidRemarks?: boolean;
  selected?: boolean;
}

@Component({
  selector: 'app-cfs-plug-on-off',
  templateUrl: './cfs-plug-on-off.component.html',
  styleUrls: ['./cfs-plug-on-off.component.scss'],
})
export class CfsPlugOnOffComponent implements OnInit, OnChanges {
  @Input() companyName: string;
  @Input() requestBy: string;
  @Input() isEdit: boolean;
  @Input() orderNo: any;
  plugOnData = [];

  @Output() plugOnTabFilled = new EventEmitter<boolean>();

  plugOnOffDetails: plugOnOffDetails[] = [];

  timeList = [];
  @Input() containerNoList = [];
  containerNoArr: any = [];
  containerNoSelect: any = [];
  containerTypeList: any = [{ content: 'CHILLER' }, { content: 'FREEZER' }];
  constructor(
    private appService: AppService,
    private cfsService: OtherActivityService
  ) {}

  ngOnInit(): void {
    this.getTimeDropdown();
    this.addRow();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['companyName']) {
      if (this.companyName) {
        this.getRestServiceApi();
      }
    }

    // if (changes['plugOnData'] && changes['containerNoList']) {
    //   if (this.orderNo) {
    //     this.populateData();
    //   }
    // }
  }

  getRestServiceApi() {
    let params = {
      customer: this.companyName,
      requestType: RequestCFSType['PLUG_ON_OFF'],
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
      // this.addRow();
      if (this.isEdit) {
        this.populateData();
      }
    });
  }

  populateData() {
    let params = { ticketNo: this.orderNo };
    restServices.pbksb_RequestCFSService
      .getRequestByTicketNumber(this.appService.myApp)(params)
      .then((result) => {
        let resArr: any = result;
        let cfsRequest = this.appService.jsonToArray(resArr);
        this.plugOnData = cfsRequest.plugOnLine;
        if (this.plugOnData !== undefined) {
          this.plugOnOffDetails = [];

          this.plugOnData.forEach((item) => {
            this.containerNoList.push({
              content: item.container.containerNumber,
            });
            this.plugOnOffDetails.push({
              containerNo: item.container.containerNumber,
              containerType: item.containerType,
              plugOnOff: item.plugOn ? item.containerType : 'Off',
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

  checkSelected() {
    return this.plugOnOffDetails.some((item) => item.selected === true);
  }

  addRow() {
    this.plugOnOffDetails.push({
      containerNo: '',
      containerType: '',
      plugOnOff: 'On',
      time: '',
      remarks: '',
      selected: false,
      invalidContainerNo: false,
      invalidContainerText: '',
      invalidRemarks: false,
    });
  }

  deleteRow() {
    this.plugOnOffDetails.forEach((rowDetail, i) => {
      if (rowDetail.selected) {
        this.plugOnOffDetails = this.plugOnOffDetails.filter(
          (item) => item.selected !== rowDetail.selected
        );
      }
    });
    this.validateDuplicate();
    this.inputValueChange();
  }

  cancelAction() {
    this.plugOnOffDetails.forEach((rowDetail) => {
      if (rowDetail.selected) {
        rowDetail.selected = false;
      }
    });
  }

  inputValueChange() {
    this.rowFilled();
    if (this.validation()) {
      this.saveLineRequest();
    }
    let error = this.plugOnOffDetails.some((item) => {
      return item.invalidContainerNo === true;
    });
    this.cfsService.setPlugOnError(error);
    let test = this.cfsService.getPlugOnLineRequest();
  }

  onSelected(event, postIndex) {
    if (event.item) {
      this.plugOnOffDetails[postIndex].containerType = event.item.conType;
    } else {
      this.plugOnOffDetails[postIndex].containerType = '';
    }
  }

  saveLineRequest() {
    let requestLineList: plugOnOffData[] = [];
    this.plugOnOffDetails.forEach((item) => {
      requestLineList.push({
        containerNumber: item.containerNo,
        containerType: item.containerType,
        plugOn: item.plugOnOff === 'Off' ? false : true,
        plugOff: item.plugOnOff === 'Off' ? true : false,
        time: item.time == null || item.time.length === 0 ? null : item.time,
        remarks: item.remarks,
      });
    });
    this.cfsService.setPlugOnLineRequest(requestLineList);
  }

  validation() {
    let validate = true;
    this.plugOnOffDetails.forEach((item) => {
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
    const ids = new Set(this.plugOnOffDetails.map((row) => row.containerNo));
    if ([...ids].length !== this.plugOnOffDetails.length) {
      const keys = this.plugOnOffDetails.map((item) => item['containerNo']);
      let duplicate = keys.filter(
        (key) => keys.indexOf(key) !== keys.lastIndexOf(key)
      );
      let a = new Set(duplicate);
      a.forEach((item) =>
        this.plugOnOffDetails.forEach((row) => {
          if (item == row.containerNo) {
            row.invalidContainerNo = true;
            row.invalidContainerText = 'Duplicate Container';
          }
        })
      );
    } else {
      this.plugOnOffDetails.forEach((row) => {
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
    if (this.plugOnOffDetails.length > 0) {
      if (
        this.plugOnOffDetails.some((item) => {
          return item.containerNo !== null;
        })
      ) {
        this.plugOnTabFilled.emit(true);
      } else {
        this.plugOnTabFilled.emit(false);
      }
    } else {
      this.plugOnTabFilled.emit(false);
    }
  }
}
