import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CommonMethods } from '../common-methods';
declare var showToastMessage: any;

@Component({
  selector: 'app-admin-charges-commission-add',
  templateUrl: './admin-charges-commission-add.component.html',
  styleUrls: ['./admin-charges-commission-add.component.css']
})
export class AdminChargesCommissionAddComponent implements OnInit {

  showForm: boolean = false;
  chargesAddForm: FormGroup;
  formErrors = {
    types: '',
    minAmt: '',
    maxAmt: '',
    chargesValue: '',
    type: '',
    status: ''
  }


  //feild parameter
  selectedUser = [];
  userId: any;
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private location: Location,
    public commonMethod : CommonMethods
  ) { }


  public buildForm() {
    this.chargesAddForm = this.form.group({
      types: new FormControl('', [Validators.required]),
      minAmt: new FormControl('', [Validators.required]),
      maxAmt: new FormControl('', [Validators.required]),
      chargesValue: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
    this.chargesAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.chargesAddForm, this.formErrors, true)
    });
  }

  ngOnInit() {
    this.userId = this.location.getState();
    this.buildForm();
  }

  
  cancelClick(){
    this.router.navigateByUrl('/adminChargesComminsion');
  }


  saveMaster() {
    this.formValidation.markFormGroupTouched(this.chargesAddForm);
    if (this.chargesAddForm.valid) {
      var formData = this.chargesAddForm.value;
      var userDetails = JSON.parse(this.commonServiceCall.userCredential);
      var param = {
        "min_amount" : formData.minAmt, 
        "statusid" : formData.status, 
        "createdby" : userDetails.user_ID, 
        "max_amount" : formData.maxAmt,
        "charges_val" : formData.chargesValue,
        "type_p_f" : formData.type,
        "type" : formData.types
      }
      this.addChargesMaster(JSON.stringify(param));
    } else {
      this.formErrors = this.formValidation.validateForm(this.chargesAddForm, this.formErrors, false)
    }

  }
  cancel() {
    this.router.navigateByUrl("/adminChargesComminsion");
  }

  addChargesMaster(param) {
    var req = 'corporateUser/addChargesMaster';
    this.commonServiceCall.postResponsePromise(req, param).subscribe(data => {
      if (data.status) {
        //wallet points details has been updated
        this.router.navigateByUrl("/adminChargesComminsion");
      }
      else {

      }

    })
  }


  //https://infrabotsdev.infrasofttech.com/UploadOffer/corporateUser/addChargesMaster
  //{"min_amount" : "10", "statusid" : "3", "createdby" : "3", "max_amount" : "100","charges_val" : "20","type_p_f" : "TEST","type" : "CO"}
}
