import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonMethods } from '../common-methods';
import { CommonDataShareService } from '../common-data-share.service';
declare var showToastMessage: any;

@Component({
  selector: 'app-analytics-bot-survey',
  templateUrl: './analytics-bot-survey.component.html',
  styleUrls: ['./analytics-bot-survey.component.css']
})
export class AnalyticsBotSurveyComponent implements OnInit {

  p: number = 1;
  analyticsBOTForm: FormGroup;
  formErrors = {
    fromDate: '',
    toDate: ''
  }

  botAnalytics:any =[];

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public router: Router,
    public commonMethod : CommonMethods
  ) { }

  public buildForm() {
    this.analyticsBOTForm = this.form.group({
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required])
    });
    this.analyticsBOTForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.analyticsBOTForm, this.formErrors, true)
    });
  }

  ngOnInit(){
    this.buildForm();
  }

  cancel(){
    this.commonMethod.cancel();
  }


  getanalyticsDtl(){
    this.formValidation.markFormGroupTouched(this.analyticsBOTForm);
    if (this.analyticsBOTForm.valid) {
      var formData = this.analyticsBOTForm.value;
      var param ={
        "fromdate" : formData.fromDate,
        "todate" : formData.toDate
      }
      this.getList(JSON.stringify(param));
    } else {
      this.formErrors = this.formValidation.validateForm(this.analyticsBOTForm, this.formErrors, false)
    }
  }

  getList(param){
    var req = 'transaction/getBotSurvey';
    this.commonServiceCall.postResponsePromise(req,param).subscribe(data => {
      console.log(data);
      if(data.status){
        this.botAnalytics = data.resp;
      }
      else{

      }
    })
  }

  //https://infrabotsdev.infrasofttech.com/UploadOffer/transaction/getBotSurvey
  //{"fromdate" : "2019-12-01", "todate" : "2020-05-18"}

}
