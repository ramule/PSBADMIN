import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { Location, TitleCasePipe, DatePipe } from '@angular/common';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
declare var showToastMessage: any;
declare var $ :any;
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var moment: any;

@Component({
  selector: 'app-survey-announcement-details',
  templateUrl: './survey-announcement-details.component.html',
  styleUrls: ['./survey-announcement-details.component.css']
})
export class SurveyAnnouncementDetailsComponent implements OnInit {

  surveyDetailForm: FormGroup;
  surveyDetail:any;
  ansList = [];
  questionList = [];
  formErrors = {
    surveyName:'',
    status:'',
    surveyStart: '',
    surveyEnd:''
  }
  todayDate:any;
  masterStatus = [];
  toDateValid:boolean = false;
  isToDateValidError:any;

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private location: Location,
    public commonMethod : CommonMethods,
    public appConstant : AppConstants,
    private titlecasePipe:TitleCasePipe,
    public datePipe : DatePipe
  ) { }


  public buildForm() {
    this.surveyDetailForm = this.form.group({
      surveyName: new FormControl(''),
      status: new FormControl('', [Validators.required]),
      surveyStart: new FormControl(''),
      surveyEnd: new FormControl('', [Validators.required]),
    });
    this.surveyDetailForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.surveyDetailForm, this.formErrors, true)
    });
  }

  ngOnInit() {
    this.buildForm();
    this.commonServiceCall.pageName = "Announcement Details";
    this.surveyDetail = this.location.getState();
    this.getSurveyQuestion(this.surveyDetail.value.id);
    this.getSurveyMasterDetailsById(this.surveyDetail.value.id)
    this.getStatus();
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  getSurveyQuestion(id){
    $('#dt-sample').DataTable().clear().destroy();
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstant.getSurveyQuestionById+"/"+id).subscribe((data) => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.questionList = res.result;
        this.commonMethod.setDataTable1();
        this.commonMethod.hideLoader();
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.getSurveyQuestion, res);
      }
    });
  }

  getSurveyMasterDetailsById(id){
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstant.getSurveyMasterDetailsById+id).subscribe((data) => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        var result = res.result[0];
         this.surveyDetailForm.patchValue({
          surveyName: result.surveyName,
          status: result.statusId,
          surveyStart: result.surveyStart != null ? this.datePipe.transform(result.surveyStart, 'yyyy-MM-dd'):'-',
          surveyEnd: result.surveyEnd != null ? this.datePipe.transform(result.surveyEnd, 'yyyy-MM-dd'):'-'
        });
        this.commonMethod.hideLoader();
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.getSurveyQuestion, res);
      }
    });
  }

  getStatus() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstant.masterStatusUrl).subscribe(data => {
      if (data.status) {
        this.commonMethod.hideLoader();
        console.log('Data resp: ', data.resp);
        this.masterStatus = [];
        data.resp.forEach(el => {
          if(el.id== 3 || el.id == 0){
            this.masterStatus.push(el);
          }
        });
      } else {
        this.commonMethod.hideLoader();
        this.commonMethod.errorMessage(data);
      }
    });
  }

  getSurveyAnswer(){
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstant.getSurveyAnswer).subscribe((data) => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        this.ansList = res.result;
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.getSurveyQuestion, res);
      }
    });
  }


  onDateChange(value){
    if(value.fromDate != "" && value.toDate != ""){
      if(value.toDate < value.fromDate){
        console.log(value);
        this.toDateValid = true;
        this.isToDateValidError = "* Please enter valid date";
      }
      else{
        this.toDateValid = false;
        this.isToDateValidError = "";
      }
    }
  }


  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  gotoQueAns(item){
    console.log(item);
    this.router.navigateByUrl("/announcementQueEdit",{ state: { id: item.id , surveyId: item.surveyId } });
  }


  updateSurveyDetails() {
    console.log("updateSurveyDetails");
    this.formValidation.markFormGroupTouched(this.surveyDetailForm);
    if (this.surveyDetailForm.valid) {
      var formData = this.surveyDetailForm.value;
      var param = {
        "id": this.surveyDetail.value.id,
        "surveyName": this.surveyDetail.value.surveyName,
        "surveyStart": this.surveyDetail.value.surveyStart,
        "surveyEnd": formData.surveyEnd,
        "createdby": this.surveyDetail.value.createdby,
        "createdon": this.surveyDetail.value.createdon,
        "statusId":formData.status
      }
      this.saveDetails(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.surveyDetailForm, this.formErrors, false)
    }

  }

  cancel() {
    this.router.navigateByUrl("/announcement");
  }

  saveDetails(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstant.updateSurveMasterDetails, param).subscribe(data => {
      console.log(data);
      var res = data.resp;
      if (res.responseCode == "200") {
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
        this.router.navigateByUrl('/survey');
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.updateSurveMasterDetails, res);
      }

    })
  }


  addSurveyQuestion(){
    this.router.navigateByUrl("/announcementQue", { state: { id: this.surveyDetail.value.id , pageName : 'surveyDtl', pageHeader : this.surveyDetailForm.get('surveyName').value } });
  }

}
