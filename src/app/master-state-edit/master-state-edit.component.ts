import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AppConstants } from "../app-constants";
import { CommonDataShareService } from "../common-data-share.service";
import { CommonMethods } from "../common-methods";
import { Location } from "@angular/common";
import { FormValidationsService } from "../form-validations.service";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { MasterStateEditService } from "./master-state-edit.service";
import { browserRefresh } from "../app.component";
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: "app-master-state-edit",
  templateUrl: "./master-state-edit.component.html",
  styleUrls: ["./master-state-edit.component.css"],
})
export class MasterStateEditComponent implements OnInit {
  masterStateEditForm: FormGroup;
  remarkForm: FormGroup;
  country: any = [];
  status:any = [];
  masterStateData: any = [];
  remarkHistoryArr: any = [];
  selModel: any;
  stateData: any;

  formErrors = {
    countryName:'',
    statusId:'',
    stateName:'',
    remark: ''
  }

  masterStateAddFields = {
    countryName:'',
    statusId:'',
    stateName:''
  }
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public router: Router,
    public masterStateEditService : MasterStateEditService,
    public appConstants : AppConstants,
    public commonMethod : CommonMethods,
    private location: Location
  ) {}

  ngOnInit(): void {

    this.commonDataShareService.browserRefresh = false;
    this.commonDataShareService.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonDataShareService.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/masterState');
      return;
    }

    this.commonServiceCall.pageName = "Edit State Master";
    this.stateData = this.location.getState();
    this.buildForm();
    this.getStatus();
    this.getCountryName();
    this.getRemarkHistoryData(this.stateData.id);
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.masterStateEditService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  public buildForm() {
    this.masterStateEditForm = this.form.group({
      countryName: new FormControl("", [Validators.required]),
      stateName: new FormControl("", [Validators.required]),
      statusId: new FormControl("", [Validators.required]),
    });

    this.masterStateEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.masterStateEditForm,
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

  getRemarkHistoryData(id) {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall
      .getResponsePromise(
        this.appConstants.getRemarkHistoryDataUrl +
          id +
          "/" +
          this.commonDataShareService.submenuId
      )
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          console.log(res);
          this.remarkHistoryArr = res.result;
          //initiallize datatable
          this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
          this.commonMethod.hideLoader();
        } else if (res.responseCode == "202"){
          setTimeout(function () {
            $('table.display').DataTable({
              "language": {
                "emptyTable" : "No Data found"
              }})});
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.getRemarkHistoryDataUrl, res);
        }
      });
  }

  getStatus() {
    this.commonServiceCall
      .getResponsePromise(this.appConstants.masterStatusUrl)
      .subscribe((data) => {
        if (data.status) {
          console.log("Data resp: ", data.resp);
          this.status = data.resp;
        } else {
          this.commonMethod.errorMessage(data);
        }
      });
  }

  filterStatus() {
    return this.status.filter(
      (x) => x.shortName == "ACTIVE" || x.shortName == "INACTIVE"
    );
  }

  getCountryName() {
    this.country = [];
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.getCountryNamesUrl)
      .subscribe((data) => {
        var res = data.resp;
        console.log(res);
        if (res.responseCode == "200") {
          this.commonMethod.hideLoader();
          console.log("response data: ", res);
          // this.country = res.result;

          res.result.forEach(element => {
            if(element.statusId == 3) {
              this.country.push(element);
            }
          });
          console.log("Country data: ", this.country);
          this.getStateMasterById(this.stateData.id);
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.getCountryNamesUrl, res);
        }
      });
  }

  getStateMasterById(id){
    var params = {
      "id": id
    }
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getStateDetailsByIdUrl, params).subscribe(data => {

      var res = data.resp;
      if (res.responseCode == "200") {
        this.masterStateData = res.result[0];

        console.log(res);
        if(res.result[0].userAction !=null) {
          this.masterStateEditForm.patchValue({
            countryName: res.result[0].countryId,
            stateName: res.result[0].shortName,
            statusId: res.result[0].userAction,
          })
        }else{
          this.masterStateEditForm.patchValue({
            countryName: res.result[0].countryId,
            stateName: res.result[0].shortName,
            statusId: res.result[0].statusId,
          })
        }
        this.commonMethod.hideLoader();
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getStateDetailsByIdUrl, res);
      }

    })
  }

  openActionModel(action, formdata) {
    if (this.masterStateEditForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.masterStateAddFields.countryName = formdata.countryName;
      this.masterStateAddFields.statusId = formdata.statusId;
      this.masterStateAddFields.stateName = formdata.stateName;
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.masterStateEditForm,
        this.formErrors,
        false
      );
    }
  }

  closeActionModel() {
    this.masterStateEditForm.patchValue({
      messageCodeName: this.masterStateAddFields.countryName,
      statusId: this.masterStateAddFields.statusId,
      stateName: this.masterStateAddFields.stateName,
    });
    closeTinyModel();
  }

  updateStateMasterWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();

      var param = this.masterStateEditService.editStateWithRemarkCall(
        this.masterStateAddFields,
        this.masterStateData,
        this.remarkForm.value
      );
      this.updateState(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formErrors,
        false
      );
    }
  }

  updateStateMaster() {
    this.formValidation.markFormGroupTouched(this.masterStateEditForm);
    if (this.masterStateEditForm.valid) {
      var param = this.masterStateEditService.editStateCall(
        this.masterStateEditForm.value,
        this.masterStateData,
      );
      this.updateState(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.masterStateEditForm,
        this.formErrors,
        false
      );
    }
  }

  updateState(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.updateStateDetailsUrl, param)
      .subscribe((data) => {
        var res = data.resp;
        console.log("add invProduct response: ", res);
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.updateConfigMasterUrl + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.masterStateData), 'update')
          console.log(res);
          showToastMessage(res.responseMessage);
          this.cancel();
        } else {
          if (
            this.commonDataShareService.roleType ==
            this.commonDataShareService.makerRole
          ) {
            this.masterStateEditForm.patchValue({
              countryName: this.masterStateAddFields.countryName,
              statusId: this.masterStateAddFields.statusId,
              stateName: this.masterStateAddFields.stateName,
            });
          }
          this.errorCallBack(this.appConstants.updateStateDetailsUrl, res);
        }
        this.commonMethod.hideLoader();
      });
  }

  cancel() {
    if (this.commonServiceCall.makerRequestEditUrl == "/masterState") {
      this.router.navigateByUrl("/masterState");
    } else if (this.commonServiceCall.makerRequestEditUrl == "/makerRequests") {
      this.router.navigateByUrl("/makerRequests");
    } else {
      this.router.navigateByUrl("/masterState");
    }
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }
}
