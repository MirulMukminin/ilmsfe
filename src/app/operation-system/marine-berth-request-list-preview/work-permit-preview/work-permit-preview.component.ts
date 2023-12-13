import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { BerthRequestFormService } from '../../services/Marine/berth-request-form.service';

@Component({
  selector: 'app-work-permit-preview',
  templateUrl: './work-permit-preview.component.html',
  styleUrls: ['./work-permit-preview.component.scss'],
})
export class WorkPermitPreviewComponent implements OnInit, OnDestroy {
  @Input() formStatus: string;
  @Output() workProgramSummary = new EventEmitter<any>();
  RequestNo: string = '';
  workArray: any[] = [];
  workPermit: any[] = [];
  workPermitList: any[] = [];

  confinedSpaceChkBox = false;
  hotWorkChkBox = false;
  divingChkBox = false;
  coldWorkChkBox = false;
  workPermitInvalid = false;
  openEdit = false;
  indicator: any = [];

  confinedSpaceId = '';
  hotWorkId = '';
  divingId = '';
  coldWorkId = '';

  counter = 0;
  date = new Date();
  cancelItem = [];
  subscription!: Subscription;
  disabledEdit = false;
  displayEdit = true;
  listOfStatus = [];
  listOfIndicator = [];
  open = false;

  @Input() isAgent: boolean;

  constructor(
    private appService: AppService,
    private _Activatedroute: ActivatedRoute,
    private berthRequestFormService: BerthRequestFormService
  ) {}

