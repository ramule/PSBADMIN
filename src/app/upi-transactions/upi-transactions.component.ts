import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { UpiTransactionsService } from './upi-transactions.service';




@Component({
  selector: 'app-upi-transactions',
  templateUrl: './upi-transactions.component.html',
  styleUrls: ['./upi-transactions.component.css']
})
export class UpiTransactionsComponent implements OnInit {
  upiTransForm: FormGroup;
  toDateValid: boolean = false;
  todayDate:any;
  isToDateValidError:any = "";
  upiTransMaster: any = [];
  formErrors = {
    fromDate: '',
    toDate: '',
    channel:'',
    type:''
  }
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonMethod : CommonMethods,
    private appConstants: AppConstants,
    private upiTranservice: UpiTransactionsService,
    public datePipe: DatePipe,
    private commonDataService: CommonDataShareService
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "UPI Transactions";
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.buildForm();
  }

  public buildForm() {
    this.upiTransForm = this.form.group({
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
      channel: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
    });
    this.upiTransForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.upiTransForm, this.formErrors, true)
    });
  }

  onSubmitClicked() {
    this.formValidation.markFormGroupTouched(this.upiTransForm);

    if (this.upiTransForm.valid) {
      if(this.toDateValid){ return; }
      var formData = this.upiTransForm.value;
      this.upiTransMaster = [
        {
          "processing":'INFRA_TRANSACTION',
          "date":'2020-05-01',
          "transaction":'Completed',
          "rrn":'0020239494',
          "dc":'CR',
          "payer_add":'Mumbai',
          "payee_add":'Delhi',
          "payer_mob":'1111111111',
          "payee_mob":'9999999999',
          "payer_ifsc":'SBI000011',
          "type":'PAY',         
        },
        {
          "processing":'INFRA_TRANSACTION',
          "date":'2020-05-01',
          "transaction":'Completed',
          "rrn":'0020239494',
          "dc":'CR',
          "payer_add":'Mumbai',
          "payee_add":'Delhi',
          "payer_mob":'1111111111',
          "payee_mob":'9999999999',
          "payer_ifsc":'SBI000011',
          "type":'PAY',
        },
        {
          "processing":'INFRA_TRANSACTION',
          "date":'2020-05-01',
          "transaction":'Completed',
          "rrn":'0020239494',
          "dc":'CR',
          "payer_add":'Mumbai',
          "payee_add":'Delhi',
          "payer_mob":'1111111111',
          "payee_mob":'9999999999',
          "payer_ifsc":'SBI000011',
          "type":'PAY',
        },
        {
          "processing":'INFRA_TRANSACTION',
          "date":'2020-05-01',
          "transaction":'Completed',
          "rrn":'0020239494',
          "dc":'CR',
          "payer_add":'Mumbai',
          "payee_add":'Delhi',
          "payer_mob":'1111111111',
          "payee_mob":'9999999999',
          "payer_ifsc":'SBI000011',
          "type":'PAY',
        },
        {
          "processing":'INFRA_TRANSACTION',
          "date":'2020-05-01',
          "transaction":'Completed',
          "rrn":'0020239494',
          "dc":'CR',
          "payer_add":'Mumbai',
          "payee_add":'Delhi',
          "payer_mob":'1111111111',
          "payee_mob":'9999999999',
          "payer_ifsc":'SBI000011',
          "type":'PAY',
        },
      ];
      this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
    } else {
      this.formErrors = this.formValidation.validateForm(this.upiTransForm, this.formErrors, false)
    }
    this.commonMethod.destroyDataTable();
  }



  cancel(){
    this.commonMethod.cancel();
  }

}
