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
  loadingCablingData,
  OtherActivityService,
} from '../../services/CFS/other-activity.service';

export interface loadingCablingDetails {
  containerNo?: string;
  containerType?: string;
  isChiller?: boolean;
  isChangable?: boolean;
  cablingOnVessel?: boolean;
  fourCore?: boolean;
  time?: string;
  remarks?: string;
  invalidContainerNo?: boolean;
  invalidContainerText?: string;
  invalidRemarks?: boolean;
  selected?: boolean;
}

@Component({
  selector: 'app-cfs-loading-cabling',
  templateUrl: './cfs-loading-cabling.component.html',
  styleUrls: ['./cfs-loading-cabling.component.scss'],
})
export class CfsLoadingCablingComponent implements OnInit, OnChanges {
  @Input() companyName: string;
  @Input() requestBy: string;
  @Input() isEdit: boolean;
  @Input() orderNo: any;
  loadingData = [];
  @Input() locationData: any = '';
  @Input() vesselData: any = '';

  @Output() loadingTabFilled = new EventEmitter<boolean>();

  // dropdown
  timeList = [];
  locationList = [];
  locationArr: any = [];
  locationSelect: any = [];
  vesselNameArr: any[] = [];
  vesselNameList: any[] = [];
  @Input() containerNoList: any = [];
  containerNoArr: any = [];
  containerNoSelect: any = [];
  containerTypeList: any = [{ content: 'DRY' }, { content: 'CHILLER_FREEZER' }];

  location: string = '';
  locationInvalid: boolean = false;
  vessel: string = '';
  vesselInvalid: boolean = false;
  loadingCablingDetails: loadingCablingDetails[] = [];

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

    //   if (changes['loadingData'] && changes['containerNoList']) {
    //     if (this.loadingData) {
    //       this.populateData();
    //     }
    //   }

    //   if (changes['locationData']) {
    //     this.location = this.locationData;
    //     this.cfsService.setLocation(this.location);
    //   }

