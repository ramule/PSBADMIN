import { Component, OnInit } from '@angular/core';


import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
declare var showToastMessage: any;

@Component({
  selector: 'app-admin-charges-commission-edit',
  templateUrl: './admin-charges-commission-edit.component.html',
  styleUrls: ['./admin-charges-commission-edit.component.css']
})
export class AdminChargesCommissionEditComponent implements OnInit {

  showForm: boolean = false;
  chargesEditForm: FormGroup;
  formErrors = {
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
    private location: Location
  ) { }


  public buildForm() {
    this.chargesEditForm = this.form.group({
      minAmt: new FormControl('', [Validators.required]),
      maxAmt: new FormControl('', [Validators.required]),
      chargesValue: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
    this.chargesEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.chargesEditForm, this.formErrors, true)
    });
  }

  ngOnInit() {
    this.userId = this.location.getState();
    this.buildForm();
    this.loadChargeDtls(this.userId.id);
  }


  loadChargeDtls(id){
    var req = 'corporateUser/getChargesMasterByid/'+id;
    this.commonServiceCall.getResponsePromise(req).subscribe(data => {
      if (data.status) {
        this.selectedUser = data.resp;
        console.log(this.selectedUser);
        this.chargesEditForm.patchValue({
          minAmt: data.resp.min_amount,
          maxAmt: data.resp.max_amount,
          chargesValue: data.resp.charges_val,
          type: data.resp.type_p_f,
          status: data.resp.statusid
        })
      }
      else {

      }

    })
  }


  saveMaster() {
    this.formValidation.markFormGroupTouched(this.chargesEditForm);
    if (this.chargesEditForm.valid) {
      var formData = this.chargesEditForm.value;
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
      this.formErrors = this.formValidation.validateForm(this.chargesEditForm, this.formErrors, false)
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


  //https://infrabotsdev.infrasofttech.com/UploadOffer/corporateUser/updateCharegseMaster
  //{"min_amount" : "1000","id" : "40", "statusid" : "3", "createdby" : "3", "max_amount" : "2000","charges_val" : "5","type_p_f" : "P"}

}
