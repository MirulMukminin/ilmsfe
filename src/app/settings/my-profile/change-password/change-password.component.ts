import { formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { restServices } from 'services';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  @Output() changePassword = new EventEmitter<any>();
  @Output() submitPassword = new EventEmitter<any>();

  public showCurrentPassword: boolean;
  public showNewPassword: boolean;
  public showConfirmPassword: boolean;
  currentPassword: string;
  invalidCurrentPassword = false;
  newPassword: string;
  invalidNewPassword = false;
  confirmNewPassword: string;
  invalidConfirmNewPassword = false;
  invalidTextCurrentPassword = 'Current password required';
  // invalidTextNewPassword = 'New password required';
  invalidTextNewPassword: TemplateRef<any>;
  invalidTextConfirmNewPassword = 'Confirm new password required';
  isLoading = false;

  //invalid
  newPasswordMissing = '';
  newPasswordNotMatching = '';
  newPasswordLessThan8 = '';
  newPasswordAlphaNumeric = '';
  newPasswordCapitalLowercase = '';
  newPasswordContainNumber = '';

  @ViewChild('newPasswordInvalidText', { read: TemplateRef })
  newPasswordInvalidText: TemplateRef<any>;

  constructor(
    private appService: AppService,
    private router: Router,
    private vref: ViewContainerRef
  ) {}

  ngOnInit(): void {
    
  }

  cancelChange(): void {
    this.changePassword.emit(false);
  }

  inputValueChange() {
    // var regEx = /^[a-zA-Z0-9@#$]+$/;
    var regExCapitalLower = /^(?=.*[a-z])(?=.*[A-Z]).*$/;
    var regExNumber = /^(?=.*\d).*$/;
    //current password validation
    if (this.invalidTextCurrentPassword == 'Current password required') {
      if (this.currentPassword) {
        this.invalidCurrentPassword = false;
      }
    }
    //new password validation
    if(this.newPasswordMissing){
      if (this.newPassword) {
        this.newPasswordMissing = "";
      }
    }
    if(this.newPasswordLessThan8){
      if(this.newPassword.length >= 8){
        this.newPasswordLessThan8 = "";
      }
    }
    // if(this.newPasswordAlphaNumeric){
    //   if (this.newPassword.match(regEx)) {
    //     this.newPasswordAlphaNumeric = "";
    //   }
    // }
    if(this.newPasswordCapitalLowercase){
      if (this.newPassword.match(regExCapitalLower)) {
        this.newPasswordCapitalLowercase = "";
      }
    }
    if(this.newPasswordContainNumber){
      if (this.newPassword.match(regExNumber)) {
        this.newPasswordContainNumber = "";
      }
    }
    
    //clear confirm new password invalid
    if (!this.newPasswordMissing && !this.newPasswordNotMatching && !this.newPasswordLessThan8 && !this.newPasswordAlphaNumeric && !this.newPasswordCapitalLowercase&& !this.newPasswordContainNumber ){
      
      this.invalidNewPassword = false;
    }

    //confirm password validation
    if (this.invalidTextConfirmNewPassword == 'Confirm new password required') {
      if (this.confirmNewPassword) {
        this.invalidConfirmNewPassword = false;
      }
    }
    if(this.invalidTextConfirmNewPassword == 'Passwords does not match'){
      if (this.newPassword == this.confirmNewPassword) {
        this.invalidConfirmNewPassword = false;
      }
    }
    
  }

  onSubmit() {
    this.isLoading = true;
    var regEx = /^[a-zA-Z0-9@#$]+$/;
    var regExCapitalLower = /^(?=.*[a-z])(?=.*[A-Z]).*$/;
    var regExNumber = /^(?=.*\d).*$/;
    
    var isError = false;
    if (!this.currentPassword) {
      this.invalidCurrentPassword = true;
      this.invalidTextCurrentPassword = 'Current password required';
      isError = true;
    }
    if (!this.newPassword) {
      this.invalidNewPassword = true;
      this.newPasswordMissing = 'New password required';
      this.invalidTextNewPassword = this.newPasswordInvalidText;
      isError = true;
    } else {
      if (
        this.newPassword.length < 8) {
        this.invalidNewPassword = true;
        this.newPasswordLessThan8 =
          'Passwords needs to be at least 8 characters';
        isError = true;
      }
      // if (!this.newPassword.match(regEx)) {
      //   this.invalidNewPassword = true;
      //   this.newPasswordAlphaNumeric =
      //     'Passwords needs to be alphanumeric only';
      //   isError = true;
      // } 
      if (!this.newPassword.match(regExNumber)) {
        this.invalidNewPassword = true;
        this.newPasswordContainNumber =
          'Passwords needs to contain at least one number';
        isError = true;
      }
      if (!this.newPassword.match(regExCapitalLower)) {
        this.invalidNewPassword = true;
        this.newPasswordCapitalLowercase =
          'Passwords needs to contain at least one capital and one lower case letter';
        isError = true;
      }
      this.invalidTextNewPassword = this.newPasswordInvalidText;
    }
    if(this.confirmNewPassword){
      if (this.newPassword != this.confirmNewPassword) {
        this.invalidConfirmNewPassword = true;
        isError = true;
        this.invalidTextConfirmNewPassword = 'Passwords does not match';
      }
    }else{
      this.invalidConfirmNewPassword = true;
      this.invalidTextConfirmNewPassword = 'Confirm new password required';
      isError = true;
    }
    
    

    if (!isError) {
      const data = {
        currentPswd: this.currentPassword,
        pwdFieldRawValue: this.confirmNewPassword,
      };
      restServices.pbksb_PasswordManagerNewService
        .updatePsswrdwithUserSession(this.appService.myApp)(data)
        .then((result) => {
          this.isLoading = false;
          let currentTime = formatDate(new Date(), 'HH:mm', 'en_US');
          if (result == 'true') {
            let notiObject = {
              type: 'success',
              title: 'Submitted',
              subtitle: 'Password successfully updated',
              time: currentTime,
            };
            this.appService.showToaster(notiObject);

            this.submitPassword.emit(true);
          } else if (result) {
            let errorObject = {
              type: 'error',
              title: 'Cannot Submit',
              subtitle: 'Password failed to be updated. Please try again',
              time: currentTime,
            };
            this.appService.showToaster(errorObject);

            this.submitPassword.emit(false);
          }
        })
        .catch((err) => {
          let currentTime = formatDate(new Date(), 'HH:mm', 'en_US');
          let errorObject = {
            type: 'error',
            title: 'Cannot Submit',
            subtitle:
              'The request has failed to be submitted. Please try again',
            time: currentTime,
          };
          this.appService.showToaster(errorObject);
          this.submitPassword.emit(false);
        });
    } else {
      this.isLoading = false;
    }
  }
}
