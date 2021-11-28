import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
import { CorporateServiceRequestEditService } from './corporate-service-request-edit.service';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-corporate-service-request-edit',
  templateUrl: './corporate-service-request-edit.component.html',
  styleUrls: ['./corporate-service-request-edit.component.css']
})
export class CorporateServiceRequestEditComponent implements OnInit {

  beforeParam:any=[]
  status:any=[];
  remarkHistoryArr: any = [];
  createdOn;
  serviceEditForm : FormGroup;
  remarkForm:FormGroup
  formErrors = {
    customerId:'',
    customerName:'',
    shortName:'',
    categoryName:'',
    description:'',
    mobile:'',
    rrn:'',
    createdOn:'',
    emailId:'',
    status:'',
    remark:''
  }

  serviceFields={
    customerId: '',
    customerName: '',
    shortName: '',
    categoryName: '',
    description: '',
    mobile: '',
    rrn: '',
    createdOn:'' ,
    emailId: '',
    status: '',
  }

  roleId: any;
  selModel: any;

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    private location: Location,
    private appConstants: AppConstants,
    public  corpServiceEdit : CorporateServiceRequestEditService,
    public commonMethod : CommonMethods,
    public commonDataService: CommonDataShareService,
  ) { }

  public buildForm() {
    this.serviceEditForm = this.form.group({
      customerId:new FormControl('', [Validators.required]),
      customerName:new FormControl('', [Validators.required]),
      shortName:new FormControl('', [Validators.required]),
      categoryName:new FormControl('', [Validators.required]),
      description:new FormControl('', [Validators.required]),
      mobile:new FormControl('', [Validators.required]),
      rrn:new FormControl('', [Validators.required]),
      createdOn:new FormControl('', [Validators.required]),
      emailId:new FormControl('', [Validators.required]),
      status:new FormControl('', [Validators.required])
    });
    this.serviceEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.serviceEditForm, this.formErrors, true)
    });

    if(this.selModel == 'remarkField') {
      this.remarkForm = this.form.group({
        remark: new FormControl('', [Validators.required])
      });
      this.remarkForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, true)
      });
    }
  }

  ngOnInit(): void {

    this.commonDataService.browserRefresh = false;
    this.commonDataService.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonDataService.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/corporateService');
      return;
    }

    this.roleId = this.commonDataService.roleId;
    this.commonServiceCall.pageName = "Corporate Service Request Edit";
    this.buildForm();
    console.log(this.commonDataService.services.id);
    this.getStatus();
    console.log(this.commonDataService.services.id);
    this.loadSelUserDtl(this.commonDataService.services.id);
    this.getRemarkHistoryData(this.commonDataService.services.id);
  }

  getRemarkHistoryData(id) {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall.getResponsePromise(this.appConstants.getRemarkHistoryDataUrl + id + "/"+ this.commonDataService.submenuId ).subscribe((data) => {
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

  // on load functions
  getStatus(){
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.masterStatusUrl).subscribe((data) => {
      var res = data;
      if (res.status) {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.status = res.resp;
        console.log('response array: ', this.status);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.masterStatusUrl, res);
      }
    });
  }

  filterStatus()
  {
    return this.status.filter(x => x.shortName === 'APPROVED' || x.shortName === 'PENDING' || x.shortName === 'REJECTED');
  }

  loadSelUserDtl(id:any){
    this.commonServiceCall.getResponsePromise(this.appConstants.getTicketById +"/"+id ).subscribe(data => {
      console.log(data);
      var res = data.resp;
      if (res.responseCode == "200") {
        this.createdOn = new Date(res.result[0].createdon).toLocaleDateString('zh-Hans-CN');
        console.log(res.result[0]);
        this.beforeParam =  res.result[0]
        if(res.result[0].userAction !=null) {
          this.serviceEditForm.patchValue({
            customerId: res.result[0].customerid,
            customerName: res.result[0].customername,
            shortName: res.result[0].shortname,
            categoryName: res.result[0].categoryname,
            description: res.result[0].description,
            mobile: res.result[0].mobileofcust,
            rrn: res.result[0].resolution,
            createdOn: this.createdOn ,
            emailId: res.result[0].email,
            status: res.result[0].userAction
          })
        }
        else{
          this.serviceEditForm.patchValue({
            customerId: res.result[0].customerid,
            customerName: res.result[0].customername,
            shortName: res.result[0].shortname,
            categoryName: res.result[0].categoryname,
            description: res.result[0].description,
            mobile: res.result[0].mobileofcust,
            rrn: res.result[0].resolution,
            createdOn: this.createdOn ,
            emailId: res.result[0].email,
            status: res.result[0].statusid
          })
        }

      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCustomerDetails, res);
      }
    })
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }


  cancel(){

    if(this.commonServiceCall.makerRequestEditUrl == '/corporateService') {
      this.router.navigateByUrl("/corporateService");
    }
    else if (this.commonServiceCall.makerRequestEditUrl == '/corpMakerRequests'){
      this.router.navigateByUrl("/corpMakerRequests");
    }
    else {
      this.router.navigateByUrl("/corporateService");
    }
  }

  update(){
    this.formValidation.markFormGroupTouched(this.serviceEditForm);
    if (this.serviceEditForm.valid) {
      var formData = this.serviceEditForm.value;
      var param = this.corpServiceEdit.getUpdateParam(this.commonDataService.services.id,formData, this.beforeParam.appid, this.beforeParam.createdby);
      this.updateServiceDetails(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.serviceEditForm, this.formErrors, false)
    }
  }

  updateServiceDetails(param){
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateTicketId, param).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
        this.cancel()
      }
      else {
        if(this.commonDataService.roleType == this.commonDataService.corpMakerRole) {
          this.serviceEditForm.patchValue({
            customerId : this.serviceFields.customerId,
            customerName : this.serviceFields.customerName,
            shortName : this.serviceFields.shortName,
            categoryName : this.serviceFields.categoryName,
            description : this.serviceFields.description,
            mobile : this.serviceFields.mobile,
            rrn : this.serviceFields.rrn,
            createdOn : this.serviceFields.createdOn,
            emailId : this.serviceFields.emailId,
            status : this.serviceFields.status
          });
        }
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.updateTicketId, res);
      }
    })
  }


  openActionModel(action, formdata) {
    console.log(this.serviceEditForm.valid);
    if (this.serviceEditForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.serviceFields.customerId = formdata.customerId;
      this.serviceFields.customerName = formdata.customerName;
      this.serviceFields.shortName = formdata.shortName;
      this.serviceFields.categoryName = formdata.categoryName;
      this.serviceFields.description = formdata.description
      this.serviceFields.mobile = formdata.mobile;
      this.serviceFields.rrn = formdata.rrn;
      this.serviceFields.createdOn = formdata.createdOn;
      this.serviceFields.emailId = formdata.emailId;
      this.serviceFields.status = formdata.status
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.serviceEditForm, this.formErrors, false)
    }
  }

  updateServiceWithRemark(formdata){
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.corpServiceEdit.getUpdateParamWithRemark(this.commonDataService.services.id,this.serviceFields, formdata, this.beforeParam.appid, this.beforeParam.createdby);
      this.updateServiceDetails(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }


  closeActionMoel() {
    this.serviceEditForm.patchValue({
      customerId : this.serviceFields.customerId,
      customerName : this.serviceFields.customerName,
      shortName : this.serviceFields.shortName,
      categoryName : this.serviceFields.categoryName,
      description : this.serviceFields.description,
      mobile : this.serviceFields.mobile,
      rrn : this.serviceFields.rrn,
      createdOn : this.serviceFields.createdOn,
      emailId : this.serviceFields.emailId,
      status : this.serviceFields.status
    });
    closeTinyModel();
  }

  
  
  

}
