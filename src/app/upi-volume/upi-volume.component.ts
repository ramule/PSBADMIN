import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { UpiVolumeService } from "./upi-volume.service";




@Component({
  selector: 'app-upi-volume',
  templateUrl: './upi-volume.component.html',
  styleUrls: ['./upi-volume.component.css']
})
export class UpiVolumeComponent implements OnInit {
  upiVolumeForm: FormGroup;
  toDateValid: boolean = false;
  todayDate:any;
  isToDateValidError:any = "";
  upiVolumeMaster: any = [];
  formErrors = {
    period: '',
    start: '',
    end:'',
    txn_type:'',
    sub_type:'',
    merchant_type:'',
  }
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonMethod : CommonMethods,
    private appConstants: AppConstants,
    private upiVolumeervice: UpiVolumeService,
    public datePipe: DatePipe,
    private commonDataService: CommonDataShareService
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "UPI Volume Report";
   // this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.buildForm();

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

  onSubmitClicked() {
    this.formValidation.markFormGroupTouched(this.upiVolumeForm);

    if (this.upiVolumeForm.valid) {
      if(this.toDateValid){ return; }
      var formData = this.upiVolumeForm.value;
      this.upiVolumeMaster = [
        {
          "period":"Sep-2020",
          "approved":"450",
          "bd":"25",
          "td":"25",
          "total":"500",
          "approved_per":"90%",
          "bd_per":"5%",
          "td_per":"5%",        
        },
        {
           "period":"Sep-2020",
          "approved":"450",
          "bd":"25",
          "td":"25",
          "total":"500",
          "approved_per":"90%",
          "bd_per":"5%",
          "td_per":"5%", 
        },
        {
           "period":"Sep-2020",
          "approved":"450",
          "bd":"25",
          "td":"25",
          "total":"500",
          "approved_per":"90%",
          "bd_per":"5%",
          "td_per":"5%", 
        },
        {
           "period":"Sep-2020",
          "approved":"450",
          "bd":"25",
          "td":"25",
          "total":"500",
          "approved_per":"90%",
          "bd_per":"5%",
          "td_per":"5%", 
        },
        {
           "period":"Sep-2020",
          "approved":"450",
          "bd":"25",
          "td":"25",
          "total":"500",
          "approved_per":"90%",
          "bd_per":"5%",
          "td_per":"5%", 
        },
      ];
      this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
    } else {
      this.formErrors = this.formValidation.validateForm(this.upiVolumeForm, this.formErrors, false)
    }
    this.commonMethod.destroyDataTable();
  }



  cancel(){
    this.commonMethod.cancel();
  }

}
