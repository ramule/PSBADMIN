import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';

import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
import { AdminAdministrationEditUserService } from './admin-administration-edit-user.service';
import { browserRefresh } from '../app.component';
import { AdminAdministrationAddUserService } from '../admin-administration-add-user/admin-administration-add-user.service';

declare var showToastMessage: any;
@Component({
  selector: 'app-admin-administration-edit-user',
  templateUrl: './admin-administration-edit-user.component.html',
  styleUrls: ['./admin-administration-edit-user.component.css']
})
export class AdminAdministrationEditUserComponent implements OnInit {
  @ViewChild('smallImg', {static: false})
  smallImgInputVar: ElementRef;
  beforeParams: any;
  adminEditUser;
  addUserForm: FormGroup;
  formErrors = {
    userId: '',
    fname: '',
    lname: '',
    emailId: '',
    phoneNo: '',
    productType: '',
    smallImage: ''
  }

  roles: any = [];
  selectedUser: any;
  isSmallImgError: boolean = false;
  isValidSmallFileFormat: boolean = false;
  isValidSmallSizeFileFormat: boolean = false;
  smallImage: any;
  smallImageValue: File;
  images = {
    smallImage: "",
    largeImage: "",
  };

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    private adminEditUserService: AdminAdministrationEditUserService,
    public adminAddUser: AdminAdministrationAddUserService,
  ) { }

  public buildForm() {
    this.addUserForm = this.form.group({
      userId: new FormControl('', [Validators.required]),
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      phoneNo: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      emailId: new FormControl('', [Validators.email, Validators.minLength(6), Validators.maxLength(40), Validators.pattern(/^[a-z]+[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,6}$/)]),
      productType: new FormControl('', [Validators.required]),
      smallImage: new FormControl(""),
    });
    this.addUserForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.addUserForm, this.formErrors, true)
    });
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.adminEditUserService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  ngOnInit() {

    console.log('routeurl: ', localStorage.getItem('routeUrl'));
    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.buildForm();
      if (localStorage.getItem('routeUrl') == '/administration') {
        this.router.navigateByUrl("/administration");
      }
      else {
        this.router.navigateByUrl('/dashboard');
      }
      localStorage.setItem('routeUrl', '');
      return;
    }

    this.commonServiceCall.pageName = "Edit User";
    this.adminEditUser = this.location.getState();
    console.log('Editable user details: ', this.adminEditUser);
    this.buildForm();
    this.getRoles();
    this.getUserDtl(this.adminEditUser.id);
  }

  //on load functions
  getRoles() {
    this.commonMethod.showLoader();
    var param = this.adminAddUser.getRoleTypeIdCall();
    console.log('role type id param: ', param);
    this.commonServiceCall.postResponsePromise(this.appConstants.getActiveRoles, param).subscribe(data => {
      var res = data.resp;
      this.commonMethod.hideLoader();
      if (data.status) {
        console.log("roles", data.resp);
        this.roles = res.result;
      }
      else {
        this.errorCallBack(this.appConstants.getActiveRoles, res);
      }
    })
  }

  getUserDtl(param) {
    console.log('editable id: ', param);
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getUserDetailsById + param;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      console.log('response data: ', data);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        this.selectedUser = res.result[0];
        this.beforeParams = res.result[0];

        if(res.result[0].thumbnailstring == null || res.result[0].thumbnailstring == "" || res.result[0].thumbnailstring == undefined) {
          this.smallImage = "";
        }
        else {
          this.smallImage = 'data:image/jpg;base64,' + res.result[0].thumbnailstring;
          this.images.smallImage = 'data:image/jpg;base64,' + res.result[0].thumbnailstring;
        }
        console.log('small image: ', this.smallImage);

        console.log(this.selectedUser);
        this.addUserForm.patchValue({
          smallImage: this.smallImage,
          userId: res.result[0].userid,
          fname: res.result[0].first_NAME,
          lname: res.result[0].last_NAME,
          phoneNo: res.result[0].phonenumber,
          emailId: res.result[0].email,
          productType: res.result[0].role_ID
        })
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getUserDetailsById, res);
      }

    })
  }

  update() {
    this.isSmallImgError = false;
    this.isValidSmallFileFormat = false;
    if (this.addUserForm.get('smallImage').value == "") { this.isSmallImgError = true; }
    this.formValidation.markFormGroupTouched(this.addUserForm);
    if (this.addUserForm.valid) {
      // if (this.isSmallImgError == true) { return; }
      if (this.isValidSmallSizeFileFormat == true) { return; }
      var formData = this.addUserForm.value;
      // const _formData = new FormData();
      // _formData.append('file1', this.addUserForm.get('smallImage').value);
      // _formData.append('file2', this.addUserForm.get('smallImage').value)
      // this.uploadImg(formData)

      var param = this.adminEditUserService.updateUserIdCall(this.addUserForm.value, this.images, this.selectedUser);
        this.updateUserMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.addUserForm, this.formErrors, false)
    }
  }

  cancel() {
    if (this.commonData.roleType == 'Super Admin') {
      if (this.commonData.routeUrl == '/administration') {
        this.router.navigateByUrl("/administration");
      }
      else {
        this.commonMethod.cancel();
      }
    }
    else
      this.commonMethod.cancel();
  }

  updateUserMaster(param) {
    console.log('updatable data: ', param);
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateUserDetailsUrl, param).subscribe(data => {
      console.log(data);
      var res = data.resp;
      if (res.responseCode == "200") {
        // this.commonServiceCall.thumbnailstring = this.smallImage.split(',')[1];
        if(param.thumbnail) {
          this.commonServiceCall.thumbnailstring = param.thumbnail;
          localStorage.setItem('thumbnailstring', param.thumbnail);
        }
        else {
          this.commonServiceCall.thumbnailstring = '';
          localStorage.setItem('thumbnailstring', '');
        }
        showToastMessage(res.responseMessage);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.updateUserDetailsUrl + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.beforeParams), 'update')
        this.cancel();
      }
      else {
        this.errorCallBack(this.appConstants.updateUserDetailsUrl, res);
      }
      this.commonMethod.hideLoader();
    })
  }

  errorCallBack(fld, res) {
    if (fld == this.appConstants.getUserDetailsById) {
      this.commonMethod.errorMessage(res);
    }
    else if (fld == this.appConstants.updateUserDetailsUrl) {
      this.commonMethod.errorMessage(res);
    }
  }

  addImage(event: any, type) {
    console.log("inside");
    console.log(event);

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log(file);
      if (event.target.files[0].type == "image/jpeg" || event.target.files[0].type == "image/png") {
        this.commonMethod.getBase64FromFile(file);
      }
      else {
        if (type == 'small') {
          this.isValidSmallFileFormat = true;
          this.isValidSmallSizeFileFormat = false;
        }
        return;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        var img = new Image();
        var me = this
        img.src = window.URL.createObjectURL(file);
        console.log('img.src', img.src);
        img.onload = function () {
          console.log(img);
          var width = img.naturalWidth, height = img.naturalHeight;
          if (type == 'small') {
            if (width > 128 || height > 80) {
              me.isValidSmallSizeFileFormat = true;
              me.isValidSmallFileFormat = false;
            }
            else {
              me.smallImage = e.target.result;
              me.commonMethod.getBase64FromFile(file).subscribe((base64) => {
                me.images.smallImage = base64;
              });
              me.addUserForm.get('smallImage').setValue(file);
              me.isSmallImgError = false;
              me.isValidSmallSizeFileFormat = false;
              me.isValidSmallFileFormat = false;
            }
          }
        };
      };
      reader.readAsDataURL(file);
    }
  }

  onImgDelete() {
    this.smallImage = "";
    this.images.smallImage = "";
    this.smallImgInputVar.nativeElement.value = "";
  }

  /*
  uploadImg(param) {
    console.log('small image ', this.addUserForm.get('smallImage').value);
    var file1 = this.dataURLtoFile(this.smallImage, "smallImage")
    var file2 = this.dataURLtoFile(this.smallImage, "bigImage")

    const _formData = new FormData();
    _formData.append('file1', file1);
    _formData.append('file2', file2);
    console.log('file1: ', file1);
    console.log('file2: ', file2);

    this.commonServiceCall.postResponsePromiseFileUplaod(this.appConstants.uploadFile, _formData).subscribe(data => {
      console.log(data);
      if (data.status) {
        console.log(this.commonServiceCall.thumbnailstring);
        var param = this.adminEditUserService.updateUserIdCall(this.addUserForm.value, data.resp, this.selectedUser);
        this.updateUserMaster(param);
      }
      else {
        showToastMessage("Error In File Upload");
      }
    })
  }

  dataURLtoFile(dataurl, filename) {

    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
  */
}
