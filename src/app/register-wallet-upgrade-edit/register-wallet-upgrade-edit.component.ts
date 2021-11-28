import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
declare var showToastMessage: any;

@Component({
  selector: 'app-register-wallet-upgrade-edit',
  templateUrl: './register-wallet-upgrade-edit.component.html',
  styleUrls: ['./register-wallet-upgrade-edit.component.css']
})
export class RegisterWalletUpgradeEditComponent implements OnInit {

  walletUpgradeForm: FormGroup;
  formErrors = {
    custName:'',
    mobile: '',
    email:'',
    ticketRefNo: '',
    remark:'',
    status:''
  }


  status = [];
  walletDtl :any;
  walletId:any;

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonData: CommonDataShareService,
    private location: Location
  ) { }


  public buildForm() {
    this.walletUpgradeForm = this.form.group({
      custName: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required,Validators.minLength(8),Validators.maxLength(10)]),
      email:new FormControl('', [Validators.required,Validators.email, Validators.minLength(6), Validators.maxLength(40), Validators.pattern(/^[a-z]+[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,6}$/)]),
      ticketRefNo: new FormControl('', [Validators.required]),
      remark:new FormControl('', [Validators.required]),
      status:new FormControl('', [Validators.required])
    });
    this.walletUpgradeForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.walletUpgradeForm, this.formErrors, true)
    });
  }


  ngOnInit() {
    this.walletId = this.location.getState();
    this.buildForm();
    this.getStatus();
    this.getRegDtlById(this.walletId.id);
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
    var req = 'wallet/getWalletById/'+id;
    this.commonServiceCall.getResponsePromise(req).subscribe(data => {
      if(data.status){
        this.walletDtl = data.resp;
        this.walletUpgradeForm.patchValue({
          custName: data.resp[0].customername,
          mobile: data.resp[0].mobile,
          email: data.resp[0].emailofcust,
          ticketRefNo: data.resp[0].resolution,
          remark: data.resp[0].description,
          status: data.resp[0].channelid
        })
      }
      else{

      }

    })
  }

  update(){
    this.formValidation.markFormGroupTouched(this.walletUpgradeForm);
    if (this.walletUpgradeForm.valid) {
      var formData = this.walletUpgradeForm.value;
      var param = {
        "id": this.walletId.id,
        "customerName" : formData.custName, 
        "mobileNumber" : formData.mobile,
        "emailofCust" : formData.email,
        "resolution": formData.ticketRefNo,
        "description": formData.remark,
        "statusid":formData.status,
        "assignto": "BranchChecker"
      }
      this.updateBranchReg(JSON.stringify(param),formData.ticketRefNo,formData.mobile);
    } else {
      this.formErrors = this.formValidation.validateForm(this.walletUpgradeForm, this.formErrors, false)
    }
  }

  gotoWalletUpgrade(){
    this.router.navigateByUrl("/regWalletUpgrade");
  }

  updateBranchReg(param,regId,mobile){
    var req = 'wallet/upgradeWallettoMobile/'+regId+'/'+mobile;
    this.commonServiceCall.postResponsePromise(req, param).subscribe(data => {
      console.log(data);
      if (data.status) {
        showToastMessage("Master Has Been Updated Successfully");
        this.router.navigateByUrl("/regWalletUpgrade");
      }
      else {
        showToastMessage("Master Update Error");
      }

    })
  }

  callBackFunction(){
    
  }

  //https://infrabotsdev.infrasofttech.com/UploadOffer/wallet/upgradeWallettoMobile/1566372866635/98199740
  //{"id" : "623", "customerName" : "Anand Muthye", "mobileNumber" : "98199740","emailofCust" : "anand.muthye@infrasofttech.com","resolution" : "1566372866635","description" : "customer Anand Muthye has requested for upgrade to bank customer from wallet 00XXXXXXXX10 with accountNumber 007360500 and nationalId tatagagvv","statusid" : "3","assignto" : "BranchChecker"}

}
