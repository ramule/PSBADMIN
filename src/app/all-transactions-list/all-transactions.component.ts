import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { DatePipe } from '@angular/common';
declare var $:any;
declare var showToastMessage: any;
declare var jQuery:any;
@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.css']
})
export class AllTranscationListComponent implements OnInit {

  allTransactionForm: FormGroup;
  formErrors = {
    fromDate: '',
    toDate: '',
    channel: ''
  }

  toDateValid: boolean = false;
  isToDateValidError:any = "";
  showForm: boolean = false;
  // p: number = 1;
  transactionLists:any=[];
  todayDate:any;
  productTypes:any=[];
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public datePipe: DatePipe
    ) { }

    public buildForm() {
      var self = this;
      var date = this.datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm');
      $('#fromDate').datetimepicker({
        maxDate: date,
        showClose:true,
      });
      $('#toDate').datetimepicker({
        maxDate: date,
        showClose:true,
      })

      $("#fromDate").on("dp.change", function(e) {
        console.log('Ev 1',e);
        self.allTransactionForm.patchValue({fromDate:e.date._i})
        self.onDateChange(self.allTransactionForm.value)
      });

      $("#toDate").on("dp.change", function(e) {
        console.log('Ev 2',e);
        self.allTransactionForm.patchValue({toDate:e.date._i})
        self.onDateChange(self.allTransactionForm.value)
      });
      $('#fromDtIc').click(function(){
        // $('#fromDate').data("DateTimePicker").show()
      });


    this.allTransactionForm = this.form.group({
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
      channel:new FormControl('', [Validators.required])
    });
    this.allTransactionForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.allTransactionForm, this.formErrors, true)
    });
  }


  ngOnInit() {
    this.buildForm();
    this.todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.getProductType();
  }

  getProductType(){
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.masterListUrl).subscribe(data => {
      if(data.status){
        this.commonMethod.hideLoader();
        console.log("roles",data.resp);
        this.productTypes = data.resp;
      }
      else{
        this.commonMethod.errorMessage(data);
      }

    })
  }


  showHideForm() {
    this.showForm = !this.showForm
  }

  onDateChange(value){
    if(value.fromDate != "" && value.toDate != ""){
      if(value.toDate < value.fromDate){
        console.log(value);
        this.toDateValid = true;
        this.isToDateValidError = "* Please enter valid date";
      }
      else{
        this.toDateValid = false;
        this.isToDateValidError = "";
      }
    }
  }


  cancel(){
    this.router.navigateByUrl('/dashboard');
  }

  getTransList() {
    this.formValidation.markFormGroupTouched(this.allTransactionForm);
    if (this.allTransactionForm.valid) {
      if(this.toDateValid){ return; }
      var formData = this.allTransactionForm.value;
      var param = {
        fromdate: formData.fromDate,
        todate: formData.toDate
      }
     this.getTransactionListsApiAll(param,formData.channel);
    } else {
      this.formErrors = this.formValidation.validateForm(this.allTransactionForm, this.formErrors, false)
    }
  }


  getTransactionListsApiAll(param,appId) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.getAllTransactionLogById + appId, param).subscribe((data) => {
      var res = data.resp;
      $('#dt-sample').DataTable().clear().destroy();
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        this.transactionLists = res.result;
        this.commonMethod.setDataTable(this.commonServiceCall.pageName);
        console.log('transactionLists array: ', this.transactionLists);
      } else {
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable" : "No Data found"
            }})});
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getAllTransactionLogById, res);
      }
    });
  }

  errorCallBack(fld, res) {
      this.commonMethod.errorMessage(res);
  }




}
