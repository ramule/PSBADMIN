import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { FormValidationsService } from '../form-validations.service';
import { ImpsMyreportService } from './imps-myreport.service';

declare var showToastMessage: any;

@Component({
  selector: 'app-imps-myreport',
  templateUrl: './imps-myreport.component.html',
  styleUrls: ['./imps-myreport.component.css']
})
export class ImpsMyreportComponent implements OnInit {
  impsMyReportMaster:any=[]
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    private impsMyReportService: ImpsMyreportService
  ) { }

  
  ngOnInit(): void {
    this.commonServiceCall.pageName = "MyReport";
    this.impsMyReportMaster = [
      {
         amount:'100',
         bene_mas:'009',
         operating_channel:'Internet',
         cdci_time:'10',
         channel_identifier:'121',
         status:'C',
         nfs_port:'9900',
         merchant_ref:'This is data.',
         f120_res:'0011124800000222222'
      },
      {
        amount:'100',
         bene_mas:'009',
         operating_channel:'Internet',
         cdci_time:'10',
         channel_identifier:'121',
         status:'C',
         nfs_port:'9900',
         merchant_ref:'This is data.',
         f120_res:'0011124800000222222'
      },
      {
        amount:'100',
         bene_mas:'009',
         operating_channel:'Internet',
         cdci_time:'10',
         channel_identifier:'121',
         status:'C',
         nfs_port:'9900',
         merchant_ref:'This is data.',
         f120_res:'0011124800000222222'
      },
      {
        amount:'100',
        bene_mas:'009',
        operating_channel:'Internet',
        cdci_time:'10',
        channel_identifier:'121',
        status:'C',
        nfs_port:'9900',
        merchant_ref:'This is data.',
        f120_res:'0011124800000222222'
      }
    ]
    this.commonMethod.setDataTable(this.commonServiceCall.pageName);
  }


}
