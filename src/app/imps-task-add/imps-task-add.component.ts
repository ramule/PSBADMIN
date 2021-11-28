import { Component, OnInit } from "@angular/core";

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { FormValidationsService } from "../form-validations.service";
import { CommonDataShareService } from "../common-data-share.service";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { Router } from "@angular/router";
import { CommonMethods } from "../common-methods";
import { AppConstants } from "../app-constants";
import { DatePipe } from "@angular/common";
import { ImpsTaskAddService } from "./imps-task-add.service";

declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: "app-imps-task-add",
  templateUrl: "./imps-task-add.component.html",
  styleUrls: ["./imps-task-add.component.css"],
})
export class ImpsTaskAddComponent implements OnInit {
  showForm: boolean = false;
  taskAddForm: FormGroup;
  remarkForm: FormGroup;
  reportsArr: any = [];
  selectedReportName: any;
  formErrors = {
    type: "",
    title: "",
    exportType: "",
    report: "",
  };

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    public appConstant: AppConstants,
    public datePipe: DatePipe,
    private impsTaskAddService: ImpsTaskAddService
  ) {}

  public buildForm() {
    this.taskAddForm = this.form.group({
      type: new FormControl("", [Validators.required]),
      title: new FormControl("", [Validators.required]),
     // exportType: new FormControl("", [Validators.required]),
      report: new FormControl("", [Validators.required]),
    });
    this.taskAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.taskAddForm,
        this.formErrors,
        true
      );
    });
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Add Task";
    this.buildForm();
    this.getReportMaster();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsTaskAddService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstant.insertAudit, param)
      .subscribe((data) => {});
  }

  onReportChange(event) {
    console.log(event.target.value);
    this.reportsArr.forEach(element => {
      if(element.id == event.target.value) {
        this.selectedReportName = element.name;
      }
    });
  }

  getReportMaster() {
    this.commonMethod.showLoader();
    this.commonServiceCall
    .getResponsePromise(this.appConstant.getAllReports)
    .subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log("response data: ", res);
        this.reportsArr = res.result;
        console.log("IMPS Report Master: ", this.reportsArr);
      } else {
        this.commonMethod.hideLoader();
      }
    });
  }

  addTask() {
    this.formValidation.markFormGroupTouched(this.taskAddForm);
    if (this.taskAddForm.valid) {
      var formData = this.taskAddForm.value;
      var param = this.impsTaskAddService.addTask(formData, this.selectedReportName);
      this.saveTask(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.taskAddForm,
        this.formErrors,
        false
      );
    }
  }

  saveTask(param) {
    this.commonMethod.showLoader();
    var url = this.appConstant.inserTaskData;
    this.commonServiceCall.postResponsePromise(url, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        //   this.addAuditTrailAdaptor("Request:" + this.appConstant.apiURL.serviceURL_ESB + this.appConstant.inserTaskData + "\n" + "Params=" + JSON.stringify(param), 'add')
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
        this.router.navigateByUrl("/impsTask");
      } else {
        this.commonMethod.hideLoader();
      }
    });
  }

  cancel() {
    this.router.navigateByUrl("/impsTask");
  }
}
