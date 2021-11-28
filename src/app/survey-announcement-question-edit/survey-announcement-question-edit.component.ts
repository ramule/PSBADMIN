import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { SurveyAnnouncementQuestionEditService } from './survey-announcement-question-edit.service';
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
  selector: 'app-survey-announcement-question-edit',
  templateUrl: './survey-announcement-question-edit.component.html',
  styleUrls: ['./survey-announcement-question-edit.component.css']
})
export class SurveyAnnouncementQuestionEditComponent implements OnInit {

  statusArr = [];
  surveyId:any;
  questionDtl:any;
  surveyAddQuestionForm: FormGroup;
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
    public serviceEditAnnouncement : SurveyAnnouncementQuestionEditService
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
    this.surveyId = this.location.getState();
    this.commonServiceCall.pageName = "Edit Survey Question And Answer";
    this.getStatus();
    var param = this.serviceEditAnnouncement.getSurveyDtls(this.surveyId);
    this.getSurveyQuestion(param);
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

  getSurveyQuestion(param){
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstant.getSurveyReqAns, param).subscribe(data => {
      console.log(data);
      var res = data.resp;
      if (res.responseCode == "200") {
        this.surveyAddQuestionForm.patchValue({
          question: res.result[0].surveyQue,
          answer1: res.result[0].surveyAns1,
          answer2: res.result[0].surveyAns2,
          answer3: res.result[0].surveyAns3,
          answer4: res.result[0].surveyAns4,
          statusId: res.result[0].statusId
        })
        this.questionDtl = res.result[0];
        this.commonMethod.hideLoader();
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.getSurveyReqAns, res);
      }

    })
  }

  updateSurveyQuesAns() {
    this.formValidation.markFormGroupTouched(this.surveyAddQuestionForm);
    if (this.surveyAddQuestionForm.valid) {
      var formData = this.surveyAddQuestionForm.value;
      var userDetails = JSON.parse(this.commonServiceCall.userCredential);
      var param = this.serviceEditAnnouncement.getUpdateParam(this.surveyId.surveyId,formData,userDetails.user_ID,this.questionDtl);
      console.log(param);
      this.updateAddQuestion(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.surveyAddQuestionForm, this.formErrors, false)
    }
  }


  filterStatus()
  {
    return this.statusArr.filter(x => x.shortName == 'ACTIVE' || x.shortName == 'INACTIVE');
  }

  updateAddQuestion(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstant.UpdateSurveyQueAndAns, param).subscribe(data => {
      console.log(data);
      var res = data.resp;
      if (res.responseCode == "200") {
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
        var value = {
          id : this.surveyId.surveyId
        }
        this.router.navigateByUrl('/surveyDetail',{ state: { value: value }});
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.UpdateSurveyQueAndAns, res);
      }

    })
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancel() {
    var value = {
      id : this.surveyId.surveyId
    }
    this.router.navigateByUrl('/surveyDetail',{ state: { value: value }});
  }

  closeActionModel(){
    
  }

}
