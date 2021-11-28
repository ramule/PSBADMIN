import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { DatePipe } from '@angular/common';
import { ImpsBcWebAddService } from './imps-bc-web-add.service';


declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-imps-bc-web-add',
  templateUrl: './imps-bc-web-add.component.html',
  styleUrls: ['./imps-bc-web-add.component.css']
})
export class ImpsBcWebAddComponent implements OnInit {
  showForm: boolean = false;
  bcwebAddForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    name:'',
    host:'',
    ftphost:'',
    ftpport:'',
    ftpuser:'',
    remotedir:''
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
    private impsStationAddService: ImpsBcWebAddService
  ) { }

  public buildForm() {
    this.bcwebAddForm = this.form.group({
      host: new FormControl('', [Validators.required]),
      ftphost: new FormControl('', [Validators.required]),
      ftpport: new FormControl('', [Validators.required]),
      ftpuser: new FormControl('', [Validators.required]),
      remotedir: new FormControl('', [Validators.required])
    });
    this.bcwebAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.bcwebAddForm, this.formErrors, true)
    });
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Add BC Web Server Details";
    this.buildForm();
  }

  addBCWeb()
  {
    this.formValidation.markFormGroupTouched(this.bcwebAddForm);
    if (this.bcwebAddForm.valid) {
      var formData = this.bcwebAddForm.value;
      //var param = this.adminWalletPointAddService.addAdminWalletPoint(formData);
      //this.saveWalletPoints(param)
    } else {
      this.formErrors = this.formValidation.validateForm(this.bcwebAddForm, this.formErrors, false)
    }
  }


  cancel() 
  {
      this.router.navigateByUrl("/impsStations");
    }

}
