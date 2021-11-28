import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { ActivitySettingService } from './activity-setting.service';
declare var showToastMessage: any;
declare var $: any;
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
@Component({
  selector: 'app-activity-setting',
  templateUrl: './activity-setting.component.html',
  styleUrls: ['./activity-setting.component.css']
})
export class ActivitySettingComponent implements OnInit {
  activitySettingData: any = []
  activityAdminSettingData: any = []
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public activitySettingService: ActivitySettingService
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Omni Activity Setting";
    if (this.commonData.activityPage == "mobileActivity") {
      this.getactivitySettingDetails()
    }
    else {
      this.getactivitySettingAdminDetails()
    }
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.activitySettingService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  getactivitySettingDetails() {
    this.activitySettingData = [];
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getAllActivitySetting).subscribe((data) => {
      var res = data.resp;
      $('#dt-sample1').DataTable().clear().destroy();
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getAllActivitySetting + "\n" + "Params={}", 'view')
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.activitySettingData = res.result;

        // res.result.forEach(element => {
        //   if(element.appName != "CORPORATE") {
        //     this.activitySettingData.push(element);
        //   }
        // });
        console.log('mobile activity setting data: ', this.activitySettingData);
        setTimeout(function () {
          $('table.display').DataTable({
            dom: 'lfrtipB',
            scrollY: "350px",
            scrollCollapse: true,
            buttons: [
              { extend: 'excel', className: 'buttonsToHide', exportOptions: { orthogonal: 'sort' } },
              { extend: 'pdf', className: 'buttonsToHide', orientation: 'landscape', pageSize: 'LEGAL', exportOptions: { orthogonal: 'sort' } },
              { extend: 'csv', className: 'buttonsToHide', exportOptions: { orthogonal: 'sort' } }
            ],
          });
          $('#dt-sample').DataTable().buttons('.buttonsToHide').nodes().css("display", "none");
          $('.dataTables_paginate').css({ "width": "50%", "float": "right" })
          $('.dataTables_length').css({ "float": "left", "margin-top": "10px" })
          $('.dataTables_info').css("float", "left")
          $(".dataTables_filter input").focus(function () {
            $('.dataTables_filter input').attr('type', 'text');
          })
        })
        console.log('Activity Setting array: ', this.activitySettingData);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getAllActivitySetting, res);
      }
      $('#dt-sample').DataTable().clear().destroy();
    });
  }

  getactivitySettingAdminDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getAllActivitySettingForAdmin).subscribe((data) => {
      var res = data.resp;
      $('#dt-sample').DataTable().clear().destroy();
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res)
        this.activityAdminSettingData = res.result;
        // res.result.forEach(element => {
        //   if (element.appName != this.appConstants.appName) {
        //     this.activityAdminSettingData.push(element);
        //   }
        // });
        setTimeout(function () {
          $('table.display').DataTable({
            dom: 'lfrtipB',
            scrollY: "350px",
            scrollCollapse: true,
            buttons: [
              { extend: 'excel', className: 'buttonsToHide', exportOptions: { orthogonal: 'sort' } },
              { extend: 'pdf', className: 'buttonsToHide', orientation: 'landscape', pageSize: 'LEGAL', exportOptions: { orthogonal: 'sort' } },
              { extend: 'csv', className: 'buttonsToHide', exportOptions: { orthogonal: 'sort' } }
            ],
          });
          $('#dt-sample1').DataTable().buttons('.buttonsToHide').nodes().css("display", "none");
          $('.dataTables_paginate').css({ "width": "50%", "float": "right" })
          $('.dataTables_length').css({ "float": "left", "margin-top": "10px" })
          $('.dataTables_info').css("float", "left")
          $(".dataTables_filter input").focus(function () {
            $('.dataTables_filter input').attr('type', 'text');
          })
        })

        console.log('Admin Activity Setting array: ', this.activityAdminSettingData);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getAllActivitySettingForAdmin, res);
      }
      $('#dt-sample1').DataTable().clear().destroy();
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancelClick() {
    this.commonMethod.cancel();
  }

  editActivitySettingDetails(item) {
    this.commonData.activitySetting.createdOn = item.createdOn;
    this.commonData.activitySetting.statusName = item.statusName;
    this.commonData.activitySetting.statusId = item.statusId;
    this.commonData.activitySetting.activityId = item.activityId;
    this.router.navigateByUrl("/activitysettingedit", { state: { id: item.id } });
  }

  editActivitySettingAdminDetails(item) {
    this.commonData.adminactivitySetting.createdOn = item.createdOn;
    this.commonData.adminactivitySetting.statusName = item.statusName;
    this.commonData.adminactivitySetting.statusId = item.statusId;
    this.commonData.adminactivitySetting.activityId = item.activityId;
    this.commonData.adminactivitySetting.tpin = item.tpinAllowd;
    this.commonData.adminactivitySetting.otp = item.otpAllowed;
    this.router.navigateByUrl("/adminactivitysettingedit", { state: { id: item.id } });
  }

  mobileTabClicked() {
    this.commonData.activityPage = "mobileActivity"
    console.log('activity page: ', this.commonData.activityPage);
    this.getactivitySettingDetails();

  }

  adminTabClicked() {
    this.commonData.activityPage = "adminActivity";
    console.log('activity page: ', this.commonData.activityPage);
    this.getactivitySettingAdminDetails();

  }

}
