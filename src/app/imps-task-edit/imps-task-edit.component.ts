import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { Location, TitleCasePipe, DatePipe } from '@angular/common';
import { AppConstants } from '../app-constants';
import { CommonMethods } from '../common-methods';
import { ImpsTaskEditService } from './imps-task-edit.service';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-imps-task-edit',
  templateUrl: './imps-task-edit.component.html',
  styleUrls: ['./imps-task-edit.component.css']
})
export class ImpsTaskEditComponent implements OnInit {
  taskEditForm: FormGroup;
  formErrors = {
    type: '',
    desc: '',
    report: ''
  }
  beforeParams:any;
  selModel: any;
  task_id:any;
  reportsArr: any = [];
  selectedReportName: any;
  selectedReportId: any;
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private location: Location,
    public appConstant : AppConstants,
    private commonMethod : CommonMethods,
    public titlecasePipe : TitleCasePipe,
    public datePipe: DatePipe,
    private impsTaskEditService: ImpsTaskEditService
  ) { }


  public buildForm() {
    this.taskEditForm = this.form.group({
      type: new FormControl('', [Validators.required]),
      desc: new FormControl('', [Validators.required]),
      report: new FormControl('', [Validators.required])
    });
    this.taskEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.taskEditForm, this.formErrors, true)
    });
  }

  ngOnInit(): void {

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/impsTask');
      return;
    }

    this.commonServiceCall.pageName = "Edit Task";
    this.buildForm();
    this.task_id = this.location.getState();
    this.getReportMaster();
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
        this.getTaskById(this.task_id);
      } else {
        this.commonMethod.hideLoader();
      }
    });
  }

  onReportChange(event) {
    console.log(event.target.value);
    this.reportsArr.forEach(element => {
      if(element.id == event.target.value) {
        this.selectedReportName = element.name;
      }
    });
  }

  getTaskById(param) {

    var params = {
      "id": param.id
    }
    this.commonServiceCall
    .postResponsePromise(this.appConstant.getAllTasksById, params)
    .subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.commonMethod.hideLoader();
        this.beforeParams = res.result[0];
        this.selectedReportName = res.result[0].paramValue;

        this.reportsArr.forEach(element => {
          if(element.name == this.selectedReportName) {
            this.selectedReportId = element.id;
          }
        });

        this.taskEditForm.patchValue({
            type: res.result[0].type,
            desc: res.result[0].task_desc,
            report: this.selectedReportId,
        });
      } else {
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
      }
    });
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsTaskEditService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstant.insertAudit, param).subscribe(data => {
    })
  }

  update(){
    this.formValidation.markFormGroupTouched(this.taskEditForm);
    if (this.taskEditForm.valid) {
      var formData = this.taskEditForm.value;
      var param = this.impsTaskEditService.editTask(formData, this.task_id.id, this.selectedReportName) ;
      this.updateTask(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.taskEditForm, this.formErrors, false)
    }
  }


  updateTask(param) {
    this.commonMethod.showLoader();
    var url = this.appConstant.updateTaskData
    this.commonServiceCall.postResponsePromise(url, param).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {

        this.addAuditTrailAdaptor("Request:" + this.appConstant.apiURL.serviceURL_ESB + this.appConstant.updateTaskData + "\n" + "Params=" + JSON.stringify(param) + "\n" + "Before Update Params=" + JSON.stringify(this.beforeParams), 'update')
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
        this.router.navigateByUrl('/impsTask');
      } else {
        this.commonMethod.hideLoader();
      }

    })
  }

  cancel() {
    this.router.navigateByUrl('/impsTask')
  }

}
