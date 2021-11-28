import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { DatePipe } from '@angular/common';
import { ImpsEcollectionAddService } from './imps-ecollection-add.service';




declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;


@Component({
  selector: 'app-imps-ecollection-add',
  templateUrl: './imps-ecollection-add.component.html',
  styleUrls: ['./imps-ecollection-add.component.css']
})
export class ImpsEcollectionAddComponent implements OnInit {
  showForm: boolean = false;
  reportsAddForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    code:'',
    name:'',
    nbin:'',
    ifsc:'',
    acc_no:'',
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
    private impsEcollectionAddService: ImpsEcollectionAddService
  ) { }

  public buildForm() {
    this.reportsAddForm = this.form.group({
      code:new FormControl('', [Validators.required]),
      name:new FormControl('', [Validators.required]),
      nbin:new FormControl('', [Validators.required]),
      ifsc:new FormControl('', [Validators.required]),
      acc_no:new FormControl('', [Validators.required]),
    });
    this.reportsAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.reportsAddForm, this.formErrors, true)
    });
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Add ECollection Configuration";
    this.buildForm();
  }

  addEcollection()
  {
    this.formValidation.markFormGroupTouched(this.reportsAddForm);
    if (this.reportsAddForm.valid) {
      var formData = this.reportsAddForm.value;
      //var param = this.adminWalletPointAddService.addAdminWalletPoint(formData);
      //this.saveWalletPoints(param)
    } else {
      this.formErrors = this.formValidation.validateForm(this.reportsAddForm, this.formErrors, false)
    }
  }


  cancel() 
  {
      this.router.navigateByUrl("/impsEcollection");
    }
  

}
