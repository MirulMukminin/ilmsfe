import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';
import { BerthRequestFormService } from '../../services/Marine/berth-request-form.service';

@Component({
  selector: 'app-mhe',
  templateUrl: './mhe.component.html',
  styleUrls: ['./mhe.component.scss'],
})
export class MheComponent implements OnInit {
  @Output() stepChanged: EventEmitter<number> = new EventEmitter();
  @Input() poNumber: string;
  @ViewChild('workProgramElement') workProgramElement: ElementRef;

  currentStep = 1;

  requestType: string = 'Normal';
  open = false;

  count = 0;
  continueConsole = false;
  cancelConsole = false;
  checked = false;
  checkedConsole = false;
  RequestNo: any;
  poNum: any;
  workProgram: any;
  invalidProgram = false;

  programme: any[] = [
    {
      content: 'Discharge',
      value: 'DISCHARGE',
    },
    {
      content: 'Loading',
      value: 'LOADING',
    },
    {
      content: 'Discharge & Loading',
      value: 'DISCHARGE_LOADING',
    },
  ];

  constructor(
    private appService: AppService,
    private berthRequestFormService: BerthRequestFormService,
    private _Activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this._Activatedroute.snapshot.paramMap.get('requestNum')) {
      this.RequestNo = this._Activatedroute.snapshot.paramMap.get('requestNum');
      this.getData();
    } else if (this.berthRequestFormService.getrequestNo()) {
      this.RequestNo = this.berthRequestFormService.getrequestNo();
      this.getData();
    }
    this.poNum = this.poNumber;
  }
  stepChangedHandler(step: number) {
    this.currentStep = step;
    this.stepChanged.emit(this.currentStep);
  }

  getData() {
    restServices.pbksb_MarineService
      .GetMHERequestFormDetails(this.appService.myApp)({
        requestNo: this.RequestNo,
      })
      .then((result) => {
        const resArr: any = result;
        const array = JSON.parse(resArr);
        // console.log(array);

        if (array.berthMHERequest.length > 0) {
          if (array.berthMHERequest[0].request_type == 'NORMAL') {
            this.requestType = 'Normal';
            this.checked = true;
            this.checkedConsole = false;
          } else {
            this.requestType = 'Console';
            this.checkedConsole = true;
            this.checked = false;
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onChange(event: any) {
    // console.log(event.value)

    this.requestType = event.value;

    if (this.requestType == 'Console') {
      this.count++;
      if (this.count == 1) {
        this.open = true;
      }
    }

    if (this.count > 1) {
      if (this.requestType == 'Normal') {
        this.checked = true;
        this.checkedConsole = false;
      } else if (this.requestType == 'Console') {
        this.checkedConsole = true;
        this.checked = false;
      }
    }

    if (this.requestType == 'Normal') {
      this.checked = true;
      this.checkedConsole = false;
    }
  }

  onClickCancel(event: any) {
    if (event) {
      this.open = false;
      this.checked = false;
      this.requestType = 'Normal';
    }
  }

  onClickCancelConsole() {
    if (this.count == 1) {
      this.checked = true;
    }
  }

  inputValueChange() {
    if (this.workProgram && this.workProgram.length > 0) {
      this.berthRequestFormService.setWorkProgram(this.workProgram);
      this.invalidProgram = false;
    }
  }

  checkWorkProgram(value: any) {
    this.invalidProgram = value;
    if (this.invalidProgram) {
      this.workProgramElement.nativeElement.focus();
    }
  }
}
