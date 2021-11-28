import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-agent-transactions',
  templateUrl: './agent-transactions.component.html',
  styleUrls: ['./agent-transactions.component.css']
})
export class AgentTransactionsComponent implements OnInit {

  p: number = 1;
  agentTransactionForm: FormGroup;
  formErrors = {
    mobileNo: '',
    currency: ''
  }

  agentTransaction:any =[];

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
  ) { }
  
  public buildForm() {
    this.agentTransactionForm = this.form.group({
      mobileNo: new FormControl('', [Validators.required]),
      currency: new FormControl('', [Validators.required])
    });
    this.agentTransactionForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.agentTransactionForm, this.formErrors, true)
    });
  }

  ngOnInit(){
    this.buildForm();
  }


  getTranscationDtl(){
    this.formValidation.markFormGroupTouched(this.agentTransactionForm);
    if (this.agentTransactionForm.valid) {
      var formData = this.agentTransactionForm.value;
      this.onTransactionDtlSaved(formData);

    } else {
      this.formErrors = this.formValidation.validateForm(this.agentTransactionForm, this.formErrors, false)
    }
  }


  onTransactionDtlSaved(param){
    var req = 'transaction/getTransactionsOfAgent/'+param.mobileNo+'/'+param.currency;
    this.commonServiceCall.postResponsePromise(req).subscribe(data => {
      console.log(data);
      if(data.status){
        this.agentTransaction = data.resp;
      }
      else{
        
      }
    })
  }


  //https://infrabotsdev.infrasofttech.com/UploadOffer/transaction/getTransactionsOfAgent/2200408004/INR ==post

}
