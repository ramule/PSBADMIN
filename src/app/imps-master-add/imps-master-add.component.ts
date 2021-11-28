import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { ImpsMasterAddService } from './imps-master-add.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-imps-master-add',
  templateUrl: './imps-master-add.component.html',
  styleUrls: ['./imps-master-add.component.css']
})
export class ImpsMasterAddComponent implements OnInit {

  impsMasterFormAdd: FormGroup;
  isImpsChecked: boolean = false;
  isNeftChecked: boolean = false;
  isRtgsChecked: boolean = false;
  isUpiChecked: boolean = false;
  formErrors = {
    bankName: '',
    ifscCode: '',
    branchName: '',
    center: '',
    district: '',
    city: '',
    state: '',
    address: '',
    contact: '',
    micr: '',
  };

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
    private impsMasterAddService: ImpsMasterAddService
  ) { }


  public buildForm() {
    this.impsMasterFormAdd = this.form.group({
      bankName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]),
      ifscCode: new FormControl('', [Validators.required, Validators.minLength(12), Validators.pattern(/^[A-Z0-9 ]+$/)]),
      branchName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]),
      center: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]),
      district: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]),
      city: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]),
      state: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]),
      address: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required, Validators.minLength(10)]),
      micr: new FormControl('', [Validators.required, Validators.minLength(9)]),
    });
    this.impsMasterFormAdd.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.impsMasterFormAdd, this.formErrors, true)
    });
  }

  ngOnInit() {

    this.commonServiceCall.pageName = "IMPS Master Add";
    this.buildForm();
    this.impsMasterFormAdd.patchValue({
      statusId: 3
    });
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsMasterAddService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  addImpsMaster() {
    this.formValidation.markFormGroupTouched(this.impsMasterFormAdd);
    if (this.impsMasterFormAdd.valid) {
      var formData = this.impsMasterFormAdd.value;
      var param = this.impsMasterAddService.getImpsMasterAddParam(formData, this.isImpsChecked, this.isNeftChecked, this.isRtgsChecked, this.isUpiChecked);
      this.saveImpsMaster(param)
    } else {
      this.formErrors = this.formValidation.validateForm(this.impsMasterFormAdd, this.formErrors, false)
    }
  }

  cancel() {
    this.router.navigateByUrl("/impsMaster");
  }

  saveImpsMaster(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.insertImpsMasterDetailsUrl, param).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res.result);
        showToastMessage(res.responseMessage);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.insertImpsMasterDetailsUrl + "\n" + "Params=" + JSON.stringify(param), 'add')
        this.cancel();
      } else {
        this.errorCallBack(this.appConstants.insertImpsMasterDetailsUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  onImpsStateChange() {
    this.isImpsChecked = !this.isImpsChecked;
  }

  onNeftStateChange() {
    this.isNeftChecked = !this.isNeftChecked;
  }

  onRtgsStateChange() {
    this.isRtgsChecked = !this.isRtgsChecked;
  }

  onUpiStateChange() {
    this.isUpiChecked = !this.isUpiChecked;
  }

}
