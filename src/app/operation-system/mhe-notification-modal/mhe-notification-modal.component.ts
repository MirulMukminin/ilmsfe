import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { RequestFormService } from '../services/MHE/request-form.service';

@Component({
  selector: 'app-mhe-notification-modal',
  templateUrl: './mhe-notification-modal.component.html',
  styleUrls: ['./mhe-notification-modal.component.scss']
})
export class MheNotificationModalComponent implements OnChanges {
  @Input() modalType: string;
  @Input() proceedLink: string;

  creditOpen = false;
  blockedOpen = false;
  previousURL = "";

  constructor(private requestFormService: RequestFormService, private router: Router) { }


  ngOnChanges(changes: SimpleChanges) {
        
    this.modalAppear(changes.modalType.currentValue);
    
  }

  modalAppear(modal: string){

    if (modal == "credit") {
      this.creditOpen = true;
    } else if (modal == "blocked") {
      this.blockedOpen = true;
    }

  }
  

  redirectToPrevious() {

    this.previousURL = this.requestFormService.getPreviousUrl();
    this.router.navigate([this.previousURL]);
    
  }

}
