import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { MasterStateAddService } from './master-state-add.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-master-state-add',
  templateUrl: './master-state-add.component.html',
  styleUrls: ['./master-state-add.component.css']
})
export class MasterStateAddComponent implements OnInit {

  country: any = [];
  status:any = [];
  selModel: any;
  masterStateAddForm: FormGroup;
  remarkForm: FormGroup;

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
    public masterStateAddService : MasterStateAddService,
    public appConstants : AppConstants,
    public commonMethod : CommonMethods,
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Add State Master";
    this.buildForm();
    this.getStatus();
    this.getCountryName();
    this.masterStateAddForm.patchValue({
      statusId: 3
    });
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL,operation) {
    var param = this.masterStateAddService.addAuditTrailAdaptorParams(URL,operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
   })
  }

  public buildForm() {
    this.masterStateAddForm = this.form.group({
      countryName: new FormControl('', [Validators.required]),
      stateName: new FormControl('', [Validators.required]),
      statusId: new FormControl('', [Validators.required]),
    });

    this.masterStateAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.masterStateAddForm, this.formErrors, true)
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

  getStatus() {
    this.commonServiceCall.getResponsePromise(this.appConstants.masterStatusUrl).subscribe(data => {
      if (data.status) {
        console.log('Data resp: ', data.resp);
        this.status = data.resp;
      } else {
        this.commonMethod.errorMessage(data);
      }
    });
  }

  filterStatus()
  {
    return this.status.filter(x => x.shortName == 'ACTIVE' ||  x.shortName == 'INACTIVE');
  }

  getCountryName() {
    this.country = [];
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getCountryNamesUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        // this.country = res.result;

        res.result.forEach(element => {
          if(element.statusId == 3) {
            this.country.push(element);
          }
        });
        console.log('Country data: ', this.country);
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCountryNamesUrl, res);
      }
    })
  }

  openActionModel(action, formdata) {
    if (this.masterStateAddForm.valid) {

      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.masterStateAddFields.countryName = formdata.countryName;
      this.masterStateAddFields.statusId = formdata.statusId;
      this.masterStateAddFields.stateName = formdata.stateName;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.masterStateAddForm, this.formErrors, false)
    }
  }

  closeActionModel() {
    this.masterStateAddForm.patchValue({
      messageCodeName: this.masterStateAddFields.countryName,
      statusId: this.masterStateAddFields.statusId,
      stateName: this.masterStateAddFields.stateName
    });
    closeTinyModel();
  }

  addStateMasterWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();

      var param = this.masterStateAddService.addStateWithRemarkCall(this.masterStateAddFields, this.remarkForm.value);
      this.addState(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  addStateMaster(){
    this.formValidation.markFormGroupTouched(this.masterStateAddForm);
    if (this.masterStateAddForm.valid) {
      var param = this.masterStateAddService.addStateCall(this.masterStateAddForm.value);
        this.addState(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.masterStateAddForm, this.formErrors, false)
    }
  }

  addState(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.addStateDetailsUrl, param).subscribe(data => {
      var res = data.resp;
      console.log('add invProduct response: ', res);
      if (res.responseCode == "200") {
         this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.addStateDetailsUrl+"\n"+"Params="+JSON.stringify(param),'add')
        console.log(res);
        showToastMessage(res.responseMessage);
        this.cancel();
      } else {
        if (this.commonDataShareService.roleType == this.commonDataShareService.makerRole) {
          this.masterStateAddForm.patchValue({
            countryName: this.masterStateAddFields.countryName,
            statusId: this.masterStateAddFields.statusId,
            stateName: this.masterStateAddFields.stateName
          });
        }
        this.errorCallBack(this.appConstants.addStateDetailsUrl, res);
      }
      this.commonMethod.hideLoader();
    })
  }

  cancel() {
    this.router.navigateByUrl("/masterState");
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

}