    //   if (changes['vesselData']) {
    //     this.vessel = this.vesselData;
    //     this.cfsService.setVessel(this.vessel);
    //   }
  }

  populateData() {
    let params = { ticketNo: this.orderNo };
    restServices.pbksb_RequestCFSService
      .getRequestByTicketNumber(this.appService.myApp)(params)
      .then((result) => {
        let resArr: any = result;
        let cfsRequest = this.appService.jsonToArray(resArr);
        this.loadingData = cfsRequest.loadingLine;

        if (this.loadingData !== undefined) {
          this.loadingCablingDetails = [];

          this.loadingData.forEach((item, index) => {
            this.containerNoList.push({
              content: item.container.containerNumber,
            });
            this.loadingCablingDetails.push({
              containerNo: item.container.containerNumber,
              cablingOnVessel: item.cablingOnVessel,
              fourCore: item.fourCoreDNV,
              containerType: item.containerType,
              isChangable:
                item.container.containerType === 'DRY' ? false : true,
              isChiller: item.containerType === 'DRY' ? false : true,
              remarks: item.remarks,
              time: item.time ? item.time.substr(0, 5) : '',
              selected: false,
              invalidContainerNo: false,
              invalidRemarks: false,
            });
          });

          this.location = cfsRequest.location.description;
          this.cfsService.setLocation(this.location);
          this.vessel = cfsRequest.vessel.name;
          this.cfsService.setVessel(this.vessel);

          this.saveLineRequest();
        }
      });
  }

  getRestServiceApi() {
    let locationPromise = restServices.pbksb_PSBService
      .GetSiteLocation(this.appService.myApp)()
      .then((result) => {
        const array: any = result;
        const locationDropdown = JSON.parse(array);

        this.locationArr = locationDropdown;

        for (let i = 0; i < this.locationArr.length; i++) {
          this.locationSelect.push({
            content: this.locationArr[i].description,
          });
        }
        this.locationList = this.locationSelect;
      });

    let params = {
      customer: this.companyName,
      requestType: RequestCFSType['LOADING_CABLING'],
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

    let vesselPromise = restServices.pbksb_MarineService
      .ListVessel(this.appService.myApp)()
      .then((result) => {
        const resArr = this.appService.jsonToArray(result);

        let array = resArr.vessel;

        array.forEach((element) => {
          this.vesselNameArr.push({
            content: element.name,
          });
        });

        this.vesselNameArr = this.vesselNameArr.sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
        );
        this.vesselNameList = this.vesselNameArr;
      });
    Promise.all([locationPromise, containerNoPromise, vesselPromise]).then(
      (values) => {
        this.addRow();
        if (this.isEdit) {
          this.populateData();
        }
      }
    );
  }

  addRow() {
    this.loadingCablingDetails.push({
      containerNo: '',
      containerType: '',
      isChiller: false,
      isChangable: false,
      cablingOnVessel: false,
      fourCore: false,
      time: '',
      remarks: '',
      selected: false,
      invalidContainerNo: false,
      invalidRemarks: false,
    });
  }

  deleteRow() {
    this.loadingCablingDetails.forEach((rowDetail, i) => {
      if (rowDetail.selected) {
        this.loadingCablingDetails = this.loadingCablingDetails.filter(
          (item) => item.selected !== rowDetail.selected
        );
      }
    });
    this.validateDuplicate();
    this.inputValueChange();
  }

  cancelAction() {
    this.loadingCablingDetails.forEach((rowDetail) => {
      if (rowDetail.selected) {
        rowDetail.selected = false;
      }
    });
  }

  checkSelected() {
    return this.loadingCablingDetails.some((item) => item.selected === true);
  }

  onSelected(event, postIndex) {
    if (event.item) {
      if (event.item.conType === 'DRY') {
        this.loadingCablingDetails[postIndex].containerType =
          event.item.conType;
        this.loadingCablingDetails[postIndex].isChiller = false;
        this.loadingCablingDetails[postIndex].isChangable = false;
      } else {
        this.loadingCablingDetails[postIndex].containerType = 'CHILLER_FREEZER';
        this.loadingCablingDetails[postIndex].isChiller = true;
        this.loadingCablingDetails[postIndex].isChangable = true;
      }
    } else {
      this.loadingCablingDetails[postIndex].containerType = '';
      this.loadingCablingDetails[postIndex].cablingOnVessel = false;
      this.loadingCablingDetails[postIndex].fourCore = false;
    }
  }

  onConTypeSelected(event, postIndex) {
    // check if is a chiller container so the checkbox can be activated
    if (this.loadingCablingDetails[postIndex].containerType === 'DRY') {
      this.loadingCablingDetails[postIndex].isChiller = false;
      this.loadingCablingDetails[postIndex].fourCore = false;
      this.loadingCablingDetails[postIndex].cablingOnVessel = false;
    } else {
      this.loadingCablingDetails[postIndex].isChiller = true;
    }
  }

  onLocationSelected() {
    if (this.location.length === 0 || !this.location) {
      this.locationInvalid = true;
      this.cfsService.setLocation(null);
    } else {
      this.locationInvalid = false;
      this.cfsService.setLocation(this.location);
    }
  }

  onVesselSelected() {
    if (this.vessel.length === 0 || !this.vessel) {
      this.vesselInvalid = true;
      this.cfsService.setVessel(null);
    } else {
      this.vesselInvalid = false;
      this.cfsService.setVessel(this.vessel);
    }
  }

  inputValueChange() {
    this.rowFilled();
    if (this.validation()) {
      this.saveLineRequest();
    }
    let error = this.loadingCablingDetails.some((item) => {
      return item.invalidContainerNo === true;
    });
    this.cfsService.setloadingCablingError(error);
    let test = this.cfsService.getLoadingCablingLineRequest();
  }

  saveLineRequest() {
    let requestLineList: loadingCablingData[] = [];
    this.loadingCablingDetails.forEach((item) => {
      requestLineList.push({
        containerNumber: item.containerNo,
        containerType: item.containerType,
        cablingOnVessel: item.cablingOnVessel,
        fourCore: item.fourCore,
        time: item.time == null || item.time.length === 0 ? null : item.time,
        remarks: item.remarks,
      });
    });
    this.cfsService.setLoadingCablingLineRequest(requestLineList);
  }

  validation() {
    let validate = true;
    this.locationInvalid = false;
    this.vesselInvalid = false;
    if (!this.location || this.location.length === 0) {
      this.locationInvalid = true;
      validate = false;
    }
    if (!this.vessel || this.vessel.length === 0) {
      this.vesselInvalid = true;
      validate = false;
    }
    this.loadingCablingDetails.forEach((item) => {
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
    const ids = new Set(
      this.loadingCablingDetails.map((row) => row.containerNo)
    );
    if ([...ids].length !== this.loadingCablingDetails.length) {
      const keys = this.loadingCablingDetails.map(
        (item) => item['containerNo']
      );
      let duplicate = keys.filter(
        (key) => keys.indexOf(key) !== keys.lastIndexOf(key)
      );
      let a = new Set(duplicate);
      a.forEach((item) =>
        this.loadingCablingDetails.forEach((row) => {
          if (item == row.containerNo) {
            row.invalidContainerNo = true;
            row.invalidContainerText = 'Duplicate Container';
          }
        })
      );
    } else {
      this.loadingCablingDetails.forEach((row) => {
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
    if (this.loadingCablingDetails.length > 0) {
      if (
        this.loadingCablingDetails.some((item) => {
          return item.containerNo !== '';
        })
      ) {
        this.loadingTabFilled.emit(true);
      } else {
        this.loadingTabFilled.emit(false);
      }
    } else {
      this.loadingTabFilled.emit(false);
    }
  }

  clearFourCore(index) {
    if (this.loadingCablingDetails[index].cablingOnVessel == false) {
      this.loadingCablingDetails[index].fourCore = false;
    }
  }
}
