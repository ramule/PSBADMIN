import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { FormValidationsService } from '../form-validations.service';
import { ImpsAuditTrailService } from './imps-audit-trail.service';

declare var showToastMessage: any;


@Component({
  selector: 'app-imps-audit-trail',
  templateUrl: './imps-audit-trail.component.html',
  styleUrls: ['./imps-audit-trail.component.css']
})
export class ImpsAuditTrailComponent implements OnInit {

  impsAuditMaster:any=[]
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    private impsPermissionsService: ImpsAuditTrailService
  ) { }

  
  ngOnInit(): void {
    this.commonServiceCall.pageName = "System Log";
    this.impsAuditMaster = [
      {
         date:'2020-09-12 12:24:41',
         source:'User.admin',
         type:'SYSYTEM',
         summary:'Password reset: laxman'
      },
      {
        date:'2020-09-12 12:24:41',
        source:'User.admin',
        type:'SYSYTEM',
        summary:'Password reset: laxman'
      },
      {
        date:'2020-09-12 12:24:41',
        source:'User.admin',
        type:'SYSYTEM',
        summary:'Password reset: laxman'
      },
      {
        date:'2020-09-12 12:24:41',
        source:'User.admin',
        type:'SYSYTEM',
        summary:'Password reset: laxman'
      }
    ]
    this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
  }

}
