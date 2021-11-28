import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { browserRefresh } from '../app.component';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { Location } from '@angular/common';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { ImpsMasterEditService } from './imps-master-edit.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-imps-master-edit',
  templateUrl: './imps-master-edit.component.html',
  styleUrls: ['./imps-master-edit.component.css']
})
export class ImpsMasterEditComponent implements OnInit {

  impsMasterFormEdit: FormGroup;
  isImpsChecked: boolean = false;
  isNeftChecked: boolean = false;
  isRtgsChecked: boolean = false;
  isUpiChecked: boolean = false;

  impsMasterData: any;
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
  beforeParams: any;
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
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private impsMasterEditService: ImpsMasterEditService
  ) { }


  public buildForm() {
    this.impsMasterFormEdit = this.form.group({
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
    this.impsMasterFormEdit.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.impsMasterFormEdit, this.formErrors, true)
    });
  }

  ngOnInit() {

    this.commonDataShareService.browserRefresh = false;
    this.commonDataShareService.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonDataShareService.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/impsMaster');
      return;
    }

    // this.impsMasterData = this.location.getState();
    // console.log(this.impsMasterData);
    // this.getImpsMasterDetailsById(this.impsMasterData.id);
    this.commonServiceCall.pageName = "IMPS Master Edit";
    this.buildForm();
    this.activatedRoute.data.subscribe(data => {
      this.commonMethod.hideLoader();
      console.log(data);
      this.getImpsMasterDetailsById(data);
    })
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsMasterEditService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  getImpsMasterDetailsById(data) {

    var res = data.impsData.resp;
    if (res.responseCode == "200") {
      console.log(res);
      this.beforeParams = res.result[0];

      if(this.beforeParams.imps == 'Y') {
        this.isImpsChecked = true;
      }
      else {
        this.isImpsChecked = false;
      }

      if(this.beforeParams.neft == 'Y') {
        this.isNeftChecked = true;
      }
      else {
        this.isNeftChecked = false;
      }

      if(this.beforeParams.rtgs == 'Y') {
        this.isRtgsChecked = true;
      }
      else {
        this.isRtgsChecked = false;
      }

      if(this.beforeParams.upi == 'Y') {
        this.isUpiChecked = true;
      }
      else {
        this.isUpiChecked = false;
      }

      this.impsMasterFormEdit.patchValue({
        bankName: res.result[0].bank,
        ifscCode: res.result[0].ifsc,
        branchName: res.result[0].branch,
        center: res.result[0].center,
        district: res.result[0].district,
        city: res.result[0].city,
        state: res.result[0].state,
        address: res.result[0].address,
        contact: res.result[0].contact,
        micr: res.result[0].micr,
      })
    } else {
      showToastMessage(res.responseMessage);
    }
  }

  editImpsMaster() {
    this.formValidation.markFormGroupTouched(this.impsMasterFormEdit);
    if (this.impsMasterFormEdit.valid) {
      var formData = this.impsMasterFormEdit.value;
      var param = this.impsMasterEditService.getImpsMasterEditParam(formData, this.isImpsChecked, this.isNeftChecked, this.isRtgsChecked, this.isUpiChecked, this.beforeParams);
      this.update(param)
    } else {
      this.formErrors = this.formValidation.validateForm(this.impsMasterFormEdit, this.formErrors, false)
    }
  }

  cancel() {
    this.router.navigateByUrl("/impsMaster");
  }

  update(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateImpsMasterDetailsUrl, param).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res.result);
        showToastMessage(res.responseMessage);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.updateImpsMasterDetailsUrl + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.beforeParams), 'add')
        this.cancel();
      } else {
        this.errorCallBack(this.appConstants.updateImpsMasterDetailsUrl, res);
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
