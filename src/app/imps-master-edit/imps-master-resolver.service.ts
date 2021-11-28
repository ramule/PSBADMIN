import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';

@Injectable({
  providedIn: 'root'
})

export class ImpsMasterResolverService implements Resolve<any> {

  constructor(
    private httpCommonServiceCall: HttpCommonServiceCallService,
    private appConstants: AppConstants,
    private commonDataService: CommonDataShareService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const id = this.commonDataService.getById;
    console.log('id', id);
    var params = {
      "id": id
    }
    return this.httpCommonServiceCall.postResponsePromise(this.appConstants.getImpsMasterDetailsByIdUrl, params);
  };
}
