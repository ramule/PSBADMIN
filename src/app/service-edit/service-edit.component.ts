import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppConstants } from '../app-constants';
import { ServiceEditService } from './service-edit.service';
import { CommonMethods } from '../common-methods';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.css']
})
export class ServiceEditComponent implements OnInit {
  beforeParam:any=[]
  status:any=[];
  remarkHistoryArr: any = [];
  createdOn;
  serviceEditForm : FormGroup;
  remarkForm:FormGroup
  formErrors = {
    channelId:'',
    customerId:'',
    customerName:'',
    satusId:'',
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
    public  serviceEdit : ServiceEditService,
    public commonMethod : CommonMethods,
    public commonDataService: CommonDataShareService,
  ) { }

  public buildForm() {
    this.serviceEditForm = this.form.group({
      channelId:new FormControl(''),
      customerId:new FormControl(''),
      customerName:new FormControl(''),
      satusId:new FormControl(''),
      shortName:new FormControl(''),
      categoryName:new FormControl(''),
      description:new FormControl(''),
      mobile:new FormControl(''),
      rrn:new FormControl(''),
      createdOn:new FormControl(''),
      emailId:new FormControl(''),
      status:new FormControl(''),
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
      this.router.navigateByUrl('/services');
      return;
    }

    this.roleId = this.commonDataService.roleId;
    this.commonServiceCall.pageName = "Edit Services";
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

    /* Insert tracking for user activities*/
      addAuditTrailAdaptor(URL,operation)
      {
          var param = this.serviceEdit.addAuditTrailAdaptorParams(URL,operation);
          console.log(param)
          this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
          })
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

    if(this.commonServiceCall.makerRequestEditUrl == '/services') {
      this.router.navigateByUrl("/services");
    }
    else if (this.commonServiceCall.makerRequestEditUrl == '/makerRequests'){
      this.router.navigateByUrl("/makerRequests");
    }
    else {
      this.router.navigateByUrl("/services");
    }
  }

  update(){
    this.formValidation.markFormGroupTouched(this.serviceEditForm);
    if (this.serviceEditForm.valid) {
      var formData = this.serviceEditForm.value;
      var param = this.serviceEdit.getUpdateParam(this.commonDataService.services.id,formData, this.beforeParam.appid, this.beforeParam.createdby);
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
         this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.updateTicketId+"\n"+"Params="+JSON.stringify(param)+"\n"+"Before Update Params="+JSON.stringify(this.beforeParam),'update')
        console.log(res);
        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
        this.cancel()
      }
      else {
        if(this.commonDataService.roleType == this.commonDataService.makerRole) {
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
      var param = this.serviceEdit.getUpdateParamWithRemark(this.commonDataService.services.id,this.serviceFields, formdata, this.beforeParam.appid, this.beforeParam.createdby);
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
