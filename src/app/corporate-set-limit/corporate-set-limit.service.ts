import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CorporateSetLimitService {

  constructor() { }

  setLimitCall(companyId, accNumber) {
    var inputData = {
      "companyId": companyId,
      "accNumber": accNumber,
    }
    return inputData;
  }
}
