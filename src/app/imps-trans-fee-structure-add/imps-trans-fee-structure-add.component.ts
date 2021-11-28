import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { DatePipe } from '@angular/common';
import { ImpsTransFeeStructureAddService } from './imps-trans-fee-structure-add.service';



declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-imps-trans-fee-structure-add',
  templateUrl: './imps-trans-fee-structure-add.component.html',
  styleUrls: ['./imps-trans-fee-structure-add.component.css']
})
export class ImpsTransFeeStructureAddComponent implements OnInit {
  showForm: boolean = false;
  transFeeAddForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    version: '',
    acc: '',
    transtype:'',
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
    private impsStationAddService: ImpsTransFeeStructureAddService
  ) { }

  public buildForm() {
    this.transFeeAddForm = this.form.group({
      version: new FormControl('', [Validators.required]),
      acc: new FormControl('', [Validators.required]),
      transtype: new FormControl('', [Validators.required]),
    });
    this.transFeeAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.transFeeAddForm, this.formErrors, true)
    });
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Add Transaction Fee Structures";
    this.buildForm();
  }

  addTransFee()
  {
    this.formValidation.markFormGroupTouched(this.transFeeAddForm);
    if (this.transFeeAddForm.valid) {
      var formData = this.transFeeAddForm.value;
      //var param = this.adminWalletPointAddService.addAdminWalletPoint(formData);
      //this.saveWalletPoints(param)
    } else {
      this.formErrors = this.formValidation.validateForm(this.transFeeAddForm, this.formErrors, false)
    }
  }


  cancel() 
  {
      this.router.navigateByUrl("/impsTransFee");
    }

}
