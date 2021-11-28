import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { FormValidationsService } from '../form-validations.service';
import { ImpsPermissionsService } from './imps-permissions.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-imps-permissions',
  templateUrl: './imps-permissions.component.html',
  styleUrls: ['./imps-permissions.component.css']
})
export class ImpsPermissionsComponent implements OnInit {

  impsPermissionForm: FormGroup;
  priveledge: any;
  type: any;
  menuLink = "corpCompanyRequests";
  priviledgeDataArr: any = [];
  impsPermissionMaster:any=[];
  formErrors = {
    searchBy: '',
    name: ''
  }

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    private impsPermissionsService: ImpsPermissionsService
  ) { }


  ngOnInit(): void {
    this.commonServiceCall.pageName = "Permissions";
    this.buildForm();
    this.getLeftMenuId();
  }

  public buildForm() {
    this.impsPermissionForm = this.form.group({
      searchBy: new FormControl('', [Validators.required]),
    });
    this.impsPermissionForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.impsPermissionForm, this.formErrors, true)
    });
  }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstants.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        this.commonDataShareService.submenuId = res.result[0].id;
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
        if (this.priviledgeDataArr.viewChecked) {
          this.priveledge = true
        }
        else {
          this.priveledge = false
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        this.priveledge = false
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsPermissionsService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  getSearchPermissionName(value) {
    console.log(value);
    this.type = value.searchBy;
    this.impsPermissionMaster = [];
    this.impsPermissionForm.removeControl('name');

    if (this.type == 'name') {
      this.impsPermissionForm.addControl('name', new FormControl('', [Validators.required]));
    }
  }

  getImpsPermissionDetails() {
    this.formValidation.markFormGroupTouched(this.impsPermissionForm);

    if (this.impsPermissionForm.valid) {
      var formData = this.impsPermissionForm.value;
      if (this.type == 'name') {
        var inputdata = this.impsPermissionsService.getImpsPermissionByName(formData);

        if (this.priveledge == true)
          this.getImpsPermissions(inputdata);
        else
          showToastMessage('You Dont Have Priviledge To View The Data');
      }
    } else {
      this.formErrors = this.formValidation.validateForm(this.impsPermissionForm, this.formErrors, false)
    }
  }

  getImpsPermissions(params) {
    console.log('params: ', params);
    $('#dt-sample').DataTable().clear().destroy();
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getPermissionByNameUrl, params).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        //initiallize datatable
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getPermissionByNameUrl + "\n" + "Params=" + JSON.stringify(params), 'view')
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.impsPermissionMaster = res.result;
        this.commonMethod.hideLoader();
      } else {

        $('table.display').DataTable({
          "language": {
            "emptyTable": "No Data found"
          }
        });
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getPermissionByNameUrl, res);
      }
    });
  }

  gotoImpsPermissionsEdit(item) {
    this.commonDataShareService.submenuname = 'impsPermissionsEdit';
    this.router.navigateByUrl("/impsPermissionsEdit", { state: { name: item.name } });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancel() {
    this.commonMethod.cancel();
  }
}
