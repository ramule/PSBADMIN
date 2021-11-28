import { Location, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { ImpsPermissionsEditService } from './imps-permissions-edit.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-imps-permissions-edit',
  templateUrl: './imps-permissions-edit.component.html',
  styleUrls: ['./imps-permissions-edit.component.css']
})
export class ImpsPermissionsEditComponent implements OnInit {

  impsPermissionsEditForm: FormGroup;
  impsPermissionsData: any;
  impsPermissionsDataArr: any = [];
  formErrors = {
    name: '',
    value: ''
  }

  userId: any;
  remarkHistoryArr :any=[];


  roleId: any;
  selModel: any;
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private location: Location,
    public appConstant : AppConstants,
    private commonMethod : CommonMethods,
    public datePipe: DatePipe,
    private impsPermissionsEditService: ImpsPermissionsEditService
  ) { }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsPermissionsEditService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstant.insertAudit, param)
      .subscribe((data) => {});
  }

  public buildForm() {
    this.impsPermissionsEditForm = this.form.group({
      name: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required]),
    });
    this.impsPermissionsEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.impsPermissionsEditForm, this.formErrors, true)
    });
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Edit Permissions";
    this.impsPermissionsData = this.location.getState();
    this.buildForm();
    this.getImpsPermissionsByName(this.impsPermissionsData.name);
  }

  getImpsPermissionsByName(name) {

    var params = {
      "name": name
    }
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstant.getPermissionByNameUrl, params).subscribe(data => {

      var res = data.resp;
      if (res.responseCode == "200") {
        this.impsPermissionsDataArr = res.result[0];

        console.log(res);
        this.impsPermissionsEditForm.patchValue({
          name: res.result[0].name,
          value: res.result[0].value,
        });
      }
      else {
        this.errorCallBack(this.appConstant.getPermissionByNameUrl, res);
      }
      this.commonMethod.hideLoader();
    })
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  update(){
    this.formValidation.markFormGroupTouched(this.impsPermissionsEditForm);
    if (this.impsPermissionsEditForm.valid) {
      var formData = this.impsPermissionsEditForm.value;
      var param = this.impsPermissionsEditService.updateImpsPermissionsCall(formData) ;
      this.updateSystemConfig(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.impsPermissionsEditForm, this.formErrors, false)
    }
  }

  updateSystemConfig(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
    .postResponsePromise(this.appConstant.updatePermissionUrl, param)
    .subscribe((data) => {
      var res = data.resp;
      console.log("update imps permissions response: ", res);
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:" + this.appConstant.apiURL.serviceURL_ESB + this.appConstant.updatePermissionUrl + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.impsPermissionsDataArr), 'update')
        console.log(res);
        showToastMessage(res.responseMessage);
        this.cancel();
      } else {
        this.errorCallBack(this.appConstant.updatePermissionUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  cancel() {
    this.router.navigateByUrl('/impsPermissions')
  }

}
