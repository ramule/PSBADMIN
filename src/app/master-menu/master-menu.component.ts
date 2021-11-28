import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { MasterMenuService } from './master-menu.service';
import { Location } from '@angular/common';
import { runInThisContext } from 'vm';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-master-menu',
  templateUrl: './master-menu.component.html',
  styleUrls: ['./master-menu.component.css']
})
export class MasterMenuComponent implements OnInit {

  id= 150;
  menuLink = "masterMenu";
  masterMenuForm: FormGroup;
  remarkForm:FormGroup
  showForm:boolean = false;
  isAddButtonClicked = false;
  menuMasterArray = [];
  priviledgeDataArr: any = [];
  formErrors = {
    menuName:'',
    status:'',
    logoPath: '',
    remark:''
  }

  menuMasterFields = {
    menuName: '',
      status: '',
      logoPath: ''
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
    private masterMenuService: MasterMenuService,
    public location:Location
  ) { }

  public buildForm() {
    this.masterMenuForm = this.form.group({
      menuName: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9 ]+$/)]),
      status: new FormControl('', [Validators.required]),
      logoPath: new FormControl('', [Validators.required,//alidators.pattern(/([a-zA-Z0-9\s_\\.\-\(\):])+(.jpe?g|.png)$/i)
    ])
    });
    this.masterMenuForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.masterMenuForm, this.formErrors, true)
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
    this.commonServiceCall.pageName = "Menu Master";
    this.roleId = this.commonData.roleId;
    this.buildForm();
    this.getLeftMenuId();
    this.masterMenuForm.patchValue({
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
          this.getAllMasterMenuDetails();
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
        var param = this.masterMenuService.addAuditTrailAdaptorParams(URL,operation);
        console.log(param)
        this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
        })
    }

  cancel() {
    this.commonServiceCall.pageName = "Menu Master";
    this.showForm = !this.showForm;
    this.masterMenuForm.reset();
    this.isAddButtonClicked = false;
    this.getAllMasterMenuDetails();
  }

  getAllMasterMenuDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getMasterMenuListUrl).subscribe((data) => {
      $('#dt-sample').DataTable().clear().destroy();
      console.log(data);
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
         this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.getMasterMenuListUrl+"\n"+"Params={}",'view')
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.menuMasterArray = res.result;
      } else {
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable" : "No Data found"
            }})});
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getMasterMenuListUrl, res);
      }
    });
  }

  errorCallBack(fld, res) {
    if (fld == this.appConstants.getMasterMenuListUrl) {
      this.commonMethod.errorMessage(res);
    }
    else if (fld == this.appConstants.addMasterMenuUrl) {
      this.commonMethod.errorMessage(res);
    }
  }


  showHideForm() {
    this.commonServiceCall.pageName = "Add Menu Master"
    this.showForm = !this.showForm
    this.isAddButtonClicked = true;
    setTimeout(()=>{
      // $('#sl_status').val('');
    });
    this.masterMenuForm.patchValue({
      status: 3
    });
  }

  addMasterMenu() {
    this.formValidation.markFormGroupTouched(this.masterMenuForm);
    if (this.masterMenuForm.valid) {
      var formData = this.masterMenuForm.value;
      var param = this.masterMenuService.addMasterMenuCall(this.masterMenuForm.value);
      console.log('request parameters: ', param);
      this.saveMasterMenuDetails(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.masterMenuForm, this.formErrors, false)
    }
  }

  saveMasterMenuDetails(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.addMasterMenuUrl, param).subscribe(data => {
      var res = data.resp;
      if(res.responseCode == "200"){
           this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.addMasterMenuUrl+"\n"+"Params="+JSON.stringify(param),'add')
        this.getAllMasterMenuDetails();
        this.cancel();
        showToastMessage(res.responseMessage);
      }
      else{
        this.masterMenuForm.patchValue({
          menuName: this.menuMasterFields.menuName,
          status: this.menuMasterFields.status,
          logoPath: this.menuMasterFields.logoPath
        });
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.addMasterMenuUrl, res);
      }
    });
  }

  gotoMasterMenuDetails(item) {
    console.log(item);
    if(item.statusname === 'ADMIN APPROVER PENDING' && this.commonData.roleType == this.commonData.makerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.commonData.submenuname = "masterMenuEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
      this.router.navigateByUrl("/masterMenuEdit",{ state: { id: item.id} });
    }
  }

  viewMasterSubMenu(menuMaster){
    this.commonData.masterMenuId = menuMaster.id;
    this.router.navigateByUrl("/masterSubMenu");
  }

  cancelClick(){
    this.router.navigateByUrl('/dashboard');
  }

  openActionModel(action, formdata) {
    if (this.masterMenuForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.menuMasterFields.menuName = formdata.menuName;
      this.menuMasterFields.status = formdata.status;
      this.menuMasterFields.logoPath = formdata.logoPath;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.masterMenuForm, this.formErrors, false)
    }
  }

  addMenuMasterWithRemark(formdata){
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.masterMenuService.addMasterMenuCallWithRemark(this.menuMasterFields, formData);
      this.saveMasterMenuDetails(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  closeActionMoel() {
    this.masterMenuForm.patchValue({
      menuName: this.menuMasterFields.menuName,
      status: this.menuMasterFields.status,
      logoPath: this.menuMasterFields.logoPath
    });
    closeTinyModel();
  }

}
