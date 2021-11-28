import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { Location } from '@angular/common';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CorpUserRequestsService } from './corp-user-requests.service';
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-corp-user-requests',
  templateUrl: './corp-user-requests.component.html',
  styleUrls: ['./corp-user-requests.component.css']
})
export class CorpUserRequestsComponent implements OnInit {

  corporateUserRequestsArr: any = [];
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public location: Location,
    public corpUserService: CorpUserRequestsService
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Corporate User Requests";

    this.corporateUserRequestsArr = [
      {
        "corp_id": 10100,
        "CIF": 20333201,
        "Account_No": 2011003326336,
        "User_creation": "Corporate Maker",
        "menu_mapping": "Settings, Corporate Accounts",
        "account_mapping": 2011003326330,
        "status": 'Active'
      },
      {
        "corp_id": 10100,
        "CIF": 20333213,
        "Account_No": 2011003326336,
        "User_creation": "Corporate Checker",
        "menu_mapping": "Settings, Corporate Accounts",
        "account_mapping": 2011003326331,
        "status": 'Active'
      },
      {
        "corp_id": 10100,
        "CIF": 20333222,
        "Account_No": 2011003326336,
        "User_creation": "Admin",
        "menu_mapping": "Settings, Requests Approval, Corporate Accounts",
        "account_mapping": 2011003326332,
        "status": 'Active'
      }
    ];
    this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

}
