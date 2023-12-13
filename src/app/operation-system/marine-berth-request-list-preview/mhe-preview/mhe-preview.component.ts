import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { MhePreviewConsoleComponent } from './mhe-preview-console/mhe-preview-console.component';
import { MhePreviewNormalComponent } from './mhe-preview-normal/mhe-preview-normal.component';
import { BerthRequestFormService } from '../../services/Marine/berth-request-form.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mhe-preview',
  templateUrl: './mhe-preview.component.html',
  styleUrls: ['./mhe-preview.component.scss'],
})
export class MhePreviewComponent implements OnInit, OnDestroy {
  RequestNo: string = '';
  @ViewChild(MhePreviewConsoleComponent)
  mhePreviewConsoleComponent: MhePreviewConsoleComponent;
  @ViewChild(MhePreviewNormalComponent)
  mhePreviewNormalComponent: MhePreviewNormalComponent;

  @Input() formStatus: string;
  @Output() workProgramSummary = new EventEmitter<any>();

  machineryArr: any[] = [];
  machinery: any[] = [];
  manpowerArr: any[] = [];
  manpower: any[] = [];
  equipmentArr: any[] = [];
  equipment: any[] = [];
  externalItemArr: any[] = [];
  externalItem: any[] = [];

  counterMachinery = 0;
  counterManpower = 0;
  counterEquipment = 0;
  counterExternal = 0;

  requestNo = '';
  workProgram = '';
  requestType = '';
  jobDesc = '';
  requestBehalf = '';
  bookingType = '';
  bookingDate = '';
  remarks = '';
  status = '';
  estDuration = '';
  estTrip = '';
  estQty = '';
  mheFormID = '';
  berthFormID = '';

  recurringDate = [];

