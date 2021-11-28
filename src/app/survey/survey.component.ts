import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../app-constants';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { SurveyService } from './survey.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { NgxPrettifyService } from '@smartcodelab/ngx-prettify';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { DatePipe } from '@angular/common';
declare var showToastMessage: any;
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare function beautify(): any;
declare var $: any;

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  surveyAddForm:FormGroup;

  id = 50;
  menuLink = "survey";
  priviledgeDataArr: any = [];
  surveyList:any = [];
  showForm:boolean = false;
  isAddButtonClicked = false;
  masterStatus = [];
  formErrors = {
    surveyName:'',
    status:'',
    surveyStart: '',
    surveyEnd:''
  }
  todayDate:any;
  toDateValid:boolean = false;
  isToDateValidError:any;

  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    private commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    private surveyService : SurveyService,
    public datePipe : DatePipe
  ) { }


   /**
   * This function will be called on initilization of page
   * functionality
   * define page name
   * Intialize form
   * get all the status list
   * get today's date
   */
  ngOnInit(): void {
    this.commonServiceCall.pageName = "Survey";
    this.getLeftMenuId(); /*** api call to get priviledges for the page */
    this.buildForm(); /*** intialize form to add survey */
    this.getStatus(); /*** get all the status from status master */
    this.surveyAddForm.patchValue({
      status: 3
    });
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd'); /*** get today's date and assign in 'yyyy-MM-dd' format */
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
      this.getPriviledgeData(id);
      console.log('Left Menu Id: ', id);
    } else {
      showToastMessage('Cannot get Id');
    }
  });
}


  /* Function get priviledges for this page on the basis of submenu id */

  getPriviledgeData(id) {
    var url = this.appConstants.getPriviledgeDataUrl + id+"/"+this.commonDataService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if(this.priviledgeDataArr.viewChecked) {
          this.getSurveyList();
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
          var param = this.surveyService.addAuditTrailAdaptorParams(URL,operation);
          console.log(param)
          this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
          })
      }


  /**
   * This function is used to intialize form to add survey
   * added required validation feilds
   * get on touch validation
   */
  public buildForm() {
    this.surveyAddForm = this.form.group({
      surveyName: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      surveyStart: new FormControl('', [Validators.required]),
      surveyEnd: new FormControl('', [Validators.required]),
    });
    this.surveyAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.surveyAddForm, this.formErrors, true)
    });
  }


  /**
   * This function call api for status master
   */
  getStatus() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.masterStatusUrl).subscribe(data => {
      if (data.status) {
         /*** Data table is initiallized */
        this.masterStatus = [];
         /*** Filter status master */
         /*** only active and inactive master is allowed */
        data.resp.forEach(el => {
          if(el.id== 3 || el.id == 0){
            /*** responce is mapped to status dropdown */
            this.masterStatus.push(el);
          }
        });
        this.commonMethod.hideLoader();
      } else {
        this.commonMethod.hideLoader();
        this.commonMethod.errorMessage(data);
      }
    });
  }

  /**
   * This function called on date change
   * validation if todate is less than from date
   * @value get formdate and to date
   */
  onDateChange(value){
    if(value.surveyStart != "" && value.surveyEnd != ""){ /*** check if formdate and todate is empty */
      if(value.surveyEnd < value.surveyStart){ /*** check if todate is less than fromdate */
        /*** excute this section on true */
        /*** assign error message and @toDateValid
         * variable to hide and show message
         */
        this.toDateValid = true;
        this.isToDateValidError = "* From date can't be greater than to date";
      }
      else{
        /*** excute this section on false condition */
        this.toDateValid = false;
        this.isToDateValidError = "";
      }
    }
  }


  /**
   * This function get all the active and inactive survey
   */
  getSurveyList(){
    this.commonMethod.showLoader(); /*** show loader */
    this.commonServiceCall.getResponsePromise(this.appConstants.getActiveSurveyDetails).subscribe(data => {
      var res = data.resp;
      this.commonMethod.destroyDataTable(); /*** Data table is destroyed */
      if (res.responseCode == "200") {
           this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.getActiveSurveyDetails+"\n"+"Params={}",'view')
        /*** responce is mapped to survey table*/
        this.surveyList = res.result;
        /*** Data table is initiallized */
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
      } else if(res.responseCode == "202") {
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable" : "No Data found"
            }})});
      } else {
        /*** Data table is initiallized if no record available */
        /*** function call if any error */
        this.errorCallBack(this.appConstants.getActiveSurveyDetails, res);
      }
      this.commonMethod.hideLoader(); /*** hide loader */
    });
  }

  /**
   * functionality to handel errors in api call
   * display error message in case of error
   */
  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  /**
   * This function will redirect to question and option page of created survey
   */
  gotoQueAns(value){
    this.router.navigateByUrl('/surveyDetail',{ state: { value: value } });
  }


  /**
   * Hide add survey form
   * reset add survey form
   * reload survey list
   */
  cancel() {
    this.showForm = !this.showForm;
    this.surveyAddForm.reset();
    this.isAddButtonClicked = false;
    this.getSurveyList();
  }

  /**
   * This function is called on submit of form
   * validate all form element on success configure input param for api call to save survey
   */
  addSurveMasterDetails() {
     /*** validate form date */
    this.formValidation.markFormGroupTouched(this.surveyAddForm);
    if (this.surveyAddForm.valid) {
       /*** execute on form success */
      if(this.toDateValid){ return;}  /*** check valid data and format of todate and formdate */
      var userDetails = JSON.parse(this.commonServiceCall.userCredential);  /*** get login user details */
      var formData = this.surveyAddForm.value;
      /*** map paramters for api call */
      var param = this.surveyService.getAddSurveyParam(formData,userDetails.user_ID);
      this.saveSurveyDetails(param);/*** api call to save survey */
    } else {
       /*** execute on form error */
      this.formErrors = this.formValidation.validateForm(this.surveyAddForm, this.formErrors, false)
    }
  }


  /**
   * In this function api is called to save survey details
   * on success redirect to add question page for the added survey
   * @param  getting paramter for api call
   */
 saveSurveyDetails(param) {
    this.commonMethod.showLoader(); /*** show loader */
    this.commonServiceCall.postResponsePromise(this.appConstants.addSurveMasterDetails, param).subscribe(data => {
      console.log(data);
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
           this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.addSurveMasterDetails+"\n"+"Params="+JSON.stringify(param),'add')
        this.commonMethod.hideLoader(); /*** hide loader */
        showToastMessage(res.responseMessage); /*** populate message on success of add survey */
        /*** redirect to question and option page with survey id,pagename,pageheader */
        this.router.navigateByUrl("/surveyQuestionAdd", { state: { id: res.result.id , pageName : 'survey' ,pageHeader : this.surveyAddForm.get('surveyName').value } });
      } else {
        /*** execute on api error */
        this.commonMethod.hideLoader(); /*** hide loader */
        /*** function execute on api error */
        this.errorCallBack(this.appConstants.addSurveMasterDetails, res);
      }
    })
  }

  /**
   * This function is called on clicking of add button
   * used to show add survey form
   */
  showHideForm() {
    this.showForm = !this.showForm
    this.isAddButtonClicked = true;
    setTimeout(()=>{
      // $('#sl_Survey').val('');
    });
    this.surveyAddForm.patchValue({
      status: 3
    });
  }

  cancelClick(){
    this.commonMethod.cancel();
  }


  closeActionModel(){

  }

}
