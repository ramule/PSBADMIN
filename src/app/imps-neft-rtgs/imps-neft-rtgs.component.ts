import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { FormValidationsService } from '../form-validations.service';
import { ImpsNeftRtgsService } from './imps-neft-rtgs.service';




declare var showToastMessage: any;

@Component({
  selector: 'app-imps-neft-rtgs',
  templateUrl: './imps-neft-rtgs.component.html',
  styleUrls: ['./imps-neft-rtgs.component.css']
})
export class ImpsNeftRtgsComponent implements OnInit {

  impsNEFTMaster:any=[]
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    private impsNEFTRTGSService: ImpsNeftRtgsService
  ) { }

  
  ngOnInit(): void {
    this.commonServiceCall.pageName = "NEFT-RTGS Transaction Process";
    this.impsNEFTMaster = [
      {

         name:'nft.xls',
         status:'C',
         time:'2020-01-02 12:09:20 PM'
         

      },
      {
         name:'nft.xls',
         status:'C',
         time:'2020-01-02 12:09:20 PM'
         
      },
      {
         name:'nft.xls',
         status:'C',
         time:'2020-01-02 12:09:20 PM'
         
      },
      {
         name:'nft.xls',
         status:'C',
         time:'2020-01-02 12:09:20 PM'
         
        },
    ]
    this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
  }

  addReports()
  {
    this.router.navigateByUrl('/impsNEFTAdd')
  }



}
