import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { DatePipe } from '@angular/common';
import { ImpsStationsAddService } from './imps-stations-add.service';


declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-imps-stations-add',
  templateUrl: './imps-stations-add.component.html',
  styleUrls: ['./imps-stations-add.component.css']
})
export class ImpsStationsAddComponent implements OnInit {
  showForm: boolean = false;
  stationsAddForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    name: '',
    type: '',
    signedon:'',
    connected:''
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
    private impsStationAddService: ImpsStationsAddService
  ) { }

  public buildForm() {
    this.stationsAddForm = this.form.group({
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      signedon: new FormControl('', [Validators.required]),
      connected: new FormControl('', [Validators.required]),
    });
    this.stationsAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.stationsAddForm, this.formErrors, true)
    });
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Add Stations";
    this.buildForm();
  }

  addStations()
  {
    this.formValidation.markFormGroupTouched(this.stationsAddForm);
    if (this.stationsAddForm.valid) {
      var formData = this.stationsAddForm.value;
      //var param = this.adminWalletPointAddService.addAdminWalletPoint(formData);
      //this.saveWalletPoints(param)
    } else {
      this.formErrors = this.formValidation.validateForm(this.stationsAddForm, this.formErrors, false)
    }
  }


  cancel() 
  {
      this.router.navigateByUrl("/impsStations");
    }
  

}
