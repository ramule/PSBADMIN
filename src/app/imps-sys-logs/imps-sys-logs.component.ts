import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { ImpsSysLogsService } from './imps-sys-logs.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-imps-sys-logs',
  templateUrl: './imps-sys-logs.component.html',
  styleUrls: ['./imps-sys-logs.component.css']
})
export class ImpsSysLogsComponent implements OnInit {

  menuLink = "impsSysLogs";
  priviledgeDataArr: any = [];
  impsSysLogsMaster: any = [];
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstant: AppConstants,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    private impsSysLogsService: ImpsSysLogsService
  ) {}

  ngOnInit(): void {
    this.commonServiceCall.pageName = "System Logs";
    this.getLeftMenuId();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsSysLogsService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstant.insertAudit, param)
      .subscribe((data) => {});
  }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstant.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log("response data: ", res);
        id = res.result[0].id;
        this.commonDataShareService.submenuId = res.result[0].id;
        this.getPriviledgeData(id);
        console.log("Left Menu Id: ", id);
      } else {
        showToastMessage("Cannot get Id");
      }
    });
  }

  getPriviledgeData(id) {
    var url =
      this.appConstant.getPriviledgeDataUrl +
      id +
      "/" +
      this.commonDataShareService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log("response data: ", res);
        this.priviledgeDataArr = res.result;
        console.log("response array: ", this.priviledgeDataArr);
        if (this.priviledgeDataArr.viewChecked) {
          this.getSystemLogs();
        }
      } else {
        showToastMessage("You Dont Have Priviledge To View The Data");
      }
    });
  }

  cancel() {
    this.commonMethod.cancel();
  }

  getSystemLogs() {
    this.commonMethod.showLoader();
    this.commonServiceCall
    .getResponsePromise(this.appConstant.getSyslogsUrls)
    .subscribe((data) => {
      var res = data.resp;
      console.log("get System Logs data: ", res);
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor(
          "Request:" +
            this.appConstant.apiURL.serviceURL_ESB +
            this.appConstant.getSyslogsUrls +
            "\n" +
            "Params={}",
          "view"
        );
        console.log(res);
        this.impsSysLogsMaster = res.result;
        console.log("System Logs array: ", this.impsSysLogsMaster);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
      } else if (res.responseCode == "202") {
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable": "No Data found"
            }
          })
        });
      } else {
        this.errorCallBack(this.appConstant.getSyslogsUrls, res);
      }
      this.commonMethod.hideLoader();
      this.commonMethod.destroyDataTable();
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

}
