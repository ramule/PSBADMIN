import { Injectable } from '@angular/core';
import { CanLoad, Router, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { LoginService } from './login/login.service';
import { AppConstants } from './app-constants';
declare var showToastMessage: any;
@Injectable({
  providedIn: 'root'
})
export class CanLoadGuardService implements CanLoad {

  public userIsAuthenticated = sessionStorage.getItem('isLoggedIn');
  constructor(
    private appConstant: AppConstants,
    private router: Router
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this.userIsAuthenticated);
    if (this.userIsAuthenticated === 'false') {
      return this.router.navigateByUrl('/login');
    } else {
      return true;
    }
  }
}
