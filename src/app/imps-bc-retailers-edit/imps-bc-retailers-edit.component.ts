import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { Location, TitleCasePipe, DatePipe } from '@angular/common';
import { AppConstants } from '../app-constants';
import { CommonMethods } from '../common-methods';
import { ImpsBcRetailersEditService } from './imps-bc-retailers-edit.service';




declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-imps-bc-retailers-edit',
  templateUrl: './imps-bc-retailers-edit.component.html',
  styleUrls: ['./imps-bc-retailers-edit.component.css']
})
export class ImpsBcRetailersEditComponent implements OnInit {

  retailersEditForm: FormGroup;
  formErrors = {
    name: '',
    bc: '',
    code:'',
    account:''
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
    private impsRetailersEditService: ImpsBcRetailersEditService
  ) { }

 
  public buildForm() {
    this.retailersEditForm = this.form.group({
      name: new FormControl('', [Validators.required]),
      bc: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      account: new FormControl('', [Validators.required]),
    });
    this.retailersEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.retailersEditForm, this.formErrors, true)
    });
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Edit Stations";
    this.buildForm();
    this.retailersEditForm.patchValue({
      bc:'test 1',
      name:'PBT test2',
      code:'Mango',
      account:'3456789'
    })
  }

  getStationsById()
  {
    // this.commonMethod.showLoader();
    // this.commonServiceCall.getResponsePromise(this.appConstant.getRewardPointsById + param).subscribe((result) => {

    // })


  }

  update(){
    this.formValidation.markFormGroupTouched(this.retailersEditForm);
    if (this.retailersEditForm.valid) {
      var formData = this.retailersEditForm.value;
     // var param = this.adminWalletPointsEditService.adminWalletPointUpdateCall(formData, this.userId.id) ;
      //this.updateWalletPoint(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.retailersEditForm, this.formErrors, false)
    }
  }

  cancel() {
    this.router.navigateByUrl('/impsBCRetailers')
  }

}
