import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { UpiVolumeDetailsService } from './upi-volume-details.service';

@Component({
  selector: 'app-upi-volume-details',
  templateUrl: './upi-volume-details.component.html',
  styleUrls: ['./upi-volume-details.component.css']
})
export class UpiVolumeDetailsComponent implements OnInit {
  upiVolumeForm: FormGroup;
  toDateValid: boolean = false;
  todayDate:any;
  date: any;
  isToDateValidError:any = "";
  upiVolumeMaster: any = [];
  formErrors = {
    period: '',
    selDate: '',
    approvedTxnCnt: '',
    bdTxnCnt: '',
    tdTxnCnt: '',
  }
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonMethod : CommonMethods,
    private appConstants: AppConstants,
    private upiDetailservice: UpiVolumeDetailsService,
    public datePipe: DatePipe,
    private commonDataService: CommonDataShareService
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "UPI Volume Report";
    this.date = new Date();
    this.todayDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.buildForm();

    setTimeout(() => {
      this.getTxnVolumeDetailsData();
    }, 1000);

    $.ajax({
      url: "assets/font-awesome.min.css",
      dataType: "text",
      success: function(cssText) {
          // cssText will be a string containing the text of the file
          console.log(cssText)
      }
  });
  }

  public buildForm() {
    this.upiVolumeForm = this.form.group({
      period: new FormControl('', [Validators.required]),
      start: new FormControl('', [Validators.required]),
      end:new FormControl('', [Validators.required]),
      txn_type:new FormControl('', [Validators.required]),
      sub_type:new FormControl('', [Validators.required]),
      merchant_type:new FormControl('', [Validators.required]),
    });
    this.upiVolumeForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.upiVolumeForm, this.formErrors, true)
    });
  }

  getTxnVolumeDetailsData() {
    this.upiVolumeMaster = [
      {
        "decline_type":"BD",
        "response_code":"91",
        "error_code":"91",
        "description":"NO RESPONSE FROM CRS",
        "transaction_count":"5"
      },
      {
        "decline_type":"BD",
        "response_code":"91",
        "error_code":"91",
        "description":"NO RESPONSE FROM CRS",
        "transaction_count":"5"
      },{
        "decline_type":"BD",
        "response_code":"91",
        "error_code":"91",
        "description":"NO RESPONSE FROM CRS",
        "transaction_count":"5"
      },{
        "decline_type":"BD",
        "response_code":"91",
        "error_code":"91",
        "description":"NO RESPONSE FROM CRS",
        "transaction_count":"5"
      },{
        "decline_type":"BD",
        "response_code":"91",
        "error_code":"91",
        "description":"NO RESPONSE FROM CRS",
        "transaction_count":"5"
      },
    ];
    this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
  }

  cancel(){
    this.commonMethod.cancel();
  }

}
