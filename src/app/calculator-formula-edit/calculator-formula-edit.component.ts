import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
import { CalculatorFormulaEditService } from './calculator-formula-edit.service';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-calculator-formula-edit',
  templateUrl: './calculator-formula-edit.component.html',
  styleUrls: ['./calculator-formula-edit.component.css']
})
export class CalculatorFormulaEditComponent implements OnInit {

  calculatorUpdateFormula: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    calculatorType: '',
    calculatorFormula: '',
    rateCharges: '',
    statusId: '',
    productType: '',
    remark: ''
  };
  calcFormulaFields = {
    calcName: '',
    calcFormula: '',
    ratecharge: '',
    statusid: '',
    channel: ''
  };
  roleId: any;
  selModel: any;

  remarkHistoryArr: any = [];
  masterStatus: any = [];
  productTypes: any = [];
  calculatorName: any = [];
  selUserDtl: any
  formulaId: any;
  beforeParams: any;

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private calcFormulaEditService: CalculatorFormulaEditService,
    private location: Location,
  ) {}


  public buildForm() {
    this.calculatorUpdateFormula = this.form.group({
      calculatorType: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      calculatorFormula: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      rateCharges: new FormControl('', [Validators.required, Validators.maxLength(5), Validators.pattern(/^\d+(?:\.\d{0,4})?$/)]),
      statusId: new FormControl('', [Validators.required]),
      productType: new FormControl('', [Validators.required])
    });
    this.calculatorUpdateFormula.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.calculatorUpdateFormula, this.formErrors, true)
    });

    if (this.selModel == 'remarkField') {
      this.remarkForm = this.form.group({
        remark: new FormControl('', [Validators.required])
      });
      this.remarkForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, true)
      });
    }
  }

  ngOnInit(): void {

    this.commonDataShareService.browserRefresh = false;
    this.commonDataShareService.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonDataShareService.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/calculatorFormula');
      return;
    }

    this.commonServiceCall.pageName = "Edit Calculator Formula";
    this.roleId = this.commonDataShareService.roleId;
    console.log('Role ID: ', this.roleId);
    this.buildForm();
    this.formulaId = this.location.getState();
    this.calculatorType();
    this.getProductType();
    this.getStatus();
    console.log(this.formulaId);
    console.log(this.formulaId.id);
    this.getSelFormulaDtl(this.formulaId.id);
    this.getRemarkHistoryData(this.formulaId.id);
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.calcFormulaEditService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }



  getSelFormulaDtl(id) {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getCalculatorFormulaId + "/" + id).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res.result[0]);
        this.selUserDtl = res.result[0];
        this.beforeParams = res.result[0];
        if (res.result[0].userAction != null) {
          this.calculatorUpdateFormula.patchValue({
            calculatorType: res.result[0].calculatorId,
            calculatorFormula: res.result[0].calculatorFormula,
            rateCharges: res.result[0].ratesCharges,
            statusId: res.result[0].userAction,
            productType: res.result[0].appId
          })
        }
        else {
          this.calculatorUpdateFormula.patchValue({
            calculatorType: res.result[0].calculatorId,
            calculatorFormula: res.result[0].calculatorFormula,
            rateCharges: res.result[0].ratesCharges,
            statusId: res.result[0].statusId,
            productType: res.result[0].appId
          })
        }
        this.commonMethod.hideLoader();
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCalculatorFormulaId, res);
      }
    });
  }

  updateCalculatorFormula() {
    this.formValidation.markFormGroupTouched(this.calculatorUpdateFormula);
    if (this.calculatorUpdateFormula.valid) {
      var formData = this.calculatorUpdateFormula.value;
      var param = this.calcFormulaEditService.getCalcFormulaAddParam(formData, this.selUserDtl);
      this.updateCalcFormula(param)
    } else {
      this.formErrors = this.formValidation.validateForm(this.calculatorUpdateFormula, this.formErrors, false)
    }
  }

  updateCalculatorFormulaWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.calcFormulaEditService.getCalcFormulaAddParamWithRemark(this.calcFormulaFields, this.selUserDtl, formdata);
      this.updateCalcFormula(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  cancel() {
    if (this.commonServiceCall.makerRequestEditUrl == '/calculatorFormula') {
      this.router.navigateByUrl("/calculatorFormula");
    }
    else if (this.commonServiceCall.makerRequestEditUrl == '/makerRequests') {
      this.router.navigateByUrl("/makerRequests");
    }
    else {
      this.router.navigateByUrl("/calculatorFormula");
    }
  }

  updateCalcFormula(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateCalculatorFormula, param).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res.result);
        showToastMessage(res.responseMessage);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.updateCalculatorFormula + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.beforeParams), 'update')
        if (this.commonServiceCall.makerRequestEditUrl == '/calculatorFormula') {
          this.router.navigateByUrl("/calculatorFormula");
        }
        else if (this.commonServiceCall.makerRequestEditUrl == '/makerRequests') {
          this.router.navigateByUrl("/makerRequests");
        }
        else {
          this.router.navigateByUrl("/calculatorFormula");
        }
        this.commonMethod.hideLoader();
      } else {
        if (this.commonDataShareService.roleType == this.commonDataShareService.makerRole) {
          this.calculatorUpdateFormula.patchValue({
            calculatorType: this.calcFormulaFields.calcName,
            calculatorFormula: this.calcFormulaFields.calcFormula,
            rateCharges: this.calcFormulaFields.ratecharge,
            productType: this.calcFormulaFields.channel,
            statusId: this.calcFormulaFields.statusid
          });
        }
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCalculatorFormula, res);
      }
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  calculatorType() {
    this.commonServiceCall.getResponsePromise(this.appConstants.calculatorType).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res.result);
        this.calculatorName = res.result;
        this.commonMethod.hideLoader();
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCalculatorFormula, res);
      }
    });
  }

  getStatus() {
    this.commonServiceCall.getResponsePromise(this.appConstants.masterStatusUrl).subscribe(data => {
      if (data.status) {
        console.log('Data resp: ', data.resp);
        this.masterStatus = [];
        data.resp.forEach(el => {
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
    this.commonServiceCall.getResponsePromise(this.appConstants.masterListUrl).subscribe(data => {
      if (data.status) {
        console.log("roles", data.resp);
        this.productTypes = data.resp;
      }
      else {
        this.commonMethod.errorMessage(data);
      }

    })
  }

  filterStatus() {
    return this.masterStatus.filter(x => x.shortName == 'ACTIVE' || x.shortName == 'INACTIVE');
  }

  filterProduct() {
    return this.productTypes.filter(x => x.shortName == "WALLET" || x.shortName == "MOBILE" || x.shortName == "DESKTOP");
  }

  openActionModel(action, formdata) {
    if (this.calculatorUpdateFormula.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      console.log(formdata.calculatorType);
      this.calcFormulaFields.calcName = formdata.calculatorType;
      this.calcFormulaFields.calcFormula = formdata.calculatorFormula;
      this.calcFormulaFields.ratecharge = formdata.rateCharges;
      this.calcFormulaFields.statusid = formdata.statusId;
      this.calcFormulaFields.channel = formdata.productType
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.calculatorUpdateFormula, this.formErrors, false)
    }
  }

  getRemarkHistoryData(id) {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall.getResponsePromise(this.appConstants.getRemarkHistoryDataUrl + id + "/" + this.commonDataShareService.submenuId).subscribe((data) => {
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

  closeActionMoel() {
    this.calculatorUpdateFormula.patchValue({
      calculatorType: this.calcFormulaFields.calcName,
      calculatorFormula: this.calcFormulaFields.calcFormula,
      rateCharges: this.calcFormulaFields.ratecharge,
      productType: this.calcFormulaFields.channel,
      statusId: this.calcFormulaFields.statusid
    });
    closeTinyModel();
  }

}
