import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { SurveyAnnouncementQuestionService } from './survey-announcement-question.service'
import { Router } from '@angular/router';
import { Location, TitleCasePipe } from '@angular/common';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { format } from 'path';
declare var showToastMessage: any;
declare var $: any;
declare function openTinyModel(): any;
declare function closeTinyModel(): any;

@Component({
  selector: 'app-survey-announcement-question',
  templateUrl: './survey-announcement-question.component.html',
  styleUrls: ['./survey-announcement-question.component.css']
})
export class SurveyAnnouncementQuestionComponent implements OnInit {

  statusArr = [];
  questionList = [];
  surveyId:any;
  surveyAddQuestionForm: FormGroup;
  fromPage:any;
  formErrors = {
    question: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    statusId: ''
  }

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private location: Location,
    public commonMethod: CommonMethods,
    public appConstant: AppConstants,
    private surveyAddService : SurveyAnnouncementQuestionService
  ) { }



  public buildForm() {
    this.surveyAddQuestionForm = this.form.group({
      question: new FormControl('', [Validators.required]),
      answer1: new FormControl('', [Validators.required]),
      answer2: new FormControl('', [Validators.required]),
      answer3: new FormControl(''),
      answer4: new FormControl(''),
      statusId: new FormControl('', [Validators.required]),
    });
    this.surveyAddQuestionForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.surveyAddQuestionForm, this.formErrors, true)
    });
  }

  ngOnInit(): void {
    this.buildForm();
    this.getStatus();
    this.surveyId = this.location.getState();
    this.fromPage = this.surveyId.pageName;
    this.commonServiceCall.pageName = "Add Question And Answer For"+this.surveyId.pageHeader;
  }


  getStatus() {
    this.commonServiceCall.getResponsePromise(this.appConstant.masterStatusUrl).subscribe(data => {
      if (data.status) {
        this.statusArr = data.resp;
      } else {
        this.commonMethod.errorMessage(data);
      }
    });
  }

  saveSurveyAddQuestion() {
    this.formValidation.markFormGroupTouched(this.surveyAddQuestionForm);
    if (this.surveyAddQuestionForm.valid) {
      var formData = this.surveyAddQuestionForm.value;
      var userDetails = JSON.parse(this.commonServiceCall.userCredential);
      var param = this.surveyAddService.getUpdateParam(this.surveyId.id,formData,userDetails.user_ID);
      console.log(param);
      this.saveAddQuestion(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.surveyAddQuestionForm, this.formErrors, false)
    }
  }


  filterStatus()
  {
    return this.statusArr.filter(x => x.shortName == 'ACTIVE' || x.shortName == 'INACTIVE');
  }

  saveAddQuestion(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstant.saveCustAnsOfSurvey, param).subscribe(data => {
      console.log(data);
      var res = data.resp;
      if (res.responseCode == "200") {
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
        if(this.fromPage == 'surveyDtl'){
          var value = {
            id : this.surveyId.id
          }
          this.router.navigateByUrl('/surveyDetail',{ state: { value: value } });
        }
        else{
          this.getSurveyQuestion(this.surveyId.id);
        }
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.saveCustAnsOfSurvey, res);
      }

    })
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancel() {
    if(this.fromPage == 'surveyDtl'){
      var value = {
        id : this.surveyId.id
      }
      this.router.navigateByUrl('/announcementDtl',{ state: { value: value } });
    }
    else{
      this.router.navigateByUrl('/announcement');
    }
  }

  closeActionModel(){
    closeTinyModel()
  }

  getSurveyQuestion(id){
    $('#dt-sample').DataTable().clear().destroy();
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstant.getSurveyQuestionById+"/"+id).subscribe((data) => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.questionList = res.result;
        this.commonMethod.setDataTable(this.commonServiceCall.pageName);
        this.commonMethod.hideLoader();
        this.surveyAddQuestionForm.reset();
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.getSurveyQuestion, res);
      }
    });
  }

}
