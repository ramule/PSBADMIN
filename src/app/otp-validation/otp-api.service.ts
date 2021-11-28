import { CommonMethods } from '../common-methods';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
@Injectable({
  providedIn: 'root'
})
export class OtpAPIService {

  constructor(private constants : AppConstants, private commonMethod:CommonMethods, private commonDataService : CommonDataShareService) { }
  otpValidationCall(formdata){

  }

  resendOtpCall(){
  
  }

}
