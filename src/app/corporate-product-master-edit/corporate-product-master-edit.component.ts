import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { FormValidationsService } from "../form-validations.service";
import { CommonDataShareService } from "../common-data-share.service";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { Router } from "@angular/router";
import { CommonMethods } from "../common-methods";
import { AppConstants } from "../app-constants";
import { CorporateProductMasterEditService } from './corporate-product-master-edit.service';
import { Location } from "@angular/common";
import { browserRefresh } from "../app.component";

declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-corporate-product-master-edit',
  templateUrl: './corporate-product-master-edit.component.html',
  styleUrls: ['./corporate-product-master-edit.component.css']
})
export class CorporateProductMasterEditComponent implements OnInit {
  beforeParam: any = [];
  masterProductEditForm: FormGroup;
  remarkForm: FormGroup;
  showForm: boolean = false;
  isAddButtonClicked = false;
  productMasterArr = [];
  productTypeList = [];
  corpProductData: any = [];
  masterStatus = [];
  appList = [];
  remarkHistoryArr: any = [];
  formErrors = {
    productName: "",
    description: "",
    productType: "",
    status: "",
    remark: "",
  };

  masterProductFields = {
    productName: "",
    description: "",
    productType: "",
    status: "",
  };

  roleId: any;
  selModel: any;

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private masterProductService: CorporateProductMasterEditService,
    private location: Location
  ) { }

  public buildForm() {
    this.masterProductEditForm = this.form.group({
      productName: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9 ]+$/),
      ]),
      description: new FormControl("", [Validators.required]),
      productType: new FormControl("", [Validators.required]),
      status: new FormControl("", [Validators.required]),
      appId: new FormControl("", [Validators.required]),
    });
    this.masterProductEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.masterProductEditForm,
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
      this.router.navigateByUrl('/corporateProductMaster');
      return;
    }

    this.commonServiceCall.pageName = "Edit Corporate Product Master";
    this.roleId = this.commonData.roleId;
    this.buildForm();
    this.getProductType();
    this.getStatus();
    this.getAppMasterList();
    this.getRemarkHistoryData(this.location.getState()["id"]);
  }

  getAppMasterList() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.masterListUrl)
      .subscribe((data) => {
        var res = data;
        console.log("response data: ", res);
        if (res.status) {
          this.commonMethod.hideLoader();
          this.getProductById(this.location.getState()["id"]);
          console.log("response data: ", res);
          this.appList = res.resp;
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.masterListUrl, res);
        }
      });
  } /* Insert tracking for user activities*/

  addAuditTrailAdaptor(URL, operation) {
    var param = this.masterProductService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => { });
  }

  cancel() {
    if (this.commonServiceCall.makerRequestEditUrl == "/corporateProductMaster") {
      this.router.navigateByUrl("/corporateProductMaster");
    } else if (this.commonServiceCall.makerRequestEditUrl == "/corpMakerRequests") {
      this.router.navigateByUrl("/corpMakerRequests");
    } else {
      this.router.navigateByUrl("/corporateProductMaster");
    }
  }

  getStatus() {
    this.commonServiceCall
      .getResponsePromise(this.appConstants.masterStatusUrl)
      .subscribe((data) => {
        if (data.status) {
          console.log("Data resp: ", data.resp);
          this.masterStatus = [];
          data.resp.forEach((el) => {
            if (el.id == 3 || el.id == 0) {
              this.masterStatus.push(el);
            }
          });
        } else {
          this.commonMethod.errorMessage(data);
        }
      });
  }

  getProductType() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.getProductType)
      .subscribe((data) => {
        console.log(data);
        var res = data.resp;
        console.log(res);
        if (res.responseCode == "200") {
          this.productTypeList = res.result;
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.getProductType, res);
        }
      });
  }

  getProductById(id) {
    console.log("editable id: ", id);
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getCorpProductById + id;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe((data) => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.beforeParam = res.result[0];
        this.corpProductData = res.result[0];
        this.commonMethod.hideLoader();
        var result = res.result[0];
        console.log("menu: ", res.result);
        if (res.result[0].userAction != null) {
          this.masterProductEditForm.patchValue({
            productName: result.productName,
            description: result.description,
            productType: result.prodtype,
            status: result.userAction,
            appId: result.appId,
          });
        } else {
          this.masterProductEditForm.patchValue({
            productName: result.productName,
            description: result.description,
            productType: result.prodtype,
            status: result.statusId,
            appId: result.appId,
          });
        }
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCorpProductById, res);
      }
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  updateMasterProduct() {
    this.formValidation.markFormGroupTouched(this.masterProductEditForm);
    if (this.masterProductEditForm.valid) {
      var formData = this.masterProductEditForm.value;
      var param = this.masterProductService.updateMasterProductCall(
        this.masterProductEditForm.value,
        this.location.getState()["id"],
        this.corpProductData
      );
      console.log("request parameters: ", param);
      this.updateMasterProductDetails(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.masterProductEditForm,
        this.formErrors,
        false
      );
    }
  }

  updateMasterProductDetails(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.updateCorpProductDetails, param)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
            this.appConstants.apiURL.serviceURL_ESB +
            this.appConstants.updateCorpProductDetails +
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
          if (this.commonData.roleType == this.commonData.corpMakerRole) {
            this.masterProductEditForm.patchValue({
              productName: this.masterProductFields.productName,
              description: this.masterProductFields.description,
              productType: this.masterProductFields.productType,
              status: this.masterProductFields.status,
            });
          }
          showToastMessage(res.responseMessage);
        }
        this.commonMethod.hideLoader();
      });
  }

  filterStatus() {
    return this.masterStatus.filter(
      (x) => x.shortName == "ACTIVE" || x.shortName == "INACTIVE"
    );
  }

  filterProduct() {
    return this.appList.filter(
      (x) =>
        x.shortName == "WALLET" ||
        x.shortName == "MOBILE" ||
        x.shortName == "DESKTOP" ||
        x.shortName == "TAB"
    );
  }

  openActionModel(action, formdata) {
    if (this.masterProductEditForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.masterProductFields.productName = formdata.productName;
      this.masterProductFields.description = formdata.description;
      this.masterProductFields.productType = formdata.productType;
      this.masterProductFields.status = formdata.status;
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.masterProductEditForm,
        this.formErrors,
        false
      );
    }
  }

  updateCalculatorFormulaWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.masterProductService.updateMasterProductCallWithRemark(
        this.masterProductFields,
        this.location.getState()["id"],
        formdata,
        this.corpProductData
      );
      this.updateMasterProductDetails(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formErrors,
        false
      );
    }
  }

  closeActionMoel() {
    this.masterProductEditForm.patchValue({
      productName: this.masterProductFields.productName,
      description: this.masterProductFields.description,
      productType: this.masterProductFields.productType,
      status: this.masterProductFields.status,
    });
    closeTinyModel();
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
          this.errorCallBack(this.appConstants.getRemarkHistoryDataUrl, res);
        }
      });
  }

}
