import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { CalculatorFormulaAddService } from './calculator-formula-add.service';

declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-calculator-formula-add',
  templateUrl: './calculator-formula-add.component.html',
  styleUrls: ['./calculator-formula-add.component.css']
})
export class CalculatorFormulaAddComponent implements OnInit {

  calculatorAddFormula: FormGroup;
  remarkForm: FormGroup;
  selectedCalcName: any = "";
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
  }
  roleId: any;
  selModel: any;
  masterStatus: any = [];
  productTypes: any = [];
  calculatorName: any = [];

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private calcFormulaAddService: CalculatorFormulaAddService
  ) { }


  public buildForm() {
    this.calculatorAddFormula = this.form.group({
      calculatorType: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      calculatorFormula: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      rateCharges: new FormControl('', [Validators.required, Validators.maxLength(5), Validators.pattern(/^(\d*\.)?\d+$/)]),
      statusId: new FormControl('', [Validators.required]),
      productType: new FormControl('', [Validators.required])
    });
    this.calculatorAddFormula.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.calculatorAddFormula, this.formErrors, true)
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

  ngOnInit() {

    // this.commonDataShareService.browserRefresh = false;
    // this.commonDataShareService.browserRefresh = browserRefresh;
    // console.log('refreshed?:', browserRefresh);

    // if(this.commonDataShareService.browserRefresh) {
    //   this.buildForm();
    //   this.router.navigateByUrl('/login');
    //   return;
    // }

    this.commonServiceCall.pageName = "Add Calculator Formula";
    this.roleId = this.commonDataShareService.roleId;
    this.buildForm();
    console.log(this.roleId);
    console.log(this.commonDataShareService.roleId);
    this.calculatorType();
    this.getProductType();
    this.getStatus();
    this.calculatorAddFormula.patchValue({
      statusId: 3
    });
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.calcFormulaAddService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  openActionModel(action, formdata) {
    if (this.calculatorAddFormula.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      console.log(formdata.calculatorType);
      this.calcFormulaFields.calcName = formdata.calculatorType;
      this.calcFormulaFields.calcFormula = formdata.calculatorFormula;
      this.calcFormulaFields.ratecharge = formdata.rateCharges;
      this.calcFormulaFields.statusid = formdata.statusId;
      this.calcFormulaFields.channel = formdata.productType;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.calculatorAddFormula, this.formErrors, false)
    }
  }

  addCalculatorFormulaWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.calcFormulaAddService.getCalcFormulaAddParamWithRemark(this.calcFormulaFields, formData, this.selectedCalcName);
      this.saveCalculatorFormula(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  closeActionMoel() {
    this.calculatorAddFormula.patchValue({
      calculatorType: this.calcFormulaFields.calcName,
      calculatorFormula: this.calcFormulaFields.calcFormula,
      rateCharges: this.calcFormulaFields.ratecharge,
      productType: this.calcFormulaFields.channel,
      statusId: this.calcFormulaFields.statusid
    });
    closeTinyModel();
  }

  addCalculatorFormula() {
    this.formValidation.markFormGroupTouched(this.calculatorAddFormula);
    if (this.calculatorAddFormula.valid) {
      var formData = this.calculatorAddFormula.value;
      var param = this.calcFormulaAddService.getCalcFormulaAddParam(formData, this.selectedCalcName);
      this.saveCalculatorFormula(param)
    } else {
      this.formErrors = this.formValidation.validateForm(this.calculatorAddFormula, this.formErrors, false)
    }
  }

  cancel() {
    this.router.navigateByUrl("/calculatorFormula");
  }

  saveCalculatorFormula(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.saveCalculatorFormula, param).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res.result);
        showToastMessage(res.responseMessage);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.saveCalculatorFormula + "\n" + "Params=" + JSON.stringify(param), 'add')
        this.router.navigateByUrl("/calculatorFormula");
        this.commonMethod.hideLoader();
      } else {
        if (this.commonDataShareService.roleType == this.commonDataShareService.makerRole) {
          this.calculatorAddFormula.patchValue({
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

  onCalcNameSelect(event) {
    console.log(event.target.value);
    this.calculatorName.forEach(element => {
      if (element.id == event.target.value) {
        this.selectedCalcName = element.calculatorName;
      }
    });
  }

  calculatorType() {
    this.commonServiceCall.getResponsePromise(this.appConstants.calculatorType).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res.result);
        res.result.forEach(element => {
          if (element.statusName == 'ACTIVE') {
            this.calculatorName.push(element);
          }
        });
        console.log('Active calculators array: ', this.calculatorName);
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



}