  openEdit = false;
  arrayData: any;
  date = new Date();
  // formStatus: any;
  subscription!: Subscription;

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
        console.log('formStatus', this.formStatus);
        this.disableCheckbox();
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getRestServiceAPI() {
    console.log('formStatus', this.formStatus);

    this.RequestNo = this._Activatedroute.snapshot.paramMap.get('RequestNo');
    const getCode: any = { requestNo: this.RequestNo };

    restServices.pbksb_MarineService
      .GetMHERequestFormDetails(this.appService.myApp)(getCode)
      .then((result) => {
        const resArr: any = result;
        this.arrayData = JSON.parse(resArr);

        console.log(this.arrayData.berthMHERequest);

        if (this.arrayData.berthMHERequest.length > 0) {
          this.mheFormID = this.arrayData.berthMHERequest[0].id;
          this.berthFormID = this.arrayData.berthMHERequest[0].berth_form.id;
          this.requestNo =
            this.arrayData.berthMHERequest[0]?.request_number ?? 'N/A';
          this.requestType =
            this.arrayData.berthMHERequest[0]?.request_type ?? 'N/A';
          this.jobDesc =
            this.arrayData.berthMHERequest[0]?.job_description ?? 'N/A';
          this.requestBehalf =
            this.arrayData.berthMHERequest[0]?.request_behalf.name ?? 'N/A';
          this.bookingType =
            this.arrayData.berthMHERequest[0]?.booking_type ?? 'N/A';

          if (this.arrayData.berthMHERequest[0]?.request_type != 'NORMAL') {
            this.estTrip = this.arrayData.berthMHERequest[0]?.estimated_trip;
            this.estDuration =
              this.arrayData.berthMHERequest[0]?.estimated_duration;
            this.estQty = this.arrayData.berthMHERequest[0]?.estimated_quantity;
          }

          if (this.bookingType == 'RECURRING') {
            let sortedDate = this.arrayData.berthMHERequestDateRecurrings.sort(
              (a, b) =>
                this.getTimeTest(a.start_date) - this.getTimeTest(b.start_date)
            );

            console.log(sortedDate);

            sortedDate.forEach((element) => {
              this.recurringDate.push({
                startDate: element.start_date,
                endDate: element.end_date,
              });
            });
          } else {
            console.log('in');

            this.bookingDate =
              formatDate(
                this.arrayData.berthMHERequest[0].booking_date,
                'dd/MM/yyyy',
                'en_US'
              ) ?? 'N/A';
          }

          this.remarks = this.arrayData.berthMHERequest[0]?.remarks ?? 'N/A';
          this.status = this.arrayData.berthMHERequest[0]?.status ?? 'N/A';

          this.machineryArr = this.arrayData.machineries;
          this.manpowerArr = this.arrayData.manpowers;
          this.equipmentArr = this.arrayData.equipments;
          this.externalItemArr = this.arrayData.externalItems;

          this.machineryArr.forEach((element) => {
            this.machinery.push({
              id: element.id ?? 'N/A',
              item: element?.item?.description ?? 'N/A',
              work: element?.program ?? 'N/A',
              qty: element?.quantity ?? 'N/A',
              time: element?.time?.replace(/:[^:]*$/, '') ?? 'N/A',
              estHrs: element?.estimated_hour ?? 'N/A',
              location: element?.location?.description ?? 'N/A',
              crew:
                this.requestType != 'CONSOLE'
                  ? element.hasOwnProperty('specific_crew')
                    ? element.specific_crew.name
                    : '-'
                  : '-',
              jobTicket: element?.job_ticket,
              usageHours: element?.usage ?? 'N/A',
              status: element?.status ?? 'N/A',
              select: false,
              disabled: false,
            });
          });

          this.manpowerArr.forEach((element) => {
            this.manpower.push({
              id: element?.id ?? 'N/A',
              item: element?.item?.description ?? 'N/A',
              work: element?.program ?? 'N/A',
              qty: element?.quantity ?? 'N/A',
              time: element?.time?.replace(/:[^:]*$/, '') ?? 'N/A',
              estHrs: element?.estimated_hour ?? 'N/A',
              location: element?.location?.description ?? 'N/A',
              crew: element?.specific_crew?.name ?? '-',
              jobTicket: element?.job_ticket,
              usageHours: element?.usage ?? 'N/A',
              status: element?.status ?? 'N/A',
              select: false,
              disabled: false,
            });
          });

          this.equipmentArr.forEach((element) => {
            this.equipment.push({
              id: element.id ?? 'N/A',
              item: element?.item?.description ?? 'N/A',
              work: element?.program ?? 'N/A',
              qty: element?.quantity ?? 'N/A',
              time: element?.time?.replace(/:[^:]*$/, '') ?? 'N/A',
              estHrs: element?.estimated_hour ?? 'N/A',
              location: element?.location?.description ?? 'N/A',
              jobTicket: element?.job_ticket,
              usageHours: element?.usage ?? 'N/A',
              status: element?.status ?? 'N/A',
              select: false,
              disabled: false,
            });
          });

          this.externalItemArr.forEach((element) => {
            this.externalItem.push({
              id: element?.id ?? 'N/A',
              quotation_id: element?.quotation?.quotation ?? 'N/A',
              item: element?.quotation?.description ?? 'N/A',
              uom: element?.uom ?? 'N/A',
              qty: element?.quantity ?? 'N/A',
              rent_period: element?.rent_period ?? 'N/A',
              unit: element?.unit ?? 'N/A',
              time: element?.time?.replace(/:[^:]*$/, '') ?? 'N/A',
              location: element?.location?.description ?? 'N/A',
              jobTicket: element?.job_ticket,
              usageHours: element?.usage ?? 'N/A',
              status: element?.status ?? 'N/A',
              select: false,
              disabled: false,
            });
          });
        }
      })
      .then(() => {
        this.disableCheckbox();
      });
  }

  checkLengthItem(type: any) {
    return this[type].some((item) => item.select == true);
  }

