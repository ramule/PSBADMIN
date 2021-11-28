import { Component, OnInit } from "@angular/core";
import { AppConstants } from "../app-constants";
import {FormBuilder,FormGroup,FormControl,Validators,} from "@angular/forms";
import { FormValidationsService } from "../form-validations.service";
import { Router } from "@angular/router";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { CommonMethods } from "../common-methods";
import { DatePipe } from "@angular/common";
import { CommonDataShareService } from "../common-data-share.service";
import * as XLSX from "xlsx";
import { KycDocumentAddService } from './kyc-document-add.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-kyc-document-add',
  templateUrl: './kyc-document-add.component.html',
  styleUrls: ['./kyc-document-add.component.css']
})
export class KycDocumentAddComponent implements OnInit {
  roleId: any;
  selModel: any;
  tempData: any = [];
  finalarray: any = [];
  customerDetails: any = [];
  kycDocumentAddForm: FormGroup;
  remarkForm: FormGroup;
  isUploadExcel: boolean = false;
  isValidFileFormat: boolean = false;
  formBulkErrors = {
    documentFile: "",
    foldername:'',
    remark: ""
  };
  filename: any = "";
  showButton: boolean = false;
  menuLink = "salaryBulkUpload";
  masterFolder:any=[]
  folderId:any=""
  priviledgeDataArr: any = [];
  showSuccess:boolean=false
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public datePipe: DatePipe,
    private commonDataService: CommonDataShareService,
    private kycAddService : KycDocumentAddService
  ) { }

  ngOnInit(): void {
    this.roleId = this.commonDataService.roleId;
    this.commonServiceCall.pageName = "KYC Document Add";
    this.buildForm();
    this.getLeftMenuId();
   this.getCompanyList()

  }

   /* Insert tracking for user activities*/
      addAuditTrailAdaptor(URL,operation)
      {
          var param = this.kycAddService.addAuditTrailAdaptorParams(URL,operation);
          console.log(param)
          this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
          })
      }

  public buildForm() {
    this.kycDocumentAddForm = this.form.group({
      documentFile: new FormControl(""),
      foldername: new FormControl(""),
    });
    this.kycDocumentAddForm.valueChanges.subscribe((data) => {
      this.formBulkErrors = this.formValidation.validateForm(
        this.kycDocumentAddForm,
        this.formBulkErrors,
        true
      );
    });

    // if(this.selModel == 'remarkField') {
    //   this.remarkForm = this.form.group({
    //     remark: new FormControl('', [Validators.required])
    //   });
    //   this.remarkForm.valueChanges.subscribe((data) => {
    //     this.formBulkErrors = this.formValidation.validateForm(this.remarkForm, this.formBulkErrors, true)
    //   });
    // }
  }

    /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
    getLeftMenuId() {
      var id = "";
      var url = this.appConstants.getLeftMenuByMenuLinkUrl + this.menuLink;
      this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          console.log("response data: ", res);
          this.commonDataService.submenuId = res.result[0].id;
          this.commonDataService.submenuname = res.result[0].menuLink;
          id = res.result[0].id;
           this.getPriviledgeData(id);
          console.log("Left Menu Id: ", id);
        } else {
          showToastMessage("Cannot get Id");
        }
      });
    }

    getPriviledgeData(id) {
          var url = this.appConstants.getPriviledgeDataUrl + id+"/"+this.commonDataService.roleTypeId;
          this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
            var res = data.resp;
            if (res.responseCode == 200) {
              console.log('response data: ', res);
              this.priviledgeDataArr = res.result;
              console.log('response array: ', this.priviledgeDataArr);
              if(this.priviledgeDataArr.viewChecked) {
               // this.getCalculatorFormula();
              }
              else {
                showToastMessage('You Dont Have Priviledge To View The Data');
              }
            } else {
              showToastMessage('You Dont Have Priviledge To View The Data');
            }
          });
        }

    getCompanyList()
    {
      this.masterFolder = [ {
        displayName : 'Shubham'
       },
       {
        displayName : 'Vikrant'
       },
       {
        displayName : 'Ravi'
       }]
      this.commonMethod.showLoader();
      //this.masterFolder = [];
      this.commonServiceCall.getResponsePromise(this.appConstants.getCorpCompanyDetailsUrl).subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          console.log('response data: ', res);
        var data = res.result
        //this.masterFolder = data.filter((f) =>f.statusName=="ACTIVE")
        console.log('response data: ', this.masterFolder);
        } else {
          this.errorCallBack(this.appConstants.getCorpCompanyDetailsUrl, res);
        }
        this.commonMethod.hideLoader();
        this.commonMethod.destroyDataTable();
      });
    }

     /* This function calls when an error occurs */
   errorCallBack(fld, res) {
    if (fld == this.appConstants.addConfigMasterUrl) {
      this.commonMethod.errorMessage(res);
    }
  }

    addExcelFile(event: any) {
      this.isValidFileFormat = false;
      this.isUploadExcel = false;
      console.log(event);
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (event.target.files[0].name.indexOf(".xls") == -1) {
          this.isValidFileFormat = true;
          this.showSuccess = false
          return;
        }
        this.showSuccess = true
        this.filename = event.target.files[0].name;
        this.kycDocumentAddForm.get("documentFile").setValue(file);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          let workBook = null;
          let jsonData = null;
          const data = reader.result;
          workBook = XLSX.read(data, { type: "binary" });
          jsonData = workBook.SheetNames.reduce((initial, name) => {
            const sheet = workBook.Sheets[name];
            initial[name] = XLSX.utils.sheet_to_json(sheet);
            return initial;
          }, {});
          this.tempData = jsonData.Sheet1;
        };
        reader.readAsBinaryString(file);
      }
    }

    upload() {
     // alert(JSON.stringify(this.kycDocumentAddForm.value))
      if (this.kycDocumentAddForm.get("documentFile").value == "" || this.kycDocumentAddForm.get("company").value == "") {
        this.isUploadExcel = true;
        if(this.kycDocumentAddForm.get("company").value=="")
        this.formBulkErrors.foldername = "* This field is required"
        return;
      } else {
        this.showButton = true;
        this.customerDetails = this.tempData;
        // this.customerDetails.forEach((element) => {
        //   element.isChecked = false;
        // });
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.formBulkErrors.foldername = ""
        this.isUploadExcel = false;
      }
    }

    select(item) {
      if ($("#approveCheckBox").is(":checked")) {
        this.customerDetails.map((v) => (v.isChecked = true));
      } else {
        this.customerDetails.map((v) => (v.isChecked = false));
      }
    }

    cancelClick() {
      this.router.navigateByUrl('/KYCDocumentList');
    }

    bulkCustomerUpload() {
      this.finalarray = [];
      var newarray = [];
      newarray = this.customerDetails;
     // this.finalarray = newarray.filter((f) => f.isChecked == true);
      this.finalarray = newarray
        this.finalarray.forEach((element) => {
          (element.role_ID = this.commonDataService.roleId),
            (element.user_ID = this.commonDataService.user_ID),
            (element.subMenu_ID = this.commonDataService.submenuId),
            (element.remark = ""),
            (element.activityName = "salaryBulkUpload");
            (element.createdby = this.commonDataService.user_ID);
            (element.statusId = 3);
            (element.appId = "");
        });
        console.log(this.finalarray);
        this.commonMethod.showLoader()
        this.commonServiceCall
          .postResponsePromise(
            this.appConstants.bulkSalaryUpload,
            this.finalarray
          )
          .subscribe((data) => {
            var res = data.resp;
            if (res.responseCode == "200") {
            //  this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.bulkSalaryUpload+"\n"+"Params="+JSON.stringify(this.finalarray),'add')
              this.commonMethod.hideLoader();
              console.log(res.result);
              showToastMessage(res.responseMessage);
              this.customerDetails = [];
              this.showButton = false;
              this.kycDocumentAddForm.patchValue({
                documentFile: "",
              });
              this.kycDocumentAddForm.get("company").setValue('')
              $('#company_dropdown').val('');
              this.router.navigateByUrl("/dashboard")
            } else {
              this.commonMethod.hideLoader();
              // this.errorCallBack(this.appConstants.updateStatusListByChecker, res);
            }
          });
    }

    // openActionModel(action) {
    //   openTinyModel();
    //   this.selModel = action;
    //   this.buildForm();
    // }

    // closeActionMoel() {
    //   closeTinyModel();
    //   this.selModel = "";
    //   this.remarkForm.reset();
    // }

    // bulkCustomerUploadWithRemark(formdata) {
    //   if(this.remarkForm.valid) {
    //     this.finalarray = [];
    //     var newarray = [];
    //     newarray = this.customerDetails;
    //     this.finalarray = newarray
    //       this.finalarray.forEach((element) => {
    //         (element.role_ID = this.commonDataService.roleId),
    //           (element.user_ID = this.commonDataService.user_ID),
    //           (element.subMenu_ID = this.commonDataService.submenuId),
    //           (element.remark = formdata.remark),
    //           (element.activityName = "salaryBulkUpload");
    //           (element.createdby = this.commonDataService.user_ID);
    //           (element.statusId = 3);
    //           (element.appId = "");
    //       });
    //       console.log(this.finalarray);
    //       this.commonMethod.showLoader()
    //       this.commonServiceCall
    //         .postResponsePromise(
    //           this.appConstants.bulkSalaryUpload,
    //           this.finalarray
    //         )
    //         .subscribe((data) => {
    //           var res = data.resp;
    //           if (res.responseCode == "200") {
    //             this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.bulkSalaryUpload+"\n"+"Params="+JSON.stringify(this.finalarray),'add')
    //             closeTinyModel();
    //             this.commonMethod.hideLoader();
    //             console.log(res.result);
    //             showToastMessage(res.responseMessage);

    //             this.customerDetails = [];
    //             this.showButton = false;
    //             this.kycDocumentAddForm.patchValue({
    //               documentFile: "",
    //             });
    //             this.kycDocumentAddForm.get("company").setValue('')
    //             $('#company_dropdown').val('');
    //             this.router.navigateByUrl("/dashboard")
    //           } else {
    //             this.commonMethod.hideLoader();
    //             // this.errorCallBack(this.appConstants.updateStatusListByChecker, res);
    //           }
    //         });
    //   }
    //   else {
    //     this.formBulkErrors = this.formValidation.validateForm(this.remarkForm, this.formBulkErrors, false);
    //   }
    // }

    onSelected(folderId)
    {
      this.folderId = folderId
      if(this.folderId )
      {
        this.kycDocumentAddForm.get("foldername").setValue(folderId)
        this.formBulkErrors.foldername=""
      }
      else
      {
        this.kycDocumentAddForm.get("foldername").setValue('')
      }

    }

}
