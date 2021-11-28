import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
import { CorporateSetLimitService } from './corporate-set-limit.service';
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-corporate-set-limit',
  templateUrl: './corporate-set-limit.component.html',
  styleUrls: ['./corporate-set-limit.component.css']
})
export class CorporateSetLimitComponent implements OnInit {
  corporateSetLimitForm: FormGroup;
  remarkForm: FormGroup
  masterAccount: any = [];
  masterUser: any = [];
  masterCompany: any = [];
  accountDetails: any = []
  finalarray: any = [];
  formErrors = {
    company: '',
    user: '',
    account: ''
  }
  userId: any = ""
  accountId: any = ""
  companyId: any = ""
  menuLink = "corpSetLimit"
  priviledgeDataArr: any = [];
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    public corporateSetLimitService: CorporateSetLimitService,
    private appConstants: AppConstants,
    public location: Location,
  ) { }

  public buildForm() {
    this.corporateSetLimitForm = this.form.group({
      company: new FormControl('', [Validators.required]),
      account: new FormControl('', [Validators.required]),
      user: new FormControl('', [Validators.required]),
    });
    this.corporateSetLimitForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.corporateSetLimitForm, this.formErrors, true)
    });
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Corporate Set Limit";
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.buildForm();
    this.getAccountType()
    this.getCompanyList()
    this.getLeftMenuId()
  }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstants.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        this.commonDataShareService.submenuId = res.result[0].id;
        id = res.result[0].id;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

  getPriviledgeData(id) {
    var url = this.appConstants.getPriviledgeDataUrl + id + "/" + this.commonDataShareService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if (this.priviledgeDataArr.viewChecked) {
        }
        else {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

  getAccountType() {
    this.commonServiceCall.getResponsePromise(this.appConstants.getAllAccountTypes).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res.result);
        res.result.forEach(element => {
          if (element.statusname == 'ACTIVE') {
            this.masterAccount.push(element);
          }
        });
      } else {
        this.commonMethod.errorMessage(data);
      }
    });
  }

  getUsers(companyId) {
    this.masterUser = [];
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getCorpUsersByCompId + companyId).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res.result);
        this.masterUser = res.result;
        if(this.masterUser.length == 0) {
          this.corporateSetLimitForm.get('user').setValue("");
          this.accountDetails = [];
          showToastMessage('No Users Mapped');
        }
      } else {
        this.commonMethod.errorMessage(data);
      }
      this.commonMethod.hideLoader();
    });
  }

  getCompanyList() {
    this.commonMethod.showLoader();
    this.masterCompany = [];
    this.commonServiceCall.getResponsePromise(this.appConstants.getCorpCompanyDetailsUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        res.result.forEach(element => {
          if (element.statusName == 'ACTIVE') {
            this.masterCompany.push(element)
          }
        })
      } else {
        this.errorCallBack(this.appConstants.getCorpCompanyDetailsUrl, res);
      }
      this.commonMethod.hideLoader();
      this.commonMethod.destroyDataTable();
    });
  }

  /* This function calls when an error occurs */
  errorCallBack(fld, res) {
    if (fld == this.appConstants.addConfigMasterUrl) {
      this.commonMethod.errorMessage(res);
    }
  }

  cancel() {
    this.commonMethod.cancel();
  }

  onCompanySelected(companyId) {
    this.companyId = companyId
    this.getUsers(companyId)
  }

  onUserSelected(userId) {
    this.userId = userId
  }

  onAccountSelected(accountId) {
    this.accountId = accountId
  }

  getUserAccountNumber() {

    this.formValidation.markFormGroupTouched(this.corporateSetLimitForm);
    if (this.corporateSetLimitForm.valid) {
      var formData = this.corporateSetLimitForm.value;
      ///Bank api calling

      this.accountDetails = [];
      this.accountDetails = [
        { accNum: "1234567890", cif: "0777", customername: "Shubham", username: "Shubham", email: "abc@gmail.com", mobile: "9999999999" },
        { accNum: "0987654321", cif: "0888", customername: "Ravi", username: "Ravi", email: "cba@gmail.com", mobile: "8888888888" },
        { accNum: "6789054321", cif: "0999", customername: "Vikrant", username: "Vikrant", email: "xyz@gmail.com", mobile: "7777777777" },

      ]
      this.accountDetails.forEach((element) => {
        element.isChecked = false;
      });
      this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
    } else {
      this.accountDetails = [];
      this.formErrors = this.formValidation.validateForm(this.corporateSetLimitForm, this.formErrors, false)
    }
    this.commonMethod.destroyDataTable();
  }

  cancelClick() {
    this.commonMethod.cancel();
  }

  selectsingle(item) {
    var objIndex = this.accountDetails.findIndex((obj) => obj.cif == item.cif);
    if (this.accountDetails[objIndex].isChecked == true) {
      this.accountDetails[objIndex].isChecked = false;
    } else {
      this.accountDetails[objIndex].isChecked = true;
    }
  }

  gotoAddSetLimit() {
    this.finalarray = [];
    var newarray = [];
    newarray = this.accountDetails;
    this.finalarray = newarray.filter((f) => f.isChecked == true);

    if (this.finalarray.length > 0) {
      if (this.finalarray.length == 1) {
        var param = this.corporateSetLimitService.setLimitCall(this.companyId, this.finalarray[0].accNum);
        this.setAccLimit(param);
      }
      else {
        showToastMessage("Please Select Only One Account Number");
      }
    }
    else {
      showToastMessage("Please Select Account Number");
    }
  }

  setAccLimit(param) {
    console.log(param);
    var url = this.appConstants.getCorpTransactionsLimitUrl + param.accNumber + '/' + param.companyId
    this.commonServiceCall.getResponsePromise(url).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonDataShareService.submenuname = "corpSetLimitAdd";
        this.router.navigateByUrl("/corpSetLimitView", { state: { id: this.finalarray[0].accNum, companyId: this.companyId, url: this.router.url } });
      }
      else if (res.responseCode == "202") {
        this.commonDataShareService.submenuname = "corpSetLimitAdd";
        this.router.navigateByUrl("/corpSetLimitAdd", { state: { id: this.finalarray[0].accNum, companyId: this.companyId, url: this.router.url } });
      }
      else {
        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
      }
    });
  }

}
