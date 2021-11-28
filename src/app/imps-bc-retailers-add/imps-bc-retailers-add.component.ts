import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { DatePipe } from '@angular/common';
import { ImpsBcRetailersAddService } from './imps-bc-retailers-add.service';



declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-imps-bc-retailers-add',
  templateUrl: './imps-bc-retailers-add.component.html',
  styleUrls: ['./imps-bc-retailers-add.component.css']
})
export class ImpsBcRetailersAddComponent implements OnInit {
  showForm: boolean = false;
  retailersAddForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    name: '',
    bc: '',
    code:'',
    account:''
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
    private impsRetailersAddService: ImpsBcRetailersAddService
  ) { }

  public buildForm() {
    this.retailersAddForm = this.form.group({
      name: new FormControl('', [Validators.required]),
      bc: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      account: new FormControl('', [Validators.required]),
    });
    this.retailersAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.retailersAddForm, this.formErrors, true)
    });
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Add BC Retailers";
    this.buildForm();
  }

  addStations()
  {
    this.formValidation.markFormGroupTouched(this.retailersAddForm);
    if (this.retailersAddForm.valid) {
      var formData = this.retailersAddForm.value;
      //var param = this.adminWalletPointAddService.addAdminWalletPoint(formData);
      //this.saveWalletPoints(param)
    } else {
      this.formErrors = this.formValidation.validateForm(this.retailersAddForm, this.formErrors, false)
    }
  }


  cancel() 
  {
      this.router.navigateByUrl("/impsBCRetailers");
    }

}
