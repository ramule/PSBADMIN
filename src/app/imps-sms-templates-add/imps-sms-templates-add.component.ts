import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { DatePipe } from '@angular/common';
import { ImpsSmsTemplatesAddService } from './imps-sms-templates-add.service';



declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-imps-sms-templates-add',
  templateUrl: './imps-sms-templates-add.component.html',
  styleUrls: ['./imps-sms-templates-add.component.css']
})
export class ImpsSmsTemplatesAddComponent implements OnInit {
  showForm: boolean = false;
  smsAddForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    name: '',
    type: '',
    template:''
  }

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    public appConstant: AppConstants,
    public datePipe: DatePipe,
    private impsSMSddService: ImpsSmsTemplatesAddService
  ) { }

  public buildForm() {
    this.smsAddForm = this.form.group({
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      template: new FormControl('', [Validators.required]),
    });
    this.smsAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.smsAddForm, this.formErrors, true)
    });
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Add SMS Templates";
    this.buildForm();
  }

  addSMS()
  {
    this.formValidation.markFormGroupTouched(this.smsAddForm);
    if (this.smsAddForm.valid) {
      var formData = this.smsAddForm.value;
      //var param = this.adminWalletPointAddService.addAdminWalletPoint(formData);
      //this.saveWalletPoints(param)
    } else {
      this.formErrors = this.formValidation.validateForm(this.smsAddForm, this.formErrors, false)
    }
  }


  cancel() 
  {
      this.router.navigateByUrl("/impsSMS");
    }

}
