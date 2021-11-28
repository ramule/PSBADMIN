import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { Location } from "@angular/common";
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { InsuranceCompanyEditService } from './insurance-company-edit.service';
import { browserRefresh } from '../app.component';


declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-insurance-company-edit',
  templateUrl: './insurance-company-edit.component.html',
  styleUrls: ['./insurance-company-edit.component.css']
})
export class InsuranceCompanyEditComponent implements OnInit {

  masterCompanyEditForm: FormGroup;
  remarkForm: FormGroup;

  masterCompanyData: any = [];
  remarkHistoryArr: any = [];
  selModel: any;
  categoryData: any;

  formErrors = {
    companyName: "",
    info: "",
    logo:"",
    categoryId:'',
    statusId: "",
    remark: "",
  };

  masterCategoryEditFields = {
    companyName: "",
    info: "",
    logo:"",
    categoryId:'',
    statusId: "",
  };

  images = {
    logo:''
  }
  status:any=[]
  logo:any
  categoryMaster:any=[]
  isCompanyImgError:boolean = false
  isValidCompanyFileFormat:boolean  = false;
  isValidCompanySizeFileFormat:boolean  = false;
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public router: Router,
    public masterCompanyEditService: InsuranceCompanyEditService,
    public appConstants: AppConstants,
    public commonMethod: CommonMethods,
    private location: Location
  ) { }

  ngOnInit(): void {

    this.commonDataShareService.browserRefresh = false;
    this.commonDataShareService.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonDataShareService.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/insuranceCompany');
      return;
    }

    this.commonServiceCall.pageName = "Edit Insurance Company";
    this.categoryData = this.location.getState();
    this.buildForm();
    this.getStatus()
    this.getCategoryMasterDetails()
    this.getCompanyMasterById(this.categoryData.id);
    this.getRemarkHistoryData(this.categoryData.id);
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.masterCompanyEditService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  public buildForm() {
    this.masterCompanyEditForm = this.form.group({
      companyName: new FormControl("", [Validators.required,Validators.pattern(/^(?=.*[a-zA-Z])[()a-zA-Z0-9.-_ ]+$/)]),
      info: new FormControl("", [Validators.required]),
      logo: new FormControl("", [Validators.required]),
      categoryId: new FormControl("", [Validators.required]),
      statusId: new FormControl("", [Validators.required]),
    });

    this.masterCompanyEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.masterCompanyEditForm,
        this.formErrors,
        true
      );
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
    this.commonServiceCall
      .getResponsePromise(this.appConstants.masterStatusUrl)
      .subscribe((data) => {
        if (data.status) {
          console.log("Data resp: ", data.resp);
          this.status = data.resp;
        } else {
          this.commonMethod.errorMessage(data);
        }
      });
  }

  filterStatus() {
    return this.status.filter(
      (x) => x.shortName == "ACTIVE" || x.shortName == "INACTIVE"
    );
  }

  getCategoryMasterDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.getAllCategoriesMaster)
      .subscribe((data) => {
        var res = data.resp;
        console.log("get state master data: ", res);
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
              this.appConstants.apiURL.serviceURL_ESB +
              this.appConstants.getAllCategoriesMaster +
              "\n" +
              "Params={}",
            "view"
          );
          console.log(res);
          this.categoryMaster = res.result;
          console.log("Category Master array: ", this.categoryMaster);
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.getAllCategoriesMaster, res);
        }
        this.commonMethod.hideLoader();
      });
  }

  getRemarkHistoryData(id) {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall
      .getResponsePromise(
        this.appConstants.getRemarkHistoryDataUrl +
          id +
          "/" +
          this.commonDataShareService.submenuId
      )
      .subscribe((data) => {
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

  getCompanyMasterById(id){
    var params = {
      "id": id
    }
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getComapnyMasterDataById, params).subscribe(data => {

      var res = data.resp;
      if (res.responseCode == "200") {
        this.masterCompanyData = res.result[0];
        this.logo = "data:image/jpg;base64," + res.result[0].logo;
        this.images.logo = "data:image/jpg;base64," + res.result[0].logo;
        var masterData = this.categoryMaster
        var data = masterData.filter(x => x.id == res.result[0].categoryId);
        this.categoryData = data
        console.log(res);
        if(res.result[0].userAction !=null) {
          this.masterCompanyEditForm.patchValue({
            companyName: res.result[0].companyName,
            info: res.result[0].companyInfo,
            logo:this.logo,
            categoryId: res.result[0].categoryId,
            statusId: res.result[0].userAction,
          })
        }else{
          this.masterCompanyEditForm.patchValue({
            companyName: res.result[0].companyName,
            info: res.result[0].companyInfo,
            logo: this.logo,
            categoryId: res.result[0].categoryId,
            statusId: res.result[0].statusId,

          })
        }
      }
      else {
        this.errorCallBack(this.appConstants.getComapnyMasterDataById, res);
      }
      setTimeout(() => {
        this.commonMethod.hideLoader();
      }, 3000);
    })
  }

  openActionModel(action, formdata) {
    if(this.masterCompanyEditForm.get('logo').value == ""){ this.isCompanyImgError = true; }
    if (this.masterCompanyEditForm.valid) {

      if(this.isCompanyImgError == true) { return; }
      if(this.isValidCompanySizeFileFormat == true) { return; }

      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.masterCategoryEditFields.companyName = formdata.companyName;
      this.masterCategoryEditFields.categoryId = formdata.categoryId;
      this.masterCategoryEditFields.logo = formdata.logo
      this.masterCategoryEditFields.info = formdata.info
      this.masterCategoryEditFields.statusId = formdata.statusId
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.masterCompanyEditForm,
        this.formErrors,
        false
      );
    }
  }

  closeActionModel() {
    this.masterCompanyEditForm.patchValue({
      companyName: this.masterCategoryEditFields.companyName,
      categoryId: this.masterCategoryEditFields.categoryId,
      info:this.masterCategoryEditFields.info,
      statusId:this.masterCategoryEditFields.statusId
    });
    this.masterCompanyEditForm.get('logo').setValue(this.masterCategoryEditFields.logo)
    closeTinyModel();
  }

  editCompanyMasterWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();

      var param = this.masterCompanyEditService.editCategoryWithRemarkCall(
        this.masterCategoryEditFields,
        this.masterCompanyData,
        this.remarkForm.value,
        this.categoryData,
        this.images
      );
      this.updateCompany(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formErrors,
        false
      );
    }
  }

  editCompanyMaster() {
    this.formValidation.markFormGroupTouched(this.masterCompanyEditForm);
    if (this.masterCompanyEditForm.valid) {
      var param = this.masterCompanyEditService.editCategoryCall(
        this.masterCompanyEditForm.value,
        this.masterCompanyData,
        this.categoryData,
        this.images
      );
      this.updateCompany(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.masterCompanyEditForm,
        this.formErrors,
        false
      );
    }
  }

  updateCompany(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.updateComapnyMasterData, param)
      .subscribe((data) => {
        var res = data.resp;
        console.log("add invProduct response: ", res);
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.updateComapnyMasterData + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.masterCompanyData), 'update')
          console.log(res);
          showToastMessage(res.responseMessage);
          this.cancel();
        } else {
          if (
            this.commonDataShareService.roleType ==
            this.commonDataShareService.makerRole
          ) {
            this.masterCompanyEditForm.patchValue({
              companyName: this.masterCategoryEditFields.companyName,
              categoryId: this.masterCategoryEditFields.categoryId,
              info:this.masterCategoryEditFields.info,
              statusId:this.masterCategoryEditFields.statusId
            });
            this.masterCompanyEditForm.get('logo').setValue(this.masterCategoryEditFields.logo)
            this.logo = this.images.logo
          }
          this.errorCallBack(this.appConstants.updateComapnyMasterData, res);
        }
        this.commonMethod.hideLoader();
      });
  }

  cancel() {
    if (this.commonServiceCall.makerRequestEditUrl == "/insuranceCompany") {
      this.router.navigateByUrl("/insuranceCompany");
    } else if (this.commonServiceCall.makerRequestEditUrl == "/makerRequests") {
      this.router.navigateByUrl("/makerRequests");
    } else {
      this.router.navigateByUrl("/insuranceCompany");
    }
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  addImage(event: any) {
    console.log("inside");
    console.log(event);

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log(file);
      if (event.target.files[0].type == "image/jpeg" || event.target.files[0].type == "image/png") {

      }
      else {
          this.isValidCompanyFileFormat = true;
          this.isValidCompanySizeFileFormat = false;
          this.logo = ""
          this.images.logo = ""
          this.masterCompanyEditForm.patchValue({
            logo:""
          })
        return;
      }


      const reader = new FileReader();
      reader.onload = (e: any) => {
        var img = new Image();
        var me = this
        img.src = window.URL.createObjectURL(file);
        img.onload = function () {
          console.log(img);
          var width = img.naturalWidth, height = img.naturalHeight;
            if (width > 380 || height > 180) {
              me.isValidCompanySizeFileFormat = true;
              me.isValidCompanyFileFormat = false;
            }
            else {
              me.logo = e.target.result;
              me.commonMethod.getBase64FromFile(file).subscribe((base64) => {
                me.images.logo = base64
              });
              me.masterCompanyEditForm.get('logo').setValue(file);
              me.isCompanyImgError = false;
              me.isValidCompanySizeFileFormat = false;
              me.isValidCompanyFileFormat = false;
            }
        };
      };
      reader.readAsDataURL(file);
    }
  }

  onCategoryChange(event)
  {
    this.categoryData=""
    var data:any
    var id = event.target.value
    var masterData = this.categoryMaster
    var data = masterData.filter(x => x.id == id);
    this.categoryData = data

  }



}