  ngOnInit(): void {
    this.getRestServiceAPI();
    this.subscription =
      this.berthRequestFormService.formStatusChanged.subscribe((value: any) => {
        this.formStatus = value;
        // console.log('formStatus', this.formStatus);
        this.disableCheckbox();
        this.disableEdit();
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getRestServiceAPI() {
    this.RequestNo = this._Activatedroute.snapshot.paramMap.get('RequestNo');

    const getCode: any = { requestNo: this.RequestNo };

    restServices.pbksb_MarineService
      .GetWorkWithPermitFormDetails(this.appService.myApp)(getCode)
      .then((result) => {
        const resArr: any = result;
        const array = JSON.parse(resArr);

        this.workArray = array.workPermits;

        this.workArray.forEach((element) => {
          if (element.indicator == true) {
            this.workPermit.push({
              id: element.id,
              item: element.item,
              indicator: element.indicator,
              status: element.status
                ? this.convertToTitleCase(element.status)
                : 'N/A',
              select: false,
              disabled: false,
              sort_ind: element.sort_ind ? element.sort_ind : '',
            });
            this.listOfStatus.push(element.status);
          }
          this.listOfIndicator.push(element.indicator);
          this.validateData(element);
        });
      })
      .then(() => {
        this.disableCheckbox();
        this.disableEdit();
        this.workPermit = this.workPermit.sort(
          (a, b) => a.sort_ind - b.sort_ind
        );
      });
  }

  validateData(value: any) {
    if (value.item === 'CONFINED_SPACE') {
      this.confinedSpaceChkBox = value.indicator === true ? true : false;
      this.indicator['confinedSpaceChkBox'] = value.indicator;
      this.confinedSpaceId = value.id ?? '';
    } else if (value.item === 'HOT_WORK') {
      this.hotWorkChkBox = value.indicator === true ? true : false;
      this.indicator['hotWorkChkBox'] = value.indicator;
      this.hotWorkId = value.id ?? '';
    } else if (value.item === 'COLD_WORK') {
      this.coldWorkChkBox = value.indicator === true ? true : false;
      this.indicator['coldWorkChkBox'] = value.indicator;
      this.coldWorkId = value.id ?? '';
    } else if (value.item === 'DIVING') {
      this.divingChkBox = value.indicator === true ? true : false;
      this.indicator['divingChkBox'] = value.indicator;
      this.divingId = value.id ?? '';
    }
  }

  // ------- Table toolbar function (start) ----------
  checkLengthList() {
    return this.workPermit.some((item) => item.select == true);
  }

  deleteList() {
    let confinedSpace = '';
    let diving = '';
    let hotWork = '';
    let coldWork = '';

    this.workPermit.forEach((ticket) => {
      if (ticket.select) {
        // this.workPermit = this.workPermit.filter(
        //   (item) => item.select !== ticket.select
        // );

        if (ticket.item.includes('DIVING')) {
          diving = ticket.id;
          this.cancelItem.push('Diving');
        } else if (ticket.item.includes('CONFINED_SPACE')) {
          confinedSpace = ticket.id;
          this.cancelItem.push('Confined Space');
        } else if (ticket.item.includes('HOT_WORK')) {
          hotWork = ticket.id;
          this.cancelItem.push('Hot Work');
        } else if (ticket.item.includes('COLD_WORK')) {
          coldWork = ticket.id;
          this.cancelItem.push('Cold Work');
        }
      }
    });

    const getCodeDelete = {
      form: {
        berth_form: this.berthRequestFormService.getBerthFormID(),
        confined_space: {
          id: confinedSpace,
        },
        diving: {
          id: diving,
        },
        hot_work: {
          id: hotWork,
        },
        cold_work: {
          id: coldWork,
        },
      },
    };

    // console.log(getCodeDelete);

    restServices.pbksb_MarineService
      .CancelWorkWithPermit(this.appService.myApp)(getCodeDelete)
      .then((result) => {
        let requestList: any = result;
        let request = JSON.parse(requestList);

        if (!request.status) {
          // console.log('success cancelled');
          this.counter = 0;
          this.workPermit = [];
          this.workProgramSummary.emit();
          this.listOfIndicator = [];
          this.listOfStatus = [];
          this.open = false;
          this.ngOnInit();
          this.createNotification('success', 'cancelled', 'cancel');
        } else {
          // console.log(request.status, 'work with permit cancel failed');
          this.createNotification('error', 'cancel', 'cancel');
        }
      })
      .catch((err) => {
        // console.log(err, 'work with permit cancel failed');
        this.createNotification('error', 'cancel', 'cancel');
      });
  }

  cancelList() {
    this.workPermit.forEach((ticket) => {
      if (ticket.select) {
        ticket.select = false;
      }
    });
    this.counter = 0;
  }

  listCheckbox(event: any) {
    if (event === true) {
      this.counter++;
    } else if (event == false) {
      this.counter--;
    }
  }
  // ------- Table toolbar function (end) ----------

  onUpdate() {
    this.validateItem();

    let param = {
      form: {
        berth_form: this.berthRequestFormService.getBerthFormID(),
        confined_space: {
          id: this.confinedSpaceId,
          indicator: this.confinedSpaceChkBox,
        },
        hot_work: {
          id: this.hotWorkId,
          indicator: this.hotWorkChkBox,
        },
        diving: {
          id: this.divingId,
          indicator: this.divingChkBox,
        },
        cold_work: {
          id: this.coldWorkId,
          indicator: this.coldWorkChkBox,
        },
      },
    };

    if (!this.workPermitInvalid) {
      restServices.pbksb_MarineService
        .UpdateBerthWorkPermit(this.appService.myApp)(param)
        .then((result) => {
          let requestList: any = result;
          let request = JSON.parse(requestList);

          if (!request.status) {
            // console.log(request);
            this.workProgramSummary.emit();
            // console.log('work with permit update success');
            this.createNotification('success', 'updated', 'update');
            this.workPermit = [];
            this.openEdit = false;
            this.listOfIndicator = [];
            this.listOfStatus = [];
            this.ngOnInit();
          } else {
            // console.log(request.status, 'work with permit update failed');
            this.createNotification('error', 'update', 'update');
          }
        })
        .catch((err) => {
          // console.log('work with permit update failed', err);
          this.createNotification('error', 'update', 'update');
        });
    }
  }

  // ------- Validatation before submit (start) ----------
  onSelected() {
    if (
      this.confinedSpaceChkBox == true ||
      this.hotWorkChkBox == true ||
      this.divingChkBox == true ||
      this.coldWorkChkBox == true
    ) {
      this.workPermitInvalid = false;
    }
  }
  validateItem() {
    if (
      this.confinedSpaceChkBox == false &&
      this.hotWorkChkBox == false &&
      this.divingChkBox == false &&
      this.coldWorkChkBox == false
    ) {
      this.workPermitInvalid = true;
    } else {
      this.workPermitInvalid = false;
    }
  }
  // ------- Validatation before submit (end) ----------

  // Disable edit button if all general works are cancel
  disableEdit() {
    if (this.formStatus != 'BOOKED') {
      this.disabledEdit = true;
    } else if (this.listOfIndicator.includes(false)) {
      this.disabledEdit = false;
    } else {
      this.disabledEdit = true;
    }

    this.displayEdit = this.workArray.some(
      (value) => !value.status.toLowerCase().includes('cancel')
    );
  }

  createNotification(type, keywords, status) {
    let title = '';
    let subtitle = '';

    if (status == 'update') {
      if (type == 'success') {
        title = `Request ${keywords}`;
        subtitle = `Work with Permit is successfully ${keywords}`;
      } else {
        title = `Cannot ${keywords}`;
        subtitle = `Work with Permit failed to ${keywords}. Please try again`;
      }
    } else {
      let array = this.cancelItem.join(', ');
      if (type == 'success') {
        title = `Request ${keywords}`;
        subtitle = `${array} is successfully ${keywords}`;
      } else {
        title = `Cannot ${keywords}`;
        subtitle = `${array} failed to ${keywords}. Please try again`;
      }
    }

    const successNotif = {
      type: type,
      title: title,
      subtitle: subtitle,
      time: `${this.date.getHours()}` + ' : ' + `${this.date.getMinutes()}`,
    };
    this.appService.showToaster(successNotif);
    this.cancelItem = [];
  }

  disableCheckbox() {
    if (this.formStatus) {
      this.workPermit.forEach((element) => {
        if (this.formStatus.toLowerCase() != 'booked') {
          element.disabled = true;
          // console.log('in');
        } else {
          if (
            element.status.toLowerCase().includes('cancel') ||
            element.status.toLowerCase().includes('pending') ||
            element.status.toLowerCase().includes('endorse')
          ) {
            element.disabled = true;
          }
        }
      });
    }
  }

  clearSelect() {
    let items = [
      'confinedSpaceChkBox',
      'hotWorkChkBox',
      'divingChkBox',
      'coldWorkChkBox',
    ];

    items.forEach((element) => {
      if (!this.indicator[element]) {
        this[element] = false;
      }
    });
  }

  convertToTitleCase(str) {
    return str
      .replace(/_/g, ' ')
      .replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
  }
}
