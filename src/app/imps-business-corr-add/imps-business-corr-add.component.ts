import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { DatePipe } from '@angular/common';
import { ImpsBusinessCorrAddService } from './imps-business-corr-add.service';


declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-imps-business-corr-add',
  templateUrl: './imps-business-corr-add.component.html',
  styleUrls: ['./imps-business-corr-add.component.css']
})
export class ImpsBusinessCorrAddComponent implements OnInit {
  showForm: boolean = false;
  BCCorrAddForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    name:'',
    address:'',
    bcid:'',
    mobile:'',
    mmid:'',
    add1:'',
    add2:'',
    state:'',
    city:'',
    zip:'',
    country:'',
    contact:'',
    email:'', 
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
    private impsBCCorrddService: ImpsBusinessCorrAddService
  ) { }

  public buildForm() {
    this.BCCorrAddForm = this.form.group({
      name:new FormControl('', [Validators.required]),
      address:new FormControl('', [Validators.required]),
      bcid:new FormControl('', [Validators.required]),
      mobile:new FormControl('', [Validators.required]),
      mmid:new FormControl('', [Validators.required]),
      add1:new FormControl('', [Validators.required]),
      add2:new FormControl('', [Validators.required]),
      state:new FormControl('', [Validators.required]),
      city:new FormControl('', [Validators.required]),
      zip:new FormControl('', [Validators.required]),
      country:new FormControl('', [Validators.required]),
      contact:new FormControl('', [Validators.required]),
      email:new FormControl('', [Validators.required]), 
    });
    this.BCCorrAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.BCCorrAddForm, this.formErrors, true)
    });
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Add Business Correspondents";
    this.buildForm();
  }

  addBCCorr()
  {
    this.formValidation.markFormGroupTouched(this.BCCorrAddForm);
    if (this.BCCorrAddForm.valid) {
      var formData = this.BCCorrAddForm.value;
      //var param = this.adminWalletPointAddService.addAdminWalletPoint(formData);
      //this.saveWalletPoints(param)
    } else {
      this.formErrors = this.formValidation.validateForm(this.BCCorrAddForm, this.formErrors, false)
    }
  }


  cancel() 
  {
      this.router.navigateByUrl("/impsBCCorr");
    }
  
}
