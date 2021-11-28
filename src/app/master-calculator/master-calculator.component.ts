import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { MasterCalculatorService } from './master-calculator.service';
import { Location } from '@angular/common';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-master-calculator',
  templateUrl: './master-calculator.component.html',
  styleUrls: ['./master-calculator.component.css']
})
export class MasterCalculatorComponent implements OnInit {
  id = "74"
  menuLink="masterCalculator"
  calculatorMasterForm: FormGroup;
  remarkForm: FormGroup;
  showForm:boolean = false;
  isAddButtonClicked = false;
  roleId: any;
  selModel: any;
  calcMasters = [];
  formErrors = {
    calcName:'',
    calcDesc: '',
    seqNumber:'',
    status:'',
    productType:'',
    remark: ''
  };
  calcMasterFields = {
    calculatorName: '',
    calculatorDesc: '',
    sequenceNo: '',
    statusid: '',
    producttype: ''
  }
  masterStatus = [];
  productTypes = [];
  priviledgeDataArr: any = [];
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private masterCalculatorService: MasterCalculatorService,
    private location: Location
  ) { }

  public buildForm() {
    this.calculatorMasterForm = this.form.group({
      calcName: new FormControl('', [Validators.required,Validators.maxLength(40), Validators.pattern(/^[a-zA-Z0-9 ]+$/)]),
      calcDesc: new FormControl('', [Validators.required,Validators.maxLength(100)]),
      seqNumber: new FormControl('', [Validators.required,Validators.maxLength(5)]),
      status: new FormControl('', [Validators.required]),
      productType: new FormControl('', [Validators.required]),
    });
    this.calculatorMasterForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.calculatorMasterForm, this.formErrors, true)
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
    this.commonServiceCall.pageName = "Calculator Master";
    this.roleId = this.commonData.roleId;
    this.buildForm();
    this.getStatus();
    this.getAppMasterList();
   // this.getAllCalculatorDetails();
   this.getLeftMenuId();
    this.calculatorMasterForm.patchValue({
      status : 3
    });
  }

   /* Insert tracking for user activities*/
      addAuditTrailAdaptor(URL,operation)
      {
          var param = this.masterCalculatorService.addAuditTrailAdaptorParams(URL,operation);
          console.log(param)
          this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
          })
      }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstants.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        this.commonData.submenuId = res.result[0].id;
        this.commonData.submenuname = res.result[0].menuLink;
        id = res.result[0].id;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
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
          this.getAllCalculatorDetails();
        }
        else {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

  openActionModel(action, formdata) {
    if (this.calculatorMasterForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      console.log(formdata.calculatorType);
      this.calcMasterFields.calculatorName = formdata.calcName;
      this.calcMasterFields.calculatorDesc = formdata.calcDesc;
      this.calcMasterFields.sequenceNo = formdata.seqNumber;
      this.calcMasterFields.statusid = formdata.status;
      this.calcMasterFields.producttype = formdata.productType;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.calculatorMasterForm, this.formErrors, false)
    }
  }

  showHideForm(){
    this.commonServiceCall.pageName = "Add Calculator Master";
    this.showForm = !this.showForm
    this.isAddButtonClicked = true;
    setTimeout(()=>{
      // $('#sl_Status').val('');
      $("#sl_Product").val('');
    });
    this.calculatorMasterForm.patchValue({
      status : 3
    });
  }

  cancel(){
    this.commonServiceCall.pageName = "Calculator Master";
    this.showForm = !this.showForm;
    this.calculatorMasterForm.reset();
    this.isAddButtonClicked = false;
    this.getAllCalculatorDetails();
  }

  filterStatus()
  {
    return this.masterStatus.filter(x => x.shortName == 'ACTIVE' ||  x.shortName == 'INACTIVE');
  }

  filterProduct()
  {
    return this.productTypes.filter(x => x.shortName == "WALLET" ||  x.shortName == "MOBILE"  || x.shortName == "DESKTOP");
  }

  //on load functions
  getStatus(){
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.masterStatusUrl).subscribe((data) => {
      var res = data;
      if (res.status) {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.masterStatus = res.resp;
        console.log('response array: ', this.masterStatus);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.masterStatusUrl, res);
      }
    });
  }

  //on load functions
  getAppMasterList(){
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.masterListUrl).subscribe((data) => {
      var res = data;
      console.log('response data: ', res);
      if (res.status) {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.productTypes = res.resp;
        console.log('response array: ', this.productTypes);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.masterListUrl, res);
      }
    });
  }

  getAllCalculatorDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getCalculatorMasterDetailsUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.calcMasters = res.result;
        this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.getCalculatorMasterDetailsUrl+"\n"+"Params={}",'view')
        console.log('ConfigMasters array: ', this.calcMasters);
      } else if (res.responseCode == "202"){
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable" : "No Data found"
            }})});
      } else {
        this.errorCallBack(this.appConstants.getCalculatorMasterDetailsUrl, res);
      }
      this.commonMethod.hideLoader();
      this.commonMethod.destroyDataTable();
    });
  }

  addCalculatorMaster() {
    this.formValidation.markFormGroupTouched(this.calculatorMasterForm);
    if (this.calculatorMasterForm.valid) {
      var formData = this.calculatorMasterForm.value;
      var param = this.masterCalculatorService.addCalculatorMasterCall(formData);
      console.log('request parameters: ', param);
      this.saveCalculatorMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.calculatorMasterForm, this.formErrors, false)
    }
  }

  addCalculatorMasterWithRemark(formdata){
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.masterCalculatorService.addCalculatorMasterWithRemarkCall(this.calcMasterFields, formData);
      this.saveCalculatorMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  saveCalculatorMaster(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.addCalculatorMasterDetailsUrl, param).subscribe(data => {
      var res = data.resp;
      if(res.responseCode == "200"){
        this.getStatus()
        this.getAppMasterList();
        this.getAllCalculatorDetails();
        this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.addCalculatorMasterDetailsUrl+"\n"+"Params="+JSON.stringify(param),'add')
        this.cancel();
        showToastMessage(res.responseMessage);
      }
      else{
        if(this.commonData.roleType == 'Maker') {
          this.calculatorMasterForm.patchValue({
            calcName: this.calcMasterFields.calculatorName,
            calcDesc: this.calcMasterFields.calculatorDesc,
            seqNumber: this.calcMasterFields.sequenceNo,
            productType: this.calcMasterFields.producttype,
            status : this.calcMasterFields.statusid
          });
        }
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.addCalculatorMasterDetailsUrl, res);
      }
    });
  }

  errorCallBack(fld, res) {
    if (fld == this.appConstants.masterStatusUrl) {
      this.commonMethod.errorMessage(res);
    }
    else if (fld == this.appConstants.masterListUrl) {
      this.commonMethod.errorMessage(res);
    }
    else if (fld == this.appConstants.getCalculatorMasterDetailsUrl) {
      this.commonMethod.errorMessage(res);
    }
    else if (fld == this.appConstants.addCalculatorMasterDetailsUrl) {
      this.commonMethod.errorMessage(res);
    }
  }

  gotoMasterCalculatorDetails(item) {
    console.log(item);
    if(item.statusName === 'ADMIN APPROVER PENDING' && this.commonData.roleType == this.commonData.makerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.commonData.submenuname = "masterCalculatorEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
      this.commonData.masterCalculator.createdon = item.createdon;
      this.router.navigateByUrl("/masterCalculatorEdit",{ state: { id: item.id} });
    }
  }

  cancelClick(){
    this.commonMethod.cancel();
  }

  closeActionMoel() {
    this.calculatorMasterForm.patchValue({
      calcName: this.calcMasterFields.calculatorName,
      calcDesc: this.calcMasterFields.calculatorDesc,
      seqNumber: this.calcMasterFields.sequenceNo,
      productType: this.calcMasterFields.producttype,
      status : this.calcMasterFields.statusid
    });
    closeTinyModel();
  }

}
