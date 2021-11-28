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
import { CommonMethods } from "../common-methods";
import { AppConstants } from "../app-constants";
import { Location } from "@angular/common";
import { MasterCalculatorEditService } from "./master-calculator-edit.service";
import { browserRefresh } from "../app.component";
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: "app-master-calculator-edit",
  templateUrl: "./master-calculator-edit.component.html",
  styleUrls: ["./master-calculator-edit.component.css"],
})
export class MasterCalculatorEditComponent implements OnInit {
  calcMasterEditForm: FormGroup;
  remarkForm: FormGroup;
  roleId: any;
  selModel: any;
  calcMasters = [];
  remarkHistoryArr: any = [];
  formErrors = {
    calcName: "",
    calcDesc: "",
    seqNumber: "",
    status: "",
    productType: "",
    remark: "",
  };
  calcMasterFields = {
    calculatorName: "",
    calculatorDesc: "",
    sequenceNo: "",
    statusid: "",
    producttype: "",
  };
  masterStatus = [];
  productTypes = [];
  selectedCalc;
  masterCalc;
  beforeParams: any;
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private location: Location,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private masterCalcEditService: MasterCalculatorEditService
  ) {}

  public buildForm() {
    this.calcMasterEditForm = this.form.group({
      calcName: new FormControl("", [
        Validators.required,
        Validators.maxLength(40),
        Validators.pattern(/^[a-zA-Z0-9 ]+$/),
      ]),
      calcDesc: new FormControl("", [
        Validators.required,
        Validators.maxLength(100),
      ]),
      seqNumber: new FormControl("", [
        Validators.required,
        Validators.maxLength(5),
      ]),
      status: new FormControl("", [Validators.required]),
      productType: new FormControl("", [Validators.required]),
    });
    this.calcMasterEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.calcMasterEditForm,
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

  ngOnInit() {

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/masterCalculator');
      return;
    }

    this.commonServiceCall.pageName = "Edit Calculator Master";
    this.roleId = this.commonData.roleId;
    this.masterCalc = this.location.getState();
    this.buildForm();
    this.getStatus();
    this.getAppMasterList();
    console.log(this.masterCalc);
    this.getCalcById(this.masterCalc.id);
    this.getRemarkHistoryData(this.masterCalc.id);
  } /* Insert tracking for user activities*/

  addAuditTrailAdaptor(URL, operation) {
    var param = this.masterCalcEditService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  filterStatus() {
    return this.masterStatus.filter(
      (x) => x.shortName == "ACTIVE" || x.shortName == "INACTIVE"
    );
  }

  filterProduct() {
    return this.productTypes.filter(
      (x) =>
        x.shortName == "WALLET" ||
        x.shortName == "MOBILE" ||
        x.shortName == "DESKTOP"
    );
  }

  //on load functions
  getStatus() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.masterStatusUrl)
      .subscribe((data) => {
        var res = data;
        if (res.status) {
          this.commonMethod.hideLoader();
          console.log("response data: ", res);
          this.masterStatus = res.resp;
          console.log("response array: ", this.masterStatus);
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.masterStatusUrl, res);
        }
      });
  }

  //on load functions
  getAppMasterList() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.masterListUrl)
      .subscribe((data) => {
        var res = data;
        console.log("response data: ", res);
        if (res.status) {
          this.commonMethod.hideLoader();
          console.log("response data: ", res);
          this.productTypes = res.resp;
          console.log("response array: ", this.productTypes);
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.masterListUrl, res);
        }
      });
  }

  openActionModel(action, formdata) {
    if (this.calcMasterEditForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      console.log(formdata.calculatorType);
      this.calcMasterFields.calculatorName = formdata.calcName;
      this.calcMasterFields.calculatorDesc = formdata.calcDesc;
      this.calcMasterFields.sequenceNo = formdata.seqNumber;
      this.calcMasterFields.statusid = formdata.status;
      this.calcMasterFields.producttype = formdata.productType;
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.calcMasterEditForm,
        this.formErrors,
        false
      );
    }
  }

  getCalcById(id) {
    console.log("editable id: ", id);
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getCalculatorMasterByIdUrl + id;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe((data) => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        this.selectedCalc = res.result[0];
        this.beforeParams = res.result[0];
        if (res.result[0].userAction != null) {
          this.calcMasterEditForm.patchValue({
            calcName: res.result[0].calculatorName,
            calcDesc: res.result[0].calculatorDescription,
            seqNumber: res.result[0].seqNumber,
            status: res.result[0].userAction,
            productType: res.result[0].appId,
          });
        } else {
          this.calcMasterEditForm.patchValue({
            calcName: res.result[0].calculatorName,
            calcDesc: res.result[0].calculatorDescription,
            seqNumber: res.result[0].seqNumber,
            status: res.result[0].statusId,
            productType: res.result[0].appId,
          });
        }
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCalculatorMasterByIdUrl, res);
      }
    });
  }

  update() {
    this.formValidation.markFormGroupTouched(this.calcMasterEditForm);
    if (this.calcMasterEditForm.valid) {
      var formData = this.calcMasterEditForm.value;
      var param = this.masterCalcEditService.updateCaluMasterCall(formData, this.selectedCalc);
      this.updateCalcMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.calcMasterEditForm,
        this.formErrors,
        false
      );
    }
  }

  updateCalculatorMasterWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.masterCalcEditService.updateCaluMasterWithRemarkCall(
        this.calcMasterFields,
        this.selectedCalc,
        formData
      );
      this.updateCalcMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formErrors,
        false
      );
    }
  }

  updateCalcMaster(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(
        this.appConstants.updateCalculatorMasterDetailsUrl,
        param
      )
      .subscribe((data) => {
        var res = data.resp;
        console.log(res);
        if (res.responseCode == "200") {
          showToastMessage(res.responseMessage);
          this.addAuditTrailAdaptor(
            "Request:" +
              this.appConstants.apiURL.serviceURL_ESB +
              this.appConstants.updateCalculatorMasterDetailsUrl +
              "\n" +
              "Params=" +
              JSON.stringify(param) +
              "\n" +
              "Before Update Params=" +
              JSON.stringify(this.beforeParams),
            "update"
          );
          if (
            this.commonServiceCall.makerRequestEditUrl == "/masterCalculator"
          ) {
            this.router.navigateByUrl("/masterCalculator");
          } else if (
            this.commonServiceCall.makerRequestEditUrl == "/makerRequests"
          ) {
            this.router.navigateByUrl("/makerRequests");
          } else {
            this.router.navigateByUrl("/masterCalculator");
          }
        } else {
          if (this.commonData.roleType == this.commonData.makerRole) {
            this.calcMasterEditForm.patchValue({
              calcName: this.calcMasterFields.calculatorName,
              calcDesc: this.calcMasterFields.calculatorDesc,
              seqNumber: this.calcMasterFields.sequenceNo,
              productType: this.calcMasterFields.producttype,
              status: this.calcMasterFields.statusid,
            });
          }
          showToastMessage(res.responseMessage);
        }
        this.commonMethod.hideLoader();
        this.errorCallBack(
          this.appConstants.updateCalculatorMasterDetailsUrl,
          res
        );
      });
  }

  errorCallBack(fld, res) {
    if (fld == this.appConstants.masterStatusUrl) {
      this.commonMethod.errorMessage(res);
    } else if (fld == this.appConstants.masterListUrl) {
      this.commonMethod.errorMessage(res);
    } else if (fld == this.appConstants.getCalculatorMasterByIdUrl) {
      this.commonMethod.errorMessage(res);
    } else if (fld == this.appConstants.updateCalculatorMasterDetailsUrl) {
      this.commonMethod.errorMessage(res);
    }
  }

  cancel() {
    if (this.commonServiceCall.makerRequestEditUrl == "/masterCalculator") {
      this.router.navigateByUrl("/masterCalculator");
    } else if (this.commonServiceCall.makerRequestEditUrl == "/makerRequests") {
      this.router.navigateByUrl("/makerRequests");
    } else {
      this.router.navigateByUrl("/masterCalculator");
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
          this.commonData.submenuId
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

  closeActionMoel() {
    this.calcMasterEditForm.patchValue({
      calcName: this.calcMasterFields.calculatorName,
      calcDesc: this.calcMasterFields.calculatorDesc,
      seqNumber: this.calcMasterFields.sequenceNo,
      productType: this.calcMasterFields.producttype,
      status: this.calcMasterFields.statusid,
    });
    closeTinyModel();
  }
}
