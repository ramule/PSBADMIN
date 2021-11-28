import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { ImpsEcollectionRequestLogService } from './imps-ecollection-request-log.service';


@Component({
  selector: 'app-imps-ecollection-request-log',
  templateUrl: './imps-ecollection-request-log.component.html',
  styleUrls: ['./imps-ecollection-request-log.component.css']
})
export class ImpsEcollectionRequestLogComponent implements OnInit {
  impsEcollectionLogForm: FormGroup;
  toDateValid: boolean = false;
  todayDate:any;
  isToDateValidError:any = "";
  ecollectionMaster: any = [];
  formErrors = {
    fromDate: '',
    toDate: '',
  }
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonMethod : CommonMethods,
    private appConstants: AppConstants,
    private impsEcollectionLogService: ImpsEcollectionRequestLogService,
    public datePipe: DatePipe,
    private commonDataService: CommonDataShareService
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "ECollection Request Log";
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.buildForm();
  }

  public buildForm() {
    this.impsEcollectionLogForm = this.form.group({
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
    });
    this.impsEcollectionLogForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.impsEcollectionLogForm, this.formErrors, true)
    });
  }

  onSubmitClicked() {
    this.formValidation.markFormGroupTouched(this.impsEcollectionLogForm);

    if (this.impsEcollectionLogForm.valid) {
      var formData = this.impsEcollectionLogForm.value;
      this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
      this.ecollectionMaster = [
        {
          "date": '2020-02-01',
          "code": '2',
          "acc_no": '3333333885',
          "vir_acc_no": "26018333",
          "amount": "100.00",
          "rrn": '5666355'
        },
        {
          "date": '2020-02-01',
          "code": '2',
          "acc_no": '3333333885',
          "vir_acc_no": "26018333",
          "amount": "100.00",
          "rrn": '5666355'
        },
        {
          "date": '2020-02-01',
          "code": '2',
          "acc_no": '3333333885',
          "vir_acc_no": "26018333",
          "amount": "100.00",
          "rrn": '5666355'
        },
        {
          "date": '2020-02-01',
          "code": '2',
          "acc_no": '3333333885',
          "vir_acc_no": "26018333",
          "amount": "100.00",
          "rrn": '5666355'
        },
      ];
    
    } else {
      this.formErrors = this.formValidation.validateForm(this.impsEcollectionLogForm, this.formErrors, false)
    }
    this.commonMethod.destroyDataTable();
  }

  onDateChange(value){
    if(value.fromDate != "" && value.toDate != ""){
      if(value.toDate < value.fromDate){
        console.log(value);
        this.toDateValid = true;
        this.isToDateValidError = "* From date can't be greater than to date";
        this.ecollectionMaster = [];
      }
      else{
        this.toDateValid = false;
        this.isToDateValidError = "";
      }
    }
  }

  cancel(){
    this.commonMethod.cancel();
  }

}
