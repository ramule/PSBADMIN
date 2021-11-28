import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { RmMasterService } from 'src/app/rm-master/rm-master.service';
import { Location } from '@angular/common';
declare var showToastMessage: any;
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var $: any;
@Component({
  selector: 'app-rm-master',
  templateUrl: './rm-master.component.html',
  styleUrls: ['./rm-master.component.css']
})
export class RmMasterComponent implements OnInit {

  id = 43;
  menuLink = "rmMaster";
  rmMasterForm: FormGroup;
  remarkDeleteForm: FormGroup;
  remarkForm:FormGroup;
  showForm:boolean = false;
  isAddButtonClicked = false;
  selModel: any;
  selectedRMToDelete: any;
  rmMaster = [];
  masterStatus = [];
  productTypes = [];
  priviledgeDataArr: any = [];
  formErrors = {
    rmName:'',
    status:'',
    productType:'',
    rmId: '',
    remark:'',
    remarkDelete: ''
  }
  RMMasterFields={
    rmName: '',
    status: '',
    rmId: '',
    productType: '',
  }
  roleId: any;
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private rmmasterService:RmMasterService,
    public location:Location
  ) { }

  public buildForm() {
    this.rmMasterForm = this.form.group({
      rmName: new FormControl('', [Validators.required,Validators.maxLength(40)]),
      status: new FormControl('', [Validators.required]),
      rmId: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]),
      productType: new FormControl('', [Validators.required]),
    });
    this.rmMasterForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.rmMasterForm, this.formErrors, true)
    });

    if(this.selModel == 'remarkField') {
      this.remarkForm = this.form.group({
        remark: new FormControl('', [Validators.required])
      });
      this.remarkForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, true)
      });
    }

    if(this.selModel == 'deleteRMWithRemark') {
      this.remarkDeleteForm = this.form.group({
        remarkDelete: new FormControl('', [Validators.required])
      });
      this.remarkDeleteForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(this.remarkDeleteForm, this.formErrors, true)
      });
    }
  }

  ngOnInit() {
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.commonServiceCall.pageName = "RM Master";
    this.roleId = this.commonData.roleId;
    var url = this.appConstants.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.buildForm();
    this.getStatus();
    this.getAppMasterList();
    this.getLeftMenuId();
    this.rmMasterForm.patchValue({
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

  getPriviledgeData(id) {
    var url = this.appConstants.getPriviledgeDataUrl + id+"/"+this.commonData.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if(this.priviledgeDataArr.viewChecked) {
          this.getAllRMMasterDetails();
        }
        else {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

     /* Insert tracking for user activities*/
      addAuditTrailAdaptor(URL,operation)
      {
          var param = this.rmmasterService.addAuditTrailAdaptorParams(URL,operation);
          console.log(param)
          this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
          })
      }

  filterStatus()
  {
    return this.masterStatus.filter(x => x.shortName == 'ACTIVE' ||  x.shortName == 'INACTIVE');
  }

  filterProduct()
  {
    return this.productTypes.filter(x => x.shortName == "WALLET" ||  x.shortName == "MOBILE"  || x.shortName == "DESKTOP"  || x.shortName == "TAB"  || x.shortName == "IVR"  || x.shortName == "ALEXA"  || x.shortName == "WHATSAPP");
  }

  closeActionModel(){
    closeTinyModel();
  }

  showHideForm(){
    this.commonServiceCall.pageName = "Add RM Master";
    this.showForm = !this.showForm
    this.isAddButtonClicked = true;
    setTimeout(()=>{
      // $('#sl_Status').val('');
      $("#sl_Product").val('');
    });
    this.rmMasterForm.patchValue({
      status: 3
    });
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

      //on load functions
  getAllRMMasterDetails(){
    this.rmMaster = [];
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getRmMasterUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
          this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.getRmMasterUrl+"\n"+"Params={}",'view')
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        res.result.forEach(element => {
          if(element.statusId !== 23) {
            this.rmMaster.push(element);
          }
        });
        // this.rmMaster = res.result;
        console.log('ConfigMasters array: ', this.rmMaster);
      } else {
        $('table.display').DataTable({
          "language": {
            "emptyTable": "No Data found"
          }
        });
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.configMasterurl, res);
      }
      this.destroyDataTable();
    });
  }

  gotoRMMasterDetails(item) {
    console.log(item);
    if(item.statusname === 'ADMIN APPROVER PENDING' && this.commonData.roleType == this.commonData.makerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.router.navigateByUrl("/rmMasterEdit",{ state: { id: item.id} });
      this.commonData.submenuname = "rmMasterEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
    }
  }

  destroyDataTable() {
    console.log('destroy datatable called...');
    $('#dt-sample').DataTable().clear().destroy();
  }

  addMaster() {
    this.formValidation.markFormGroupTouched(this.rmMasterForm);
    if (this.rmMasterForm.valid) {
      var formData = this.rmMasterForm.value;
      var param = this.rmmasterService.addRMMaster(this.rmMasterForm.value);
      console.log('request parameters: ', formData);
     this.saveRMMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.rmMasterForm, this.formErrors, false)
    }
  }

 //called on adding of Notification
 saveRMMaster(param) {

    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.saveRMMasterData, param).subscribe(data => {
      var res = data.resp;
    // this.commonServiceCall.postResponsePromise(this.appConstants.saveNotificationUrl, param).subscribe(data => {
    console.log(data);
      if(data.status){
           this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.saveRMMasterData+"\n"+"Params="+JSON.stringify(param),'add')
            this.getStatus()
            this.getAppMasterList();
            this.getAllRMMasterDetails()
            this.cancel();
            showToastMessage(res.responseMessage);
      }
      else{
        this.rmMasterForm.patchValue({
          rmName: this.RMMasterFields.rmName,
          status: this.RMMasterFields.status,
          rmId: this.RMMasterFields.rmId,
          productType: this.RMMasterFields.productType,
        });
            showToastMessage(res.responseMessage);
      }
        });
  }
  openModelToDeleteRM(item) {
    this.selectedRMToDelete = item;
    this.selModel = 'deleteMaster';
    openTinyModel();
  }


  openModelToDeleteRMWithRemark(action, item) {
    openTinyModel();
    this.selModel = action;
    this.buildForm();
    console.log(action);
    this.selectedRMToDelete = item;
    this.commonData.RMMaster.createdon = item.createdon;
  }

  deleteRM() {
    closeTinyModel();
    console.log('deletable item: ', this.selectedRMToDelete.id);
    var formData = this.selectedRMToDelete;
    var param = this.rmmasterService.deleteRMMasterCall(formData);
    this.deleteRMMaster(param);
  }

  deleteRMWithRemark(remarkData) {
    console.log('deleting item: ', this.selectedRMToDelete);
    this.formValidation.markFormGroupTouched(this.remarkDeleteForm);
    if (this.remarkDeleteForm.valid) {
      closeTinyModel();
      var formData = this.selectedRMToDelete;
      var param = this.rmmasterService.deleteRMMasterWithRemarkCall(formData, remarkData);
      this.deleteRMMaster(param);
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.remarkDeleteForm, this.formErrors, false);
    }
  }

  deleteRMMaster(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.deletetRMMasterUrl, param).subscribe(data => {
      var res = data.resp;
      if(res.responseCode == "200"){
        showToastMessage(res.responseMessage);
        this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.deletetRMMasterUrl + this.selectedRMToDelete.id+"\n"+"Params={}",'delete')
        this.getAllRMMasterDetails();
      }
      else{
        this.errorCallBack(this.appConstants.deletetRMMasterUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  cancel() {
    this.commonServiceCall.pageName = "RM Master";
    this.showForm = !this.showForm;
    this.rmMasterForm.reset();
    this.isAddButtonClicked = false;
    this.getAllRMMasterDetails();
  }

  cancelClick(){
    this.commonMethod.cancel();
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  openActionModel(action, formdata) {
    if (this.rmMasterForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.RMMasterFields.rmName = formdata.rmName;
      this.RMMasterFields.status = formdata.status;
      this.RMMasterFields.rmId = formdata.rmId;
      this.RMMasterFields.productType = formdata.productType;

    }
    else {
      this.formErrors = this.formValidation.validateForm(this.rmMasterForm, this.formErrors, false)
    }
  }

  addCalculatorFormulaWithRemark(formdata){
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.rmmasterService.addRMMasterWithRemark(this.RMMasterFields, formData);
      this.saveRMMaster(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  closeActionMoel() {
    this.rmMasterForm.patchValue({
      rmName: this.RMMasterFields.rmName,
      status: this.RMMasterFields.status,
      rmId: this.RMMasterFields.rmId,
      productType: this.RMMasterFields.productType,
    });
    closeTinyModel();
  }

}
