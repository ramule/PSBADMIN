import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { Location, TitleCasePipe, DatePipe } from '@angular/common';
import { AppConstants } from '../app-constants';
import { CommonMethods } from '../common-methods';

import { ImpsTransFeeStructureEditService } from './imps-trans-fee-structure-edit.service';




declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-imps-trans-fee-structure-edit',
  templateUrl: './imps-trans-fee-structure-edit.component.html',
  styleUrls: ['./imps-trans-fee-structure-edit.component.css']
})
export class ImpsTransFeeStructureEditComponent implements OnInit {

  transFeeEditForm: FormGroup;
  formErrors = {
    version: '',
    acc: '',
    transtype:'',
  }




  userId: any;
  remarkHistoryArr :any=[];


  roleId: any;
  selModel: any;
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private location: Location,
    public appConstant : AppConstants,
    private commonMethod : CommonMethods,
    public titlecasePipe : TitleCasePipe,
    public datePipe: DatePipe,
    private impsStationsEditService: ImpsTransFeeStructureEditService
  ) { }

 
  public buildForm() {
    this.transFeeEditForm = this.form.group({
      version: new FormControl('', [Validators.required]),
      acc: new FormControl('', [Validators.required]),
      transtype: new FormControl('', [Validators.required]),
    });
    this.transFeeEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.transFeeEditForm, this.formErrors, true)
    });
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Edit Transaction Fee Structures";
    this.buildForm();
    this.transFeeEditForm.patchValue({
        version:'2',
        acc:'Remitter',
        transtype:'Y',
    })
  }

  getStationsById()
  {
    // this.commonMethod.showLoader();
    // this.commonServiceCall.getResponsePromise(this.appConstant.getRewardPointsById + param).subscribe((result) => {

    // })


  }

  update(){
    this.formValidation.markFormGroupTouched(this.transFeeEditForm);
    if (this.transFeeEditForm.valid) {
      var formData = this.transFeeEditForm.value;
     // var param = this.adminWalletPointsEditService.adminWalletPointUpdateCall(formData, this.userId.id) ;
      //this.updateWalletPoint(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.transFeeEditForm, this.formErrors, false)
    }
  }

  cancel() {
    this.router.navigateByUrl('/impsTransFee')
  }


}