  async deleteItem(type: any, counter: any) {
    let machinery = [];
    let manpower = [];
    let equipment = [];
    let externalItem = [];
    let cancelItem = '';

    this[type].forEach((ticket) => {
      if (ticket.select) {
        ticket.select = false;
        // this[type] = this[type].filter((item) => item.select !== ticket.select);
        if (type == 'machinery') {
          machinery.push({ id: ticket.id });
        } else if (type == 'manpower') {
          manpower.push({ id: ticket.id });
        } else if (type == 'equipment') {
          equipment.push({ id: ticket.id });
        } else {
          externalItem.push({ id: ticket.id });
        }
      }
      this[counter] = 0;
    });

    let param = {
      form: {
        formID: this.berthFormID,
      },
    };

    let cancelResult: any = true;

    if (machinery.length > 0) {
      param.form['machinery'] = machinery;
      cancelResult = await this.cancelJob(
        param,
        'CancelMachinery',
        'Machinery'
      );
      cancelItem = 'Machinery';
    }

    if (manpower.length > 0) {
      param.form['manpower'] = manpower;
      cancelResult = await this.cancelJob(param, 'CancelManpower', 'Manpower');
      cancelItem = 'Manpower';
    }

    if (equipment.length > 0) {
      param.form['equipment'] = equipment;
      cancelResult = await this.cancelJob(
        param,
        'CancelEquipment',
        'Equipment'
      );
      cancelItem = 'Equipment';
    }

    if (externalItem.length > 0) {
      param.form['externalItem'] = externalItem;
      cancelResult = await this.cancelJob(
        param,
        'CancelExternalItem',
        'External Item'
      );
      cancelItem = 'External Item';
    }

    if (cancelResult) {
      this.machinery = [];
      this.manpower = [];
      this.equipment = [];
      this.externalItem = [];

      let params = {
        form: {
          formID: this.berthFormID,
        },
      };

      restServices.pbksb_MarineService
        .SetMHEFormStatus(this.appService.myApp)(params)
        .then((result) => {
          let request: any = result;
          let response = JSON.parse(request);
          if (!response.status) {
            // console.log(response);
            console.log('set mhe form success');
            this.workProgramSummary.emit();
            this.ngOnInit();
            this.createNotification('success', 'cancelled', cancelItem);
          } else {
            console.log(response, 'set mhe form failed');
          }
        })
        .catch((err) => {
          console.log(err, 'set mhe form failed');
        });
    }
  }

  async cancelJob(param, type, name) {
    let result = await restServices.pbksb_MarineService[type](
      this.appService.myApp
    )(param)
      .then((result) => {
        let request: any = result;
        let response = JSON.parse(request);
        if (!response.status) {
          // console.log(response);
          console.log(`${type} cancel success`);
          return true;
        } else {
          console.log(response, `${type} cancel failed`);
          this.createNotification('error', 'cancel', name);
          return false;
        }
      })
      .catch((err) => {
        console.log(err, `${type} cancel failed`);
        this.createNotification('error', 'cancel', name);
        return false;
      });

    console.log(result);

    return result;
  }

  cancelItem(type: any, counter: any) {
    this[type].forEach((ticket) => {
      if (ticket.select) {
        ticket.select = false;
      }
    });
    this[counter] = 0;
  }

  listCheckboxItem(event: any, counter: any) {
    if (event === true) {
      this[counter]++;
    } else if (event == false) {
      this[counter]--;
    }
  }

  checkLengthMachinery() {
    return this.machinery.some((item) => item.select == true);
  }

  deleteMachinery() {
    this.machinery.forEach((ticket) => {
      if (ticket.select) {
        this.machinery = this.machinery.filter(
          (item) => item.select !== ticket.select
        );
      }
      this.counterMachinery = 0;
    });
  }

  cancelMachinery() {
    this.machinery.forEach((ticket) => {
      if (ticket.select) {
        ticket.select = false;
      }
    });
    this.counterMachinery = 0;
  }

  listCheckbox(event: any) {
    if (event === true) {
      this.counterMachinery++;
    } else if (event == false) {
      this.counterMachinery--;
    }
  }

