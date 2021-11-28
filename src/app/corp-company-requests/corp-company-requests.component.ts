import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CorpCompanyRequestsService } from './corp-company-requests.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-corp-company-requests',
  templateUrl: './corp-company-requests.component.html',
  styleUrls: ['./corp-company-requests.component.css']
})
export class CorpCompanyRequestsComponent implements OnInit {

  corpCompanyForm: FormGroup;
  remarkForm: FormGroup;
  priviledgeDataArr: any = [];
  corpCompanyReqArr: any = [];
  priveledge: any;
  displayImage: any;
  type: any;
  menuLink = "corpCompanyRequests";
  selModel: any;
  formErrors = {
    searchBy: '',
    rrn: '',
    cif: '',
    companyName: '',
    companyCode: '',
  }
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private corpCompanyRequestsService: CorpCompanyRequestsService,
    public commonDataService: CommonDataShareService
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Corporate Company Requests";
    this.buildForm();
    this.getLeftMenuId();
    this.commonMethod.hideLoader();
  }

  public buildForm() {
    this.corpCompanyForm = this.form.group({
      searchBy: new FormControl('', [Validators.required]),
    });
    this.corpCompanyForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.corpCompanyForm, this.formErrors, true)
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
        this.commonDataService.submenuId = res.result[0].id;
        id = res.result[0].id;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

  getPriviledgeData(id) {
    var url = this.appConstants.getPriviledgeDataUrl + id + "/" + this.commonDataService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if (this.priviledgeDataArr.viewChecked) {
          this.priveledge = true
        }
        else {
          this.priveledge = false
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        this.priveledge = false
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.corpCompanyRequestsService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  getSearchByCorpCompany(value) {
    console.log(value);
    this.type = value.searchBy;
    this.corpCompanyReqArr = [];
    this.corpCompanyForm.removeControl('rrn');
    this.corpCompanyForm.removeControl('cif');
    this.corpCompanyForm.removeControl('companyName');
    this.corpCompanyForm.removeControl('companyCode');

    if (this.type == 'rrn') {
      this.corpCompanyForm.addControl('rrn', new FormControl('', [Validators.required]));
    }
    else if (this.type == 'cif') {
      this.corpCompanyForm.addControl('cif', new FormControl('', [Validators.required]));
    }
    else if (this.type == 'companyName') {
      this.corpCompanyForm.addControl('companyName', new FormControl('', [Validators.required]));
    }
    else if (this.type == 'companyCode') {
      this.corpCompanyForm.addControl('companyCode', new FormControl('', [Validators.required]));
    }
  }

  getLogoImage(item, type) {
    this.selModel = "Image";
    if(type == 'logo') {
      if (item.logo === null || item.logo === "" || item.logo === undefined) {
        showToastMessage("Logo Image Not Available");
      }
      else {
        this.displayImage = item.logo;
        openTinyModel();
      }
    }
    else if(type == 'coi') {
      if (item.coi === null || item.coi === "" || item.coi === undefined) {
        showToastMessage("COI Image Not Available");
      }
      else {
        this.displayImage = item.coi;
        openTinyModel();
      }
    }
    else if(type == 'pancardNo') {
      if (item.pancardNo === null || item.pancardNo === "" || item.pancardNo === undefined) {
        showToastMessage("PAN Card Image Not Available");
      }
      else {
        this.displayImage = item.pancardNo;
        openTinyModel();
      }
    }
    else if(type == 'moa') {
      if (item.moa === null || item.moa === "" || item.moa === undefined) {
        showToastMessage("MOA Image Not Available");
      }
      else {
        this.displayImage = item.moa;
        openTinyModel();
      }
    }
    else if(type == 'otherDoc') {
      if (item.otherDoc === null || item.otherDoc === "" || item.otherDoc === undefined) {
        showToastMessage("Other Document Image Not Available");
      }
      else {
        this.displayImage = item.otherDoc;
        openTinyModel();
      }
    }
  }

  closeActionModel() {
    closeTinyModel();
  }

  getCorpCompanyDetails() {
    this.formValidation.markFormGroupTouched(this.corpCompanyForm);

    if (this.corpCompanyForm.valid) {
      var formData = this.corpCompanyForm.value;
      if (this.type == 'rrn') {
        var inputdata = this.corpCompanyRequestsService.getCorpCompanyDetailsByType(formData);

        if (this.priveledge == true)
          this.getDtlByType(inputdata);
        else
          showToastMessage('You Dont Have Priviledge To View The Data');
      }
      else if(this.type == 'cif' || this.type == 'companyCode' || this.type == 'companyName') {
        if(this.type == 'cif') {
          var inputdata = this.corpCompanyRequestsService.getCorpCompanyDetailsByType(formData);

          if (this.priveledge == true)
            this.getCorpCompanyDetailsByCIFCompnameCompcode(inputdata);
          else
            showToastMessage('You Dont Have Priviledge To View The Data');
        }

        if(this.type == 'companyCode') {
          var inputdata = this.corpCompanyRequestsService.getCorpCompanyDetailsByType(formData);

          if (this.priveledge == true)
            this.getCorpCompanyDetailsByCIFCompnameCompcode(inputdata);
          else
            showToastMessage('You Dont Have Priviledge To View The Data');
        }

        if(this.type == 'companyName') {
          var inputdata = this.corpCompanyRequestsService.getCorpCompanyDetailsByType(formData);

          if (this.priveledge == true)
            this.getCorpCompanyDetailsByCIFCompnameCompcode(inputdata);
          else
            showToastMessage('You Dont Have Priviledge To View The Data');
        }
      }
      else if (this.type == 'all') {
        if (this.priveledge == true)
          this.getAllCorpCompanyDetails();
        else
          showToastMessage('You Dont Have Priviledge To View The Data');
      }
    } else {
      this.formErrors = this.formValidation.validateForm(this.corpCompanyForm, this.formErrors, false)
    }
  }

  getCorpCompanyDetailsByCIFCompnameCompcode(params) {
    $('#dt-sample').DataTable().clear().destroy();
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getCorpByCompNameCifCorpIdUrl, params).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        //initiallize datatable
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getCorpByCompNameCifCorpIdUrl + "\n" + "Params=" + JSON.stringify(params), 'view')
        this.commonMethod.setDataTable(this.commonServiceCall.pageName);
        this.corpCompanyReqArr = res.result;
        this.commonMethod.hideLoader();
      } else {

        $('table.display').DataTable({
          "language": {
            "emptyTable": "No Data found"
          }
        });
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCorpByCompNameCifCorpIdUrl, res);
      }
    });
  }

  getAllCorpCompanyDetails() {
    $('#dt-sample').DataTable().clear().destroy();
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getCorpCompRequestsUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getCorpCompRequestsUrl + "\n" + "Params={}", 'view')
        //initiallize datatable
        this.commonMethod.setDataTable(this.commonServiceCall.pageName);
        this.corpCompanyReqArr = res.result;
        this.commonMethod.hideLoader();
      } else {

        $('table.display').DataTable({
          "language": {
            "emptyTable": "No Data found"
          }
        });
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCorpCompRequestsUrl, res);
      }
    });
  }

  getDtlByType(param) {
    $('#dt-sample').DataTable().clear().destroy();
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getCorpCompRequestsByRrnUrl, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        //initiallize datatable
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getCorpCompRequestsByRrnUrl + "\n" + "Params=" + JSON.stringify(param), 'view')
        this.commonMethod.setDataTable(this.commonServiceCall.pageName);
        this.corpCompanyReqArr = res.result;
        this.commonMethod.hideLoader();
      } else {

        $('table.display').DataTable({
          "language": {
            "emptyTable": "No Data found"
          }
        });
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCorpCompRequestsByRrnUrl, res);
      }
    });
  }

  gotoCorpCompanyDetails(item) {
    console.log(item);
    if (item.statusname === 'CORP_APPROVER_PENDING' && this.commonDataService.roleType == this.commonDataService.corpMakerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.commonDataService.submenuname = 'corpCompanyRequestsEdit';
      this.commonDataService.customerAgent.createdon = item.createdon;
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
      this.router.navigateByUrl("/corpCompanyRequestsEdit", { state: { id: item.id } });
    }
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancel() {
    this.commonMethod.cancel();
  }

}
