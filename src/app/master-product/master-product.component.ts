import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { MasterProductService } from './master-product.service';
import { Location } from '@angular/common';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-master-product',
  templateUrl: './master-product.component.html',
  styleUrls: ['./master-product.component.css']
})
export class MasterProductComponent implements OnInit {

  id= 1351;
  menuLink = "masterProduct";
  masterProductForm: FormGroup;
  remarkForm:FormGroup
  showForm:boolean = false;
  isAddButtonClicked = false;
  priviledgeDataArr: any = [];
  productMasterArr = [];
  productTypeList = [];
  masterStatus = [];
  appList=[];
  formErrors = {
    productName:'',
    description:'',
    productType: '',
    status:'',
    appId:'',
    remark:''
  }

  productMasterFileds={
    productName: '',
    description: '',
    productType: '',
    status: '',
    appId: ''
  }

  roleId: any;
  selModel: any;
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private masterProductService: MasterProductService,
    private location: Location
  ) { }

  public buildForm() {
    this.masterProductForm = this.form.group({
      productName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]+$/)]),
      description: new FormControl('', [Validators.required]),
      productType: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      appId: new FormControl('', [Validators.required]),
    });
    this.masterProductForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.masterProductForm, this.formErrors, true)
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

  ngOnInit() {
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.commonServiceCall.pageName = "Product Master";
    this.roleId = this.commonData.roleId;
    this.buildForm();
    this.getProductType();
    this.getStatus();
    this.getAppMasterList();
    this.getLeftMenuId();
    this.masterProductForm.patchValue({
      status: 3
    });
  }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstants.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        id = res.result[0].id;
        this.commonData.submenuId = res.result[0].id;
        this.commonData.submenuname = res.result[0].menuLink;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

     /* Insert tracking for user activities*/
    addAuditTrailAdaptor(URL,operation)
    {
        var param = this.masterProductService.addAuditTrailAdaptorParams(URL,operation);
        console.log(param)
        this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
        })
    }

  getPriviledgeData(id) {
    var url = this.appConstants.getPriviledgeDataUrl + id+"/"+this.commonData.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if(this.priviledgeDataArr.viewChecked) {
          this.getAllMasterProductDetails();
        }
        else {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

  getAppMasterList(){
    this.commonServiceCall.getResponsePromise(this.appConstants.masterListUrl).subscribe((data) => {
      var res = data;
      console.log('response data: ', res);
      if (res.status) {
        console.log('response data: ', res);
        this.appList = res.resp;
      } else {
        this.errorCallBack(this.appConstants.masterListUrl, res);
      }
    });
  }

  cancel() {
    this.commonServiceCall.pageName = "Product Master";
    this.showForm = !this.showForm;
    this.masterProductForm.reset();
    this.isAddButtonClicked = false;
    this.getAllMasterProductDetails();
  }


  getStatus() {
    this.commonServiceCall.getResponsePromise(this.appConstants.masterStatusUrl).subscribe(data => {
      if (data.status) {
        console.log('Data resp: ', data.resp);
        this.masterStatus = [];
        data.resp.forEach(el => {
          if(el.id== 3 || el.id == 0){
            this.masterStatus.push(el);
          }
        });
      } else {
        this.commonMethod.errorMessage(data);
      }
    });
  }

  getProductType() {
    this.commonServiceCall.getResponsePromise(this.appConstants.getProductType).subscribe((data) => {
      console.log(data);
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.productTypeList = res.result;
      } else {
        this.errorCallBack(this.appConstants.getProductType, res);
      }
    });
  }


  getAllMasterProductDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getProducts).subscribe((data) => {
      $('#dt-sample').DataTable().clear().destroy();
      console.log(data);
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
           this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.getProducts+"\n"+"Params={}",'view')
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.productMasterArr = res.result;
      } else {
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable" : "No Data found"
            }})});
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getProducts, res);
      }
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }


  showHideForm() {
    this.commonServiceCall.pageName = "Add Product Master";
    this.showForm = !this.showForm
    this.isAddButtonClicked = true;
    setTimeout(()=>{
      // $('#sl_prdt').val('');
      $("#sl_appId").val('');
      $("#sl_prdType").val('');
    });
    this.masterProductForm.patchValue({
      status: 3
    });
  }

  addMasterProduct() {
    this.formValidation.markFormGroupTouched(this.masterProductForm);
    if (this.masterProductForm.valid) {
      var formData = this.masterProductForm.value;
      var param = this.masterProductService.addMasterProductCall(this.masterProductForm.value);
      console.log('request parameters: ', param);
      this.saveMasterProductDetails(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.masterProductForm, this.formErrors, false)
    }
  }

  saveMasterProductDetails(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.saveProductDetails, param).subscribe(data => {
      var res = data.resp;
      if(res.responseCode == "200"){
           this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.saveProductDetails+"\n"+"Params="+JSON.stringify(param),'add')
        showToastMessage(res.responseMessage);
        this.cancel();
      }
      else{
        if(this.commonData.roleType == this.commonData.makerRole) {
          this.masterProductForm.patchValue({
            productName: this.productMasterFileds.productName,
            description: this.productMasterFileds.description,
            productType: this.productMasterFileds.productType,
            status: this.productMasterFileds.status,
            appId: this.productMasterFileds.appId,
          });
        }
        showToastMessage(res.responseMessage);
      }
      this.commonMethod.hideLoader();
    });
  }

  gotoMasterProductDetails(item) {
    console.log(item);
    if(item.statusName === 'ADMIN APPROVER PENDING' && this.commonData.roleType == this.commonData.makerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.router.navigateByUrl("/masterProductEdit",{ state: { id: item.id} });
      this.commonData.submenuname = "masterProductEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
    }
  }

  cancelClick(){
    this.router.navigateByUrl('/dashboard');
  }

  filterStatus()
  {
    return this.masterStatus.filter(x => x.shortName == 'ACTIVE' ||  x.shortName == 'INACTIVE');
  }

  filterProduct()
  {
    return this.appList.filter(x => x.shortName == "WALLET" ||  x.shortName == "MOBILE"  || x.shortName == "DESKTOP"  || x.shortName == "TAB");
  }

  openActionModel(action, formdata) {
    if (this.masterProductForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.productMasterFileds.productName = formdata.productName;
      this.productMasterFileds.description = formdata.description;
      this.productMasterFileds.productType = formdata.productType;
      this.productMasterFileds.status = formdata.status;
      this.productMasterFileds.appId = formdata.appId;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.masterProductForm, this.formErrors, false)
    }
  }

  addmasterProductWithRemark(formdata){
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.masterProductService.addMasterProductCallWithRemark(this.productMasterFileds, formData);
      this.saveMasterProductDetails(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  closeActionMoel() {
    this.masterProductForm.patchValue({
      productName: this.productMasterFileds.productName,
      description: this.productMasterFileds.description,
      productType: this.productMasterFileds.productType,
      status: this.productMasterFileds.status,
      appId: this.productMasterFileds.appId,
    });
    closeTinyModel();
  }

}
