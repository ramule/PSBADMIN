import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
declare var showToastMessage: any;

@Component({
  selector: 'app-register-branch-registration-edit',
  templateUrl: './register-branch-registration-edit.component.html',
  styleUrls: ['./register-branch-registration-edit.component.css']
})
export class RegisterBranchRegistrationEditComponent implements OnInit {

  branchRegEditForm: FormGroup;
  branchRegVerifyOtpForm:FormGroup;
  formErrors = {
    custName:'',
    mobile: '',
    email:'',
    createdOn: '',
    dob:'',
    status:''
  }
  formErrorsOtp = {
    otp: ''
  }


  status = [];
  regDtl :any;
  regId:any;
  formData:any;
  showOtp : boolean = false;

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonData: CommonDataShareService,
    private location: Location
  ) { }


  public buildForm() {
    this.branchRegEditForm = this.form.group({
      custName: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      email:new FormControl('', [Validators.required]),
      createdOn: new FormControl('', [Validators.required]),
      dob:new FormControl('', [Validators.required]),
      status:new FormControl('', [Validators.required])
    });
    this.branchRegEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.branchRegEditForm, this.formErrors, true)
    });

    this.branchRegVerifyOtpForm = this.form.group({
      otp: new FormControl('', [Validators.required])
    });
    this.branchRegVerifyOtpForm.valueChanges.subscribe((data) => {
      this.formErrorsOtp = this.formValidation.validateForm(this.branchRegVerifyOtpForm, this.formErrorsOtp, true)
    });
  }


  ngOnInit() {
    this.regId = this.location.getState(); 
    this.buildForm();
    this.getStatus();
    this.getRegDtlById(this.regId.id);
  }

  //on page load
  getStatus(){
    var req = 'message/getStatus';
    this.commonServiceCall.getResponsePromise(req).subscribe(data => {
      if(data.status){
        this.status = data.resp;
      }
      else{

      }

    })
  }

  getRegDtlById(id){
    var req = 'wallet/getBranchRegistrationsById/'+id;
    this.commonServiceCall.getResponsePromise(req).subscribe(data => {
      if(data.status){
        var statusId 
        this.status.forEach(e=>{
          if(e.shortname == data.resp[0].STATUSNAME){
            statusId = e.id
          }
        })
        this.regDtl = data.resp;
        this.branchRegEditForm.patchValue({
          custName: data.resp[0].CUSTOMERNAME,
          mobile: data.resp[0].MOBILE,
          email: data.resp[0].EMAIL,
          createdOn: data.resp[0].CREATEDON,
          dob: data.resp[0].DOB,
          status: statusId
        })
      }
      else{

      }

    })
  }

  update(){
    this.formValidation.markFormGroupTouched(this.branchRegEditForm);
    if (this.branchRegEditForm.valid) {
      this.formData = this.branchRegEditForm.value;
      var param = {
        "id": this.regId.id,
        "customerName" : this.formData.custName, 
        "mobileNumber" : this.formData.mobile,
        "emailofCust" : this.formData.email
      }
      this.updateBranchReg(JSON.stringify(param),this.formData.mobile);
    } else {
      this.formErrors = this.formValidation.validateForm(this.branchRegEditForm, this.formErrors, false)
    }
  }

  gotoBranchReg(){
    this.router.navigateByUrl("/regBranchReg");
  }

  updateBranchReg(param,mobile){
    var req = 'wallet/generateTokenService/'+mobile;
    this.commonServiceCall.postResponsePromise(req, param).subscribe(data => {
      console.log(data);
      if (data.status) {
        this.showOtp = true;
      }
      else {
        showToastMessage("Master Update Error");
      }

    })
  }

  verifyOtp(){
    this.formValidation.markFormGroupTouched(this.branchRegVerifyOtpForm);
    if (this.branchRegVerifyOtpForm.valid) {
      var param = {
        "id": this.regId.id,
        "customerName" : this.formData.custName, 
        "mobileNumber" : this.formData.mobile,
        "emailofCust" : this.formData.email
      }
      this.validateOtp(JSON.stringify(param),this.formData.mobile,this.branchRegVerifyOtpForm.value.otp);
    } else {
      this.formErrorsOtp = this.formValidation.validateForm(this.branchRegVerifyOtpForm, this.formErrorsOtp, false)
    }
  }

  validateOtp(param,mobile,otp){
    var req = 'wallet/validateOtpService/'+otp+'/'+mobile;
    this.commonServiceCall.postResponsePromise(req, param).subscribe(data => {
      console.log(data);
      if (data.status) {
        showToastMessage("Master Has Been Updated Successfully");
        this.router.navigateByUrl("/regBranchReg");
      }
      else {
        showToastMessage("Master Update Error");
      }

    })
  }

  callBackFunction(){
    
  }


  //https://infrabotsdev.infrasofttech.com/UploadOffer/wallet/generateTokenService/8787878787
  //{"id" : "9777", "customerName" : "sarfeeeee", "mobileNumber" : "8787878787","emailofCust" : "sarf.eee@gmail.com"}

  //https://infrabotsdev.infrasofttech.com/UploadOffer/wallet/validateOtpService/1234/8787878787
  //{"id" : "9777", "customerName" : "sarfeeeee", "mobileNumber" : "8787878787","emailofCust" : "sarf.eee@gmail.com"}


  alphaNumericOnly(event){
    var inp = String.fromCharCode(event.keyCode);
    if(/[a-zA-Z0-9-_ ]/.test(inp)){
      return true;
    }
    else{
      event.preventDefault();
      return false;
    }
  }
}