  checkLengthManpower() {
    return this.manpower.some((item) => item.select == true);
  }

  deleteManpower() {
    this.manpower.forEach((ticket) => {
      if (ticket.select) {
        this.manpower = this.manpower.filter(
          (item) => item.select !== ticket.select
        );
      }
      this.counterManpower = 0;
    });
  }

  cancelManpower() {
    this.manpower.forEach((ticket) => {
      if (ticket.select) {
        ticket.select = false;
      }
    });
    this.counterManpower = 0;
  }

  listMPCheckbox(event: any) {
    if (event === true) {
      this.counterManpower++;
    } else if (event == false) {
      this.counterManpower--;
    }
  }

  checkLengthEquipment() {
    return this.equipment.some((item) => item.select == true);
  }

  deleteEquipment() {
    this.equipment.forEach((ticket) => {
      if (ticket.select) {
        this.equipment = this.equipment.filter(
          (item) => item.select !== ticket.select
        );
      }
      this.counterEquipment = 0;
    });
  }

  cancelEquipment() {
    this.equipment.forEach((ticket) => {
      if (ticket.select) {
        ticket.select = false;
      }
    });
    this.counterEquipment = 0;
  }

  listEquipmentCheckbox(event: any) {
    if (event === true) {
      this.counterEquipment++;
    } else if (event == false) {
      this.counterEquipment--;
    }
  }

  checkLengthExternal() {
    return this.externalItem.some((item) => item.select == true);
  }

  deleteExternal() {
    this.externalItem.forEach((ticket) => {
      if (ticket.select) {
        this.externalItem = this.externalItem.filter(
          (item) => item.select !== ticket.select
        );
      }
      this.counterExternal = 0;
    });
  }

  cancelExternal() {
    this.externalItem.forEach((ticket) => {
      if (ticket.select) {
        ticket.select = false;
      }
    });
    this.counterExternal = 0;
  }

  listExternalCheckbox(event: any) {
    if (event === true) {
      this.counterExternal++;
    } else if (event == false) {
      this.counterExternal--;
    }
  }

  onUpdate() {
    if (this.requestType != 'NORMAL') {
      this.mhePreviewConsoleComponent.onSave();
    } else {
      this.mhePreviewNormalComponent.onSubmit();
    }

    // this.openEdit = false;
  }

  updateMHE() {
    this.openEdit = false;
    this.machinery = [];
    this.manpower = [];
    this.equipment = [];
    this.externalItem = [];
    this.ngOnInit();
  }

  getTimeTest(date?: Date) {
    //return date != null ? new date.getTime() : 0;
    return date != null ? new Date(date).getTime() : 0;
  }

  createNotification(type, keywords, name) {
    let title = '';
    let subtitle = '';

    if (type == 'success') {
      title = `Request ${keywords}`;
      subtitle = `${name} items is successfully ${keywords}`;
    } else {
      title = `Cannot ${keywords}`;
      subtitle = `${name} failed to ${keywords}. Please try again`;
    }

    const successNotif = {
      type: type,
      title: title,
      // subtitle: "Request No." + ' ' + requestNumber + ' ' + 'is successfully submitted',
      subtitle: subtitle,
      time: `${this.date.getHours()}` + ' : ' + `${this.date.getMinutes()}`,
    };

    this.appService.showToaster(successNotif);
  }

  disableCheckbox() {
    let list = ['machinery', 'manpower', 'equipment', 'externalItem'];
    if (this.formStatus) {
      list.forEach((array) => {
        this[array].forEach((element) => {
          if (this.formStatus != 'BOOKED') {
            element.disabled = true;
            console.log('in');
          } else {
            if (
              element.status == 'CANCELLED' ||
              element.status == 'PENDING_ENDORSEMENT' ||
              element.status == 'ENDORSED'
            ) {
              element.disabled = true;
            }
          }
        });
      });
    }
  }
}
