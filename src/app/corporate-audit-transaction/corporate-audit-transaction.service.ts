import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class CorporateAuditTransactionService {

  constructor(
    public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods

  ) { }

  getTranacionParam(formdata){
    var inputData = {
      fromdate: formdata.fromDate,
      todate: formdata.toDate
    }
    return inputData;
  }
}
