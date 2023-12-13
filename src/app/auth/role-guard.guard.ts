import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    var roles: Array<String>;
    this.auth.getCurrentRole().subscribe((role: Array<String>) => {
      roles = role;
    });
    console.log(roles);
    const expectedRole = route.data.expectedRole;
    console.log('expectedRole ', expectedRole);
    // if (expectedRole !== 'psbCustomer') {
    //   this.router.navigate(['/coming-soon']);

    //   return false;
    // }

    if (!roles.includes(expectedRole)) {
      this.router.navigate(['/coming-soon']);
      return false;
    }

    return true;
  }
}
