import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { Location, TitleCasePipe, DatePipe } from '@angular/common';
import { AppConstants } from '../app-constants';
import { CommonMethods } from '../common-methods';
import { ImpsStationsEditService } from './imps-stations-edit.service';



declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-imps-stations-edit',
  templateUrl: './imps-stations-edit.component.html',
  styleUrls: ['./imps-stations-edit.component.css']
})
export class ImpsStationsEditComponent implements OnInit {

  stationsEditForm: FormGroup;
  formErrors = {
    name: '',
    type: '',
    signedon:'',
    connected:''
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
    private impsStationsEditService: ImpsStationsEditService
  ) { }

 
  public buildForm() {
    this.stationsEditForm = this.form.group({
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      signedon: new FormControl('', [Validators.required]),
      connected: new FormControl('', [Validators.required]),
    });
    this.stationsEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.stationsEditForm, this.formErrors, true)
    });
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Edit Stations";
    this.buildForm();
    this.stationsEditForm.patchValue({
        name:'b24',
        type:'DS',
        signedon:'Y',
        connected:'N'
    })
  }

  getStationsById()
  {
    // this.commonMethod.showLoader();
    // this.commonServiceCall.getResponsePromise(this.appConstant.getRewardPointsById + param).subscribe((result) => {

    // })

    this.stationsEditForm.patchValue({
      key: '@',
      value: 'www',
    })
  }

  update(){
    this.formValidation.markFormGroupTouched(this.stationsEditForm);
    if (this.stationsEditForm.valid) {
      var formData = this.stationsEditForm.value;
     // var param = this.adminWalletPointsEditService.adminWalletPointUpdateCall(formData, this.userId.id) ;
      //this.updateWalletPoint(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.stationsEditForm, this.formErrors, false)
    }
  }

  cancel() {
    this.router.navigateByUrl('/impsStations')
  }

}
