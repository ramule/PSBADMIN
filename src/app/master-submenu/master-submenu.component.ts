import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { MasterSubMenuService } from './master-submenu.service';
import { browserRefresh } from '../app.component';
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-master-submenu',
  templateUrl: './master-submenu.component.html',
  styleUrls: ['./master-submenu.component.css']
})
export class MasterSubMenuComponent implements OnInit {

  masterSubMenuForm: FormGroup;
  showForm:boolean = false;
  isAddButtonClicked = false;
  subMenuMasterArray = []
  formErrors = {
    subMenuName:'',
    status:'',
    logoPath: '',
    menudesc:'',
    menuLink:''
  }
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private masterSubMenuService: MasterSubMenuService
  ) { }

  public buildForm() {
    this.masterSubMenuForm = this.form.group({
      subMenuName: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      menudesc: new FormControl('', [Validators.required]),
      logoPath: new FormControl('', [Validators.required,//Validators.pattern(/([a-zA-Z0-9\s_\\.\-\(\):])+(.jpe?g|.png)$/i)
    ]),
      menuLink: new FormControl('', [Validators.required]),
    });
    this.masterSubMenuForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.masterSubMenuForm, this.formErrors, true)
    });
  }

  ngOnInit() {

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/masterMenu');
      return;
    }

    this.commonServiceCall.pageName = "Submenu Master";
    this.buildForm();
    this.getAllSubMasterMenuDetails();
    this.masterSubMenuForm.patchValue({
      status: 3
    });
  }

  cancel() {
    this.commonServiceCall.pageName = "Submenu Master";
    this.showForm = !this.showForm;
    this.masterSubMenuForm.reset();
    this.isAddButtonClicked = false;
    this.getAllSubMasterMenuDetails();
  }

  getAllSubMasterMenuDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getSubMenuBymenuId +"/"+ this.commonData.masterMenuId).subscribe((data) => {
      $('#dt-sample').DataTable().clear().destroy();
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
           this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.getSubMenuBymenuId+"\n"+"Params={}",'view')
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.subMenuMasterArray = res.result;
      } else {
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable" : "No Data found"
            }
          });
        })
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getSubMenuBymenuId, res);
      }
    });

  }
     /* Insert tracking for user activities*/
    addAuditTrailAdaptor(URL,operation)
    {
        var param = this.masterSubMenuService.addAuditTrailAdaptorParams(URL,operation);
        console.log(param)
        this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
        })
    }

  addSubMasterMenu() {
    this.formValidation.markFormGroupTouched(this.masterSubMenuForm);
    if (this.masterSubMenuForm.valid) {
      var param = this.masterSubMenuService.addSubMasterMenuCall(this.masterSubMenuForm.value,this.commonData.masterMenuId);
      console.log('request parameters: ', param);
      this.saveMasterMenuDetails(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.masterSubMenuForm, this.formErrors, false)
    }
  }

  saveMasterMenuDetails(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.addSubMenu, param).subscribe(data => {
      var res = data.resp;
      if(res.responseCode == "200"){
           this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.addSubMenu+"\n"+"Params="+JSON.stringify(param),'add')
        this.getAllSubMasterMenuDetails();
        this.cancel();
        showToastMessage(res.responseMessage);
      }
      else{
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.addMasterMenuUrl, res);
      }
    });
  }

  cancelClick(){
    this.router.navigateByUrl('/masterMenu');
  }

  showHideForm() {
    this.commonServiceCall.pageName = "Add Submenu Master";
    this.showForm = !this.showForm
    this.isAddButtonClicked = true;
    setTimeout(()=>{
      // $('#masterSubMenuStatus').val('');
    });
    this.masterSubMenuForm.patchValue({
      status: 3
    });
  }

  gotoMasterSubMenuDetails(item) {
    this.router.navigateByUrl("/masterSubMenuEdit",{ state: { id: item.id} });
  }

  errorCallBack(fld, res) {
      this.commonMethod.errorMessage(res);
  }
}
