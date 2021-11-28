import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { Location } from "@angular/common";
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { InsuranceCategoryEditService } from './insurance-category-edit.service';
import { browserRefresh } from '../app.component';

declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-insurance-category-edit',
  templateUrl: './insurance-category-edit.component.html',
  styleUrls: ['./insurance-category-edit.component.css']
})
export class InsuranceCategoryEditComponent implements OnInit {

  masterCategoryEditForm: FormGroup;
  remarkForm: FormGroup;

  masterCategoryData: any = [];
  remarkHistoryArr: any = [];
  selModel: any;
  categoryData: any;

  formErrors = {
    categoryName: "",
    statusId: "",
    remark: "",
  };

  masterCategoryEditFields = {
    categoryName: "",
    statusId: "",
  };
  status:any=[]

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public router: Router,
    public masterCategoryEditService: InsuranceCategoryEditService,
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
      this.router.navigateByUrl('/insuranceCategory');
      return;
    }

    this.commonServiceCall.pageName = "Edit Category";
    this.categoryData = this.location.getState();
    this.buildForm();
    this.getStatus()
    this.getCategoryMasterById(this.categoryData.id);
    this.getRemarkHistoryData(this.categoryData.id);
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.masterCategoryEditService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  public buildForm() {
    this.masterCategoryEditForm = this.form.group({
      categoryName: new FormControl("", [Validators.required,Validators.pattern(/^(?=.*[a-zA-Z])[()a-zA-Z0-9.-_ ]+$/)]),
      statusId:new FormControl("", [Validators.required]),
    });

    this.masterCategoryEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.masterCategoryEditForm,
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

  getCategoryMasterById(id){
    var params = {
      "id": id
    }
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getCompCategoriesMasterById, params).subscribe(data => {

      var res = data.resp;
      if (res.responseCode == "200") {
        this.masterCategoryData = res.result[0];

        console.log(res);
        if(res.result[0].userAction !=null) {
          this.masterCategoryEditForm.patchValue({
            categoryName: res.result[0].categoryName,
            statusId: res.result[0].userAction,
          })
        }else{
          this.masterCategoryEditForm.patchValue({
            categoryName: res.result[0].categoryName,
            statusId: res.result[0].statusId,

          })
        }
      }
      else {
        this.errorCallBack(this.appConstants.getCompCategoriesMasterById, res);
      }
      setTimeout(() => {
        this.commonMethod.hideLoader();
      }, 3000);
    })
  }

  openActionModel(action, formdata) {
    if (this.masterCategoryEditForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.masterCategoryEditFields.categoryName = formdata.categoryName;
      this.masterCategoryEditFields.statusId = formdata.statusId;
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.masterCategoryEditForm,
        this.formErrors,
        false
      );
    }
  }

  closeActionModel() {
    this.masterCategoryEditForm.patchValue({
      categoryName: this.masterCategoryEditFields.categoryName,
      statusId: this.masterCategoryEditFields.statusId,
    });
    closeTinyModel();
  }

  editCategoryMasterWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();

      var param = this.masterCategoryEditService.editCategoryWithRemarkCall(
        this.masterCategoryEditFields,
        this.masterCategoryData,
        this.remarkForm.value
      );
      this.updateCategory(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formErrors,
        false
      );
    }
  }

  editCategoryMaster() {
    this.formValidation.markFormGroupTouched(this.masterCategoryEditForm);
    if (this.masterCategoryEditForm.valid) {
      var param = this.masterCategoryEditService.editCategoryCall(
        this.masterCategoryEditForm.value,
        this.masterCategoryData
      );
      this.updateCategory(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.masterCategoryEditForm,
        this.formErrors,
        false
      );
    }
  }

  updateCategory(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.updateCompCategoryMasterData, param)
      .subscribe((data) => {
        var res = data.resp;
        console.log("add invProduct response: ", res);
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.updateCompCategoryMasterData + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.masterCategoryData), 'update')
          console.log(res);
          showToastMessage(res.responseMessage);
          this.cancel();
        } else {
          if (
            this.commonDataShareService.roleType ==
            this.commonDataShareService.makerRole
          ) {
            this.masterCategoryEditForm.patchValue({
              categoryName: this.masterCategoryEditFields.categoryName,
              statusId:this.masterCategoryEditFields.statusId
            });
          }
          this.errorCallBack(this.appConstants.updateCompCategoryMasterData, res);
        }
        this.commonMethod.hideLoader();
      });
  }

  cancel() {
    if (this.commonServiceCall.makerRequestEditUrl == "/insuranceCategory") {
      this.router.navigateByUrl("/insuranceCategory");
    } else if (this.commonServiceCall.makerRequestEditUrl == "/makerRequests") {
      this.router.navigateByUrl("/makerRequests");
    } else {
      this.router.navigateByUrl("/insuranceCategory");
    }
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

}
