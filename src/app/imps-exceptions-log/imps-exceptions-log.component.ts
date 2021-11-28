import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { FormValidationsService } from '../form-validations.service';
import { ImpsExceptionsLogService } from './imps-exceptions-log.service';


declare var showToastMessage: any;

@Component({
  selector: 'app-imps-exceptions-log',
  templateUrl: './imps-exceptions-log.component.html',
  styleUrls: ['./imps-exceptions-log.component.css']
})
export class ImpsExceptionsLogComponent implements OnInit {
  impsExceptionMaster:any=[]
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    private impsExceptionService: ImpsExceptionsLogService
  ) { }


  ngOnInit(): void {
    this.commonServiceCall.pageName = "Exceptions Log";
    this.impsExceptionMaster = [
      {
        data: '<note> <to>Tove</to> <from>Jani</from> <heading>Reminder</heading> <body>Dont forget me this weekend!</body> </note>'
      },
    ]
    this.commonMethod.setDataTable(this.commonServiceCall.pageName);
  }

}
