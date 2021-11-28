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
import { ImpsScheduleEditService } from "./imps-schedule-edit.service";
import { Location, TitleCasePipe, DatePipe } from "@angular/common";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { browserRefresh } from "../app.component";
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: "app-imps-schedule-edit",
  templateUrl: "./imps-schedule-edit.component.html",
  styleUrls: ["./imps-schedule-edit.component.css"],
})
export class ImpsScheduleEditComponent implements OnInit {
  taskArray = [];
  scheduleEditForm: FormGroup;
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
  userId: any;
  remarkHistoryArr: any = [];
  selectedItems: any = [];
  selectedDeliveryType: any;

  roleId: any;
  selModel: any;
  schedule_id: any;
  beforeParams: any;
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private location: Location,
    public appConstant: AppConstants,
    private commonMethod: CommonMethods,
    public datePipe: DatePipe,
    private impsScheduleEditService: ImpsScheduleEditService
  ) {}

  public buildForm() {
    this.scheduleEditForm = this.form.group({
      desc: new FormControl("", [Validators.required]),
      unit: new FormControl("", [Validators.required]),
      date: new FormControl("", [Validators.required]),
      taskInterval: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required]),
      tasks: new FormControl("", [Validators.required]),
      status: new FormControl("", [Validators.required]),
    });
    this.scheduleEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.scheduleEditForm,
        this.formErrors,
        true
      );
    });
  }

  ngOnInit(): void {

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/impsSchedule');
      return;
    }

    this.commonServiceCall.pageName = "Edit Schedule";
    this.buildForm();
    this.getTaskMaster();

    this.dropdownSettings = {
      singleSelection: false,
      idField: "id",
      textField: "type",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };

    this.schedule_id = this.location.getState();
    this.getScheduleById(this.schedule_id);
  }

  getScheduleById(param) {

    var params = {
      "id": param.id
    }
    this.commonServiceCall
      .postResponsePromise(this.appConstant.getScheduleDataByIdUrl, params)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          console.log(res);
          this.commonMethod.hideLoader();
          this.beforeParams = res.result[0];

          /* on basis of delivery_type (email/ftp/sftp) it will enable fields accordingly */
          this.onDeliveryTypeChange(res.result[0].delivery_type, 'APICall');

          if(res.result[0].delivery_type == 'email') {
            this.scheduleEditForm.patchValue({
              desc: res.result[0].schedule_desc,
              unit: res.result[0].interval_unit,
              date: res.result[0].next_exec_datetime,
              taskInterval: res.result[0].task_interval,
              type: res.result[0].delivery_type,
              emailFrom: res.result[0].email_from,
              emailPassword: res.result[0].email_password,
              emailTo: res.result[0].email_to,
              emailcc: res.result[0].email_cc,
              emailContent: res.result[0].email_content,
              status: res.result[0].active,
            });
          }
          else {
            this.scheduleEditForm.patchValue({
              desc: res.result[0].schedule_desc,
              unit: res.result[0].interval_unit,
              date: res.result[0].next_exec_datetime,
              taskInterval: res.result[0].task_interval,
              type: res.result[0].delivery_type,
              ftpHost: res.result[0].ftp_host,
              ftpPort: res.result[0].ftp_port,
              ftpUser: res.result[0].ftp_user,
              ftpPassword: res.result[0].ftp_password,
              ftpRemoteDir: res.result[0].ftp_remote_dir,
              status: res.result[0].active,
            });
          }

          // var tasksMainArray = [];
          // var stateNameArr = res.result[0].stateName.split(',');

          // for(var i = 0; i < stateNameArr.length; i++) {
          //   var objIndex = this.taskArray.findIndex((obj) => obj.stateName.toLowerCase() == stateNameArr[i].toLowerCase());
          //   console.log('objIndex value: ', objIndex);
          //   var objStateId = this.taskArray[objIndex].stateId;
          //   var objStateName = this.taskArray[objIndex].stateName;
          //   var data: any = {
          //     stateName: objStateName,
          //     stateId: objStateId
          //   }
          //   tasksMainArray.push(data);
          // }

          // this.selectedItems = tasksMainArray;
          // console.log(tasksMainArray);
        } else {
          this.errorCallBack(this.appConstant.getHolidayListByIdUrl, res);
        }
        this.commonMethod.hideLoader();
      });
  }
  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsScheduleEditService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstant.insertAudit, param)
      .subscribe((data) => {});
  }

  update() {
    this.formValidation.markFormGroupTouched(this.scheduleEditForm);
    if (this.scheduleEditForm.valid) {
      var formData = this.scheduleEditForm.value;
      var param = this.impsScheduleEditService.editSchedule(
        formData,
        this.schedule_id.id
      );
      this.updateSchedule(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.scheduleEditForm,
        this.formErrors,
        false
      );
    }
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

  onDeliveryTypeChange(event, callType) {
    console.log(event);

    if(callType == 'UICall') {
      this.selectedDeliveryType = event.target.value;
      console.log("selected delivery type value: ", this.selectedDeliveryType);
    }
    else {
      this.selectedDeliveryType = event;
      console.log("selected delivery type value: ", this.selectedDeliveryType);
    }

    // removing all the controls first
    this.scheduleEditForm.removeControl("emailFrom");
    this.scheduleEditForm.removeControl("emailPassword");
    this.scheduleEditForm.removeControl("emailTo");
    this.scheduleEditForm.removeControl("emailcc");
    this.scheduleEditForm.removeControl("emailContent");
    this.scheduleEditForm.removeControl("ftpHost");
    this.scheduleEditForm.removeControl("ftpPort");
    this.scheduleEditForm.removeControl("ftpUser");
    this.scheduleEditForm.removeControl("ftpPassword");
    this.scheduleEditForm.removeControl("ftpRemoteDir");

    if (this.selectedDeliveryType == "email") {
      this.scheduleEditForm.addControl(
        "emailFrom",
        new FormControl("", [Validators.required,Validators.maxLength(50), Validators.pattern(/^[a-z]+[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,6}$/)])
      );
      this.scheduleEditForm.addControl(
        "emailPassword",
        new FormControl("", [Validators.required])
      );
      this.scheduleEditForm.addControl(
        "emailTo",
        new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-z]+[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,6}$/)])
      );
      this.scheduleEditForm.addControl(
        "emailcc",
        new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-z]+[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,6}$/)])
      );
      this.scheduleEditForm.addControl(
        "emailContent",
        new FormControl("", [Validators.required])
      );
    } else if (
      this.selectedDeliveryType == "ftp" ||
      this.selectedDeliveryType == "sftp"
    ) {
      this.scheduleEditForm.addControl(
        "ftpHost",
        new FormControl("", [Validators.required])
      );
      this.scheduleEditForm.addControl(
        "ftpPort",
        new FormControl("", [Validators.required])
      );
      this.scheduleEditForm.addControl(
        "ftpUser",
        new FormControl("", [Validators.required])
      );
      this.scheduleEditForm.addControl(
        "ftpPassword",
        new FormControl("", [Validators.required])
      );
      this.scheduleEditForm.addControl(
        "ftpRemoteDir",
        new FormControl("", [Validators.required])
      );
    }
  }

  updateSchedule(param) {
    this.commonMethod.showLoader();
    var url = this.appConstant.updateScheduleDataUrl;
    this.commonServiceCall.postResponsePromise(url, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor(
          "Request:" +
            this.appConstant.apiURL.serviceURL_ESB +
            this.appConstant.updateScheduleDataUrl +
            "\n" +
            "Params=" +
            JSON.stringify(param) +
            "\n" +
            "Before Update Params=" +
            JSON.stringify(this.beforeParams),
          "update"
        );
        showToastMessage(res.responseMessage);
        this.router.navigateByUrl("/impsSchedule");
      } else {
        this.errorCallBack(this.appConstant.getAllTasks, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  cancel() {
    this.router.navigateByUrl("/impsSchedule");
  }
}
