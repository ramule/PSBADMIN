import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { ActiveDirectoryService } from './active-directory.service';
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-active-directory',
  templateUrl: './active-directory.component.html',
  styleUrls: ['./active-directory.component.css']
})
export class ActiveDirectoryComponent implements OnInit {

  activeDirectoryForm: FormGroup;
  activeDirUsersArr: any = [];
  formErrors = {
    searchVal: ''
  }
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    public commonDatashareService: CommonDataShareService,
    private formValidation: FormValidationsService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private activeDirectoryService: ActiveDirectoryService
  ) { }

  public buildForm() {
    this.activeDirectoryForm = this.form.group({
      searchVal: new FormControl('', [Validators.required]),
    });
    this.activeDirectoryForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.activeDirectoryForm, this.formErrors, true);
    });
  }

  ngOnInit() {
    this.commonServiceCall.pageName = "Manage Active Directory";
    this.buildForm();
    this.commonMethod.hideLoader();
  }

  onSubmit() {
    if (this.activeDirectoryForm.valid) {
      console.log(this.activeDirectoryForm.value);
      var param = this.activeDirectoryService.getActiveUser(this.activeDirectoryForm.value);
      this.getActiveDirectoryUsers(param);
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.activeDirectoryForm, this.formErrors, false);
    }
  }

  getActiveDirectoryUsers(param) {
    this.activeDirUsersArr = [];
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall.postResponsePromise(this.appConstants.checkUserUrl, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        var cn = res.result.cn;
        var mail = res.result.mail;
        var sn = res.result.sn;
        var title = res.result.title;
        var sAMAccountName = res.result.sAMAccountName;
        var sAMAccountType = res.result.sAMAccountType;

        var arrData = {
          cn: cn,
          mail: mail,
          sn: sn,
          title: title,
          sAMAccountName: sAMAccountName,
          sAMAccountType: sAMAccountType
        };

        console.log(res.result);
        this.activeDirUsersArr.push(arrData);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        console.log('response array: ', this.activeDirUsersArr);
      }
      else if (res.responseCode == "202") {
        showToastMessage(res.responseMessage);
      }
      else {
        this.errorCallBack(this.appConstants.checkUserUrl, res);
      }
      this.commonMethod.hideLoader();
      this.commonMethod.destroyDataTable();
    });
  }

  add(item) {
    var userDetails = (this.commonServiceCall.userCredential);
    if (item) {
      var inputData = this.activeDirectoryService.getAdduserParam(item);
      this.addUserMaster(inputData);
    }
  }

  addUserMaster(param) {
    console.log('adding user: ', param);
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.addUserDetails, param).subscribe(data => {
      var res = data.resp;
      console.log('add user response: ', res);
      if (res.responseCode == "200") {
        console.log(res);
        showToastMessage(res.responseMessage);
        // this.router.navigateByUrl("/adminstration");
        this.activeDirUsersArr = [];
        this.activeDirectoryForm.reset();
      } else {
        this.errorCallBack(this.appConstants.addUserDetails, res);
      }
      this.commonMethod.hideLoader();
    })
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

}
