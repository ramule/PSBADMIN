import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { ChangePasswordService } from './change-password.service';
declare var showToastMessage: any;
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  id = 46;
  menuLink = "changePassword";
  priviledgeDataArr: any = [];
  EmailId: any = "";
  passValue: any = "";
  changePasswordForm: FormGroup;
  formErrors = {
    emailId: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private changePasswordService: ChangePasswordService
  ) { }

  public buildForm() {
    this.changePasswordForm = this.form.group({
      emailId: new FormControl('', [Validators.required, Validators.email]),
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      newPassword: new FormControl('', [Validators.required,]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
    this.changePasswordForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.changePasswordForm, this.formErrors, true)
    });
  }

  ngOnInit() {
    this.commonServiceCall.pageName = "Change Password";
    this.buildForm();
    this.getLeftMenuId();
    this.changePasswordForm.patchValue({
      emailId: this.commonServiceCall.emailId ? this.commonServiceCall.emailId : localStorage.getItem('emailId')
    });
    this.commonMethod.hideLoader();
  }

  onKeyUp(event) {
    this.passValue = event.target.value;
    var result = document.querySelector('#bar'),
    pass = event.target.value,
    strong = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g"),
    medium = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g"),
    normal = new RegExp("(?=.{6,}).*", "g"),
    meter;
    if (pass.length) {
      if (strong.test(pass)) {
        meter = "strong";
      } else if (medium.test(pass)) {
        meter = "medium";
      } else if (normal.test(pass)) {
        meter = "normal";
      } else {
        meter = "bad";
      }
    } else {
      meter = "";
    }
    result.className = meter;
    return true;
  }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstants.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        id = res.result[0].id;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

  getPriviledgeData(id) {
    var url = this.appConstants.getPriviledgeDataUrl + id + "/" + this.commonDataShareService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if (!this.priviledgeDataArr.viewChecked) {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }


  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.changePasswordService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }


  submit() {
    this.formValidation.markFormGroupTouched(this.changePasswordForm);
    if (this.changePasswordForm.valid) {
      console.log(this.changePasswordForm.value);
      var formdata = this.changePasswordForm.value
      if (formdata.oldPassword != formdata.newPassword) {
        if (formdata.newPassword == formdata.confirmPassword) {
          if (formdata.emailId === this.commonServiceCall.emailId) {
            console.log('change password form success...');
            var param = this.changePasswordService.changePasswordCall(this.changePasswordForm.value);
            this.apiChangePassword(param)
          }
          else {
            showToastMessage('Invalid Email Id');
          }
        }
        else {
          showToastMessage('New Password And Confirm Password Should Match');
        }
      }
      else {
        showToastMessage('Old Password And New Password Should Not Match');
      }
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.changePasswordForm, this.formErrors, false)
    }
  }

  apiChangePassword(params) {
    console.log('request params: ', params);
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.changePasswordUrl, params).subscribe((data) => {
      var res = data.resp;
      console.log('response params: ', res);
      if (res.responseCode == "200") {
        console.log('response params: ', res);
        showToastMessage(res.responseMessage);
        // this.router.navigateByUrl('/login');
        this.logout();
      } else {
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.changePasswordUrl + "\n" + "Params=" + JSON.stringify(params), 'update')
        this.errorCallBack(this.appConstants.changePasswordUrl, res);
      }
    });
  }

  logout() {
    var params = {
      "userid": this.commonDataShareService.user_ID
    }
    this.commonServiceCall.postResponsePromise(this.appConstants.logoutUrl, params).subscribe((resp) => {
      console.log(resp);
      if (resp.status) {
        this.commonMethod.hideLoader();
        localStorage.clear();
        this.commonServiceCall.userCredential = {};
        sessionStorage.setItem("userCredential", "");
        this.router.navigateByUrl("/login");
      } else {
      }
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancel() {
    this.changePasswordForm.reset();
    this.router.navigateByUrl('/dashboard');
  }

}
