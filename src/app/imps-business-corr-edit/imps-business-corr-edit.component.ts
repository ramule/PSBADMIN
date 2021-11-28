import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { Location, TitleCasePipe, DatePipe } from '@angular/common';
import { AppConstants } from '../app-constants';
import { CommonMethods } from '../common-methods';
import { ImpsBusinessCorrEditService } from './imps-business-corr-edit.service';




declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-imps-business-corr-edit',
  templateUrl: './imps-business-corr-edit.component.html',
  styleUrls: ['./imps-business-corr-edit.component.css']
})
export class ImpsBusinessCorrEditComponent implements OnInit {

  bcCorrEditForm: FormGroup;
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
    private impsBCCorrEditService: ImpsBusinessCorrEditService
  ) { }

 
  public buildForm() {
    this.bcCorrEditForm = this.form.group({
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
    this.bcCorrEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.bcCorrEditForm, this.formErrors, true)
    });
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Edit Business Correspondents";
    this.buildForm();
    this.bcCorrEditForm.patchValue({
      name:'Vikrant',
      address:'abc',
      bcid:'123',
      mobile:'987654310',
      mmid:'45',
      add1:'abc',
      add2:'xyz',
      state:'Maharashtra',
      city:'Mumbai',
      zip:'400056',
      country:'India',
      contact:'9876543210',
      email:'abc@gmail.com', 
    })
  }

  getStationsById()
  {
    // this.commonMethod.showLoader();
    // this.commonServiceCall.getResponsePromise(this.appConstant.getRewardPointsById + param).subscribe((result) => {

    // })


  }

  update(){
    this.formValidation.markFormGroupTouched(this.bcCorrEditForm);
    if (this.bcCorrEditForm.valid) {
      var formData = this.bcCorrEditForm.value;
     // var param = this.adminWalletPointsEditService.adminWalletPointUpdateCall(formData, this.userId.id) ;
      //this.updateWalletPoint(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.bcCorrEditForm, this.formErrors, false)
    }
  }

  cancel() {
    this.router.navigateByUrl('/impsBCCorr')
  }

}
