import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser;
  currentRole;
  userType;
  // currentRoleSub = new Subject();
  private currentRoleSub = new BehaviorSubject<String[]>([]);
  private currentRoleSub$ = this.currentRoleSub.asObservable();
  private userTypeSub = new BehaviorSubject<String>('');
  private userTypeSub$ = this.userTypeSub.asObservable();

  constructor() {}

  getCurrentUser() {
    return this.currentUser;
  }

  setCurrentUser(data) {
    this.currentUser = data;
  }

  getCurrentRole() {
    return this.currentRoleSub$;
  }

  setCurrentRole(data) {
    this.currentRole = data;
    this.currentRoleSub.next(data);
  }

  getUserType() {
    return this.userTypeSub$;
  }

  setUserType(data) {
    this.userType = data;
    this.userTypeSub.next(data);
  }
}
