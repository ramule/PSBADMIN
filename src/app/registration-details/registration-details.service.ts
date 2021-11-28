import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';

@Injectable({
  providedIn: 'root'
})
export class RegistrationDetailsService {

  constructor(public commonDataService: CommonDataShareService,
              public commonMethod: CommonMethods) { }

getRegistrationDetails(formData)
 {
   var inputData = {
         "fromdate":formData.fromDate,
         "todate":formData.toDate,

         
        }
         return inputData;
 }

}
