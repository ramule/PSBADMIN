import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { FormValidationsService } from "../form-validations.service";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { CommonDataShareService } from "../common-data-share.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { AppConstants } from "../app-constants";
import { CommonMethods } from "../common-methods";
import { browserRefresh } from "../app.component";
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: "app-customer-device-master-edit",
  templateUrl: "./customer-device-master-edit.component.html",
  styleUrls: ["./customer-device-master-edit.component.css"],
})
export class CustomerDeviceMasterEditComponent implements OnInit {
  userDtl: any;
  beforeParam: any = [];
  custDeviceMasterForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    custName: "",
    imei: "",
    mobile: "",
    model: "",
    osversion: "",
    status: "",
    remark: "",
  };

  masterDeviceFields = {
    custName: "",
    imei: "",
    mobile: "",
    model: "",
    osversion: "",
    status: "",
  };

  masterStatus = [];

  selectedRole: any;

  roleId: any;
  selModel: any;

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private location: Location,
    public appConstant: AppConstants,
    private commonMethod: CommonMethods,
    public commonDataService: CommonDataShareService
  ) { }

  public buildForm() {
    this.custDeviceMasterForm = this.form.group({
      custName: new FormControl(""),
      imei: new FormControl(""),
      mobile: new FormControl(""),
      model: new FormControl(""),
      osversion: new FormControl(""),
      status: new FormControl("", [Validators.required]),
    });
    this.custDeviceMasterForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.custDeviceMasterForm,
        this.formErrors,
        true
      );
    });
    if (this.selModel == "remarkField") {
      this.remarkForm = this.form.group({
        remark: new FormControl("", [Validators.required]),
      });
      this.remarkForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(
          this.remarkForm,
          this.formErrors,
          true
        );
      });
    }
  }

  ngOnInit(): void {

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/customerDeviceMaster');
      return;
    }

    this.commonServiceCall.pageName = "Edit Device Master";
    this.roleId = this.commonData.roleId;
    this.buildForm();
    this.getStatus();
  } /* Insert tracking for user activities*/

  addAuditTrailAdaptor(URL, operation) {
    var param = {
      ChannelName: "DESKTOP",
      channelRequest: URL,
      eventName: "Device Master",
      category: "Master",
      action: operation,
      properties: URL,
      IP: this.commonDataService.user_IP,
      "X-FORWARDEDIP": this.commonDataService.user_IP,
      Lat: this.commonDataService.user_lat,
      Lon: this.commonDataService.user_lon,
      Browser: this.commonMethod.getBrowserName(),
      Device: "",
      OS: this.commonMethod.getOSName(),
      CHANNELID: "4",
      CREATEDBY: this.commonDataService.user_ID,
      CREATEDBYNAME: this.commonDataService.user_Name,
      UPDATEDBY: this.commonDataService.user_ID,
      UPDATEDBYNAME: this.commonDataService.user_Name,
      authorization: "0",
    };
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstant.insertAudit, param)
      .subscribe((data) => { });
  }

  getStatus() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstant.masterStatusUrl)
      .subscribe((data) => {
        if (data.status) {
          this.commonMethod.hideLoader();
          console.log("Data resp: ", data.resp);
          this.masterStatus = data.resp;

          this.userDtl = this.location.getState();
          this.getDeviceDetails(this.userDtl.id);
          this.getRemarkHistoryData(this.userDtl.id);
        } else {
          this.commonMethod.hideLoader();
          this.commonMethod.errorMessage(data);
        }
      });
  }

  update() {
    this.formValidation.markFormGroupTouched(this.custDeviceMasterForm);
    if (this.custDeviceMasterForm.valid) {
      var formData = this.custDeviceMasterForm.value;
      var param = {
        id: this.userDtl.id,
        statusId: formData.status,
        role_ID: this.commonDataService.roleTypeId,
        user_ID: this.commonDataService.user_ID,
        subMenu_ID: this.commonDataService.submenuId,
        activityName: this.commonDataService.submenuname,
        customerName: this.custDeviceMasterForm.get('custName').value,
        imei: this.custDeviceMasterForm.get('imei').value,
        mobileNumber: this.custDeviceMasterForm.get('mobile').value,
        deviceModel: this.custDeviceMasterForm.get('model').value,
        osVersion: this.custDeviceMasterForm.get('osversion').value,
        remark: "",
      };

      this.updateDeviceMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.custDeviceMasterForm,
        this.formErrors,
        false
      );
    }
  }

  updateDeviceMaster(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstant.updateDeviceDetails, param)
      .subscribe((data) => {
        var res = data.resp;
        console.log("Resp************" + JSON.stringify(res));
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
            this.appConstant.apiURL.serviceURL_ESB +
            this.appConstant.updateDeviceDetails +
            "\n" +
            "Params=" +
            JSON.stringify(param) +
            "\n" +
            "Before Update Params=" +
            JSON.stringify(this.beforeParam),
            "update"
          );
          showToastMessage(res.responseMessage);
          this.cancel();
        } else {
          if (this.commonDataService.roleType == this.commonDataService.makerRole) {
            this.custDeviceMasterForm.patchValue({
              custName: this.masterDeviceFields.custName,
              imei: this.masterDeviceFields.imei,
              mobile: this.masterDeviceFields.mobile,
              model: this.masterDeviceFields.model,
              osversion: this.masterDeviceFields.osversion,
              status: this.masterDeviceFields.status,
            });
          }
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstant.updateProductDetails, res);
        }
      });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancel() {
    if (this.commonServiceCall.makerRequestEditUrl == "/customerDeviceMaster") {
      this.router.navigateByUrl("/customerDeviceMaster");
    } else if (this.commonServiceCall.makerRequestEditUrl == "/makerRequests") {
      this.router.navigateByUrl("/makerRequests");
    } else {
      this.router.navigateByUrl("/customerDeviceMaster");
    }
  }

  getDeviceDetails(id) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstant.getDeviceMasterDetailsById + id)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          this.commonMethod.hideLoader();

          var result = res.result[0];
          this.beforeParam = res.result[0];
          console.log(this.selectedRole);
          if (
            res.result[0].userAction != null
          ) {
            this.custDeviceMasterForm.patchValue({
              custName: result.customerName,
              imei: result.imei,
              mobile: result.mobileNumber,
              model: result.deviceModel,
              osversion: result.osVersion,
              status: result.userAction,
            });
          } else {
            this.custDeviceMasterForm.patchValue({
              custName: result.customerName,
              imei: result.imei,
              mobile: result.mobileNumber,
              model: result.deviceModel,
              osversion: result.osVersion,
              status: result.statusId,
            });
          }
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstant.getDeviceMasterDetailsById, res);
        }
      });
  }

  filterStatus() {
    return this.masterStatus.filter(
      (x) => x.shortName == "BLOCKED" || x.shortName == "ACTIVE"
    );
  }

  openActionModel(action, formdata) {
    if (this.custDeviceMasterForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.masterDeviceFields.custName = formdata.custName;
      this.masterDeviceFields.imei = formdata.imei;
      this.masterDeviceFields.mobile = formdata.mobile;
      this.masterDeviceFields.model = formdata.model;
      this.masterDeviceFields.osversion = formdata.osversion;
      this.masterDeviceFields.status = formdata.status;
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.custDeviceMasterForm,
        this.formErrors,
        false
      );
    }
  }

  updateDeviceMasterWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = {
        id: this.userDtl.id,
        statusId: this.masterDeviceFields.status,
        role_ID: this.commonDataService.roleTypeId,
        user_ID: this.commonDataService.user_ID,
        subMenu_ID: this.commonDataService.submenuId,
        activityName: this.commonDataService.submenuname,
        customerName: this.masterDeviceFields.custName,
        imei: this.masterDeviceFields.imei,
        mobileNumber: this.masterDeviceFields.mobile,
        deviceModel: this.masterDeviceFields.model,
        osVersion: this.masterDeviceFields.osversion,
        remark: formdata.remark,
      };
      this.updateDeviceMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formErrors,
        false
      );
    }
  }

  closeActionMoel() {
    this.custDeviceMasterForm.patchValue({
      custName: this.masterDeviceFields.custName,
      imei: this.masterDeviceFields.imei,
      mobile: this.masterDeviceFields.mobile,
      model: this.masterDeviceFields.model,
      osversion: this.masterDeviceFields.osversion,
      status: this.masterDeviceFields.status,
    });
    closeTinyModel();
  }

  remarkHistoryArr: any = [];

  getRemarkHistoryData(id) {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall
      .getResponsePromise(
        this.appConstant.getRemarkHistoryDataUrl +
        id +
        "/" +
        this.commonData.submenuId
      )
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          console.log(res);
          this.remarkHistoryArr = res.result;
          if (this.remarkHistoryArr.length < 1) {

          }
          //initiallize datatable
          this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
          this.commonMethod.hideLoader();
        } else if (res.responseCode == "202") {
          setTimeout(function () {
            $('table.display').DataTable({
              "language": {
                "emptyTable": "No Data found"
              }
            })
          });
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstant.getRemarkHistoryDataUrl, res);
        }
      });
  }
}
