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
import { ImpsScheduleAddService } from "./imps-schedule-add.service";
import { IDropdownSettings } from "ng-multiselect-dropdown";

declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: "app-imps-schedule-add",
  templateUrl: "./imps-schedule-add.component.html",
  styleUrls: ["./imps-schedule-add.component.css"],
})
export class ImpsScheduleAddComponent implements OnInit {
  showForm: boolean = false;
  scheduleAddForm: FormGroup;
  remarkForm: FormGroup;
  dropdownSettings: IDropdownSettings;
  formErrors = {
    desc: "",
    unit: "",
    date: "",
    taskInterval: "",
    type: "",
    tasks: "",
    emailFrom: "",
    emailPassword: "",
    emailTo: "",
    emailcc: "",
    emailContent: "",
    ftpHost: "",
    ftpPort: "",
    ftpUser: "",
    ftpPassword: "",
    ftpRemoteDir: "",
    status: "",
  };

  taskArray = [];
  selectedItems: any = [];
  selectedDeliveryType: any;

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    public appConstant: AppConstants,
    public datePipe: DatePipe,
    private impsScheduleAddService: ImpsScheduleAddService
  ) {}

  public buildForm() {
    this.scheduleAddForm = this.form.group({
      desc: new FormControl("", [Validators.required]),
      unit: new FormControl("", [Validators.required]),
      date: new FormControl("", [Validators.required]),
      taskInterval: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required]),
      tasks: new FormControl("", [Validators.required]),
      status: new FormControl("", [Validators.required]),
    });
    this.scheduleAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.scheduleAddForm,
        this.formErrors,
        true
      );
    });
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Add Schedule";
    this.buildForm();
    this.getTaskMaster();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'type',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsScheduleAddService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstant.insertAudit, param)
      .subscribe((data) => {});
  }

  getTaskMaster() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstant.getAllTasks)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          console.log("response data: ", res);
          this.taskArray = res.result;
          console.log("IMPS tasks: ", this.taskArray);
        } else {
          this.errorCallBack(this.appConstant.getAllTasks, res);
        }
        this.commonMethod.hideLoader();
      });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  onItemSelect(item: any) {
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  addSchedule() {
    this.formValidation.markFormGroupTouched(this.scheduleAddForm);
    if (this.scheduleAddForm.valid) {
      var formData = this.scheduleAddForm.value;
      var param = this.impsScheduleAddService.addScheduleCall(formData);
      this.saveSchedule(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.scheduleAddForm,
        this.formErrors,
        false
      );
    }
  }

  saveSchedule(param) {
    this.commonMethod.showLoader();
    var url = this.appConstant.insertScheduleDataUrl;
    this.commonServiceCall.postResponsePromise(url, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:" + this.appConstant.apiURL.serviceURL_ESB + this.appConstant.insertScheduleDataUrl + "\n" + "Params=" + JSON.stringify(param), 'add')
        showToastMessage(res.responseMessage);
        this.router.navigateByUrl("/impsSchedule");
      } else {
        this.errorCallBack(this.appConstant.insertScheduleDataUrl, res);
        this.commonMethod.hideLoader();
      }
    });
  }

  cancel() {
    this.router.navigateByUrl("/impsSchedule");
  }

  onDeliveryTypeChange(event) {
    console.log(event);
    this.selectedDeliveryType = event.target.value;
    console.log('selected delivery type value: ', this.selectedDeliveryType);

    // removing all the controls first
    this.scheduleAddForm.removeControl('emailFrom');
    this.scheduleAddForm.removeControl('emailPassword');
    this.scheduleAddForm.removeControl('emailTo');
    this.scheduleAddForm.removeControl('emailcc');
    this.scheduleAddForm.removeControl('emailContent');
    this.scheduleAddForm.removeControl('ftpHost');
    this.scheduleAddForm.removeControl('ftpPort');
    this.scheduleAddForm.removeControl('ftpUser');
    this.scheduleAddForm.removeControl('ftpPassword');
    this.scheduleAddForm.removeControl('ftpRemoteDir');

    if(this.selectedDeliveryType == "email") {
      this.scheduleAddForm.addControl('emailFrom', new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-z]+[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,6}$/)]));
      this.scheduleAddForm.addControl('emailPassword', new FormControl('', [Validators.required]));
      this.scheduleAddForm.addControl('emailTo', new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-z]+[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,6}$/)]));
      this.scheduleAddForm.addControl('emailcc', new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-z]+[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,6}$/)]));
      this.scheduleAddForm.addControl('emailContent', new FormControl('', [Validators.required]));
    }
    else if(this.selectedDeliveryType == "ftp" || this.selectedDeliveryType == "sftp") {
      this.scheduleAddForm.addControl('ftpHost', new FormControl('', [Validators.required]));
      this.scheduleAddForm.addControl('ftpPort', new FormControl('', [Validators.required]));
      this.scheduleAddForm.addControl('ftpUser', new FormControl('', [Validators.required]));
      this.scheduleAddForm.addControl('ftpPassword', new FormControl('', [Validators.required]));
      this.scheduleAddForm.addControl('ftpRemoteDir', new FormControl('', [Validators.required]));
    }
  }
}
