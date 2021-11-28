import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { Location, TitleCasePipe, DatePipe } from '@angular/common';
import { AppConstants } from '../app-constants';
import { CommonMethods } from '../common-methods';
import { ImpsBcWebEditService } from './imps-bc-web-edit.service';




declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-imps-bc-web-edit',
  templateUrl: './imps-bc-web-edit.component.html',
  styleUrls: ['./imps-bc-web-edit.component.css']
})
export class ImpsBcWebEditComponent implements OnInit {

  bcwebEditForm: FormGroup;
  formErrors = {
    name:'',
    host:'',
    ftphost:'',
    ftpport:'',
    ftpuser:'',
    remotedir:''
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
    private impsBCWebEditService: ImpsBcWebEditService
  ) { }

 
  public buildForm() {
    this.bcwebEditForm = this.form.group({
      name: new FormControl('', [Validators.required]),
      host: new FormControl('', [Validators.required]),
      ftphost: new FormControl('', [Validators.required]),
      ftpport: new FormControl('', [Validators.required]),
      ftpuser: new FormControl('', [Validators.required]),
      remotedir: new FormControl('', [Validators.required])
    });
    this.bcwebEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.bcwebEditForm, this.formErrors, true)
    });
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Edit BC Web Server Details";
    this.buildForm();
    this.bcwebEditForm.patchValue({
      name:'IMPS-BC',
      host:'192.168.0.1',
      ftphost:'10.128.0.1',
      ftpport:'22',
      ftpuser:'IMPS',
      remotedir:'user/folder/imps'
    })
  }

  getStationsById()
  {
    // this.commonMethod.showLoader();
    // this.commonServiceCall.getResponsePromise(this.appConstant.getRewardPointsById + param).subscribe((result) => {

    // })


  }

  update(){
    this.formValidation.markFormGroupTouched(this.bcwebEditForm);
    if (this.bcwebEditForm.valid) {
      var formData = this.bcwebEditForm.value;
     // var param = this.adminWalletPointsEditService.adminWalletPointUpdateCall(formData, this.userId.id) ;
      //this.updateWalletPoint(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.bcwebEditForm, this.formErrors, false)
    }
  }

  cancel() {
    this.router.navigateByUrl('/impsBCWeb')
  }

}
