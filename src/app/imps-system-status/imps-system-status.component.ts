import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { FormValidationsService } from '../form-validations.service';
import { ImpsSystemStatusService } from './imps-system-status.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-imps-system-status',
  templateUrl: './imps-system-status.component.html',
  styleUrls: ['./imps-system-status.component.css']
})
export class ImpsSystemStatusComponent implements OnInit {
  menuLink = "impsSystemStatus";
  impsSysStatusMaster:any=[];
  priviledgeDataArr: any = [];
  selModel: any = "";
  itemToDelete: any;
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstant: AppConstants,
    private location: Location,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    private impsSystemStatusService: ImpsSystemStatusService
  ) { }


  ngOnInit(): void {
    this.commonServiceCall.pageName = "IMPS System Status";
    this.impsSysStatusMaster = [];
    this.getLeftMenuId();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsSystemStatusService.addAuditTrailAdaptorParams(
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
          this.getImpsSystemStatus();
        }
      } else {
        showToastMessage("You Dont Have Priviledge To View The Data");
      }
    });
  }

  getImpsSystemStatus() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstant.getIMPSSystemStatusUrl)
      .subscribe((data) => {
        var res = data.resp;
        console.log("get IMPS system status data: ", res);
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
              this.appConstant.apiURL.serviceURL_ESB +
              this.appConstant.getIMPSSystemStatusUrl +
              "\n" +
              "Params={}",
            "view"
          );
          console.log(res);
          this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
          this.impsSysStatusMaster = res.result;
          console.log("IMPS system status array: ", this.impsSysStatusMaster);
        } else if (res.responseCode == "202") {
          setTimeout(function () {
            $("table.display").DataTable({
              language: {
                emptyTable: "No Data found",
              },
            });
          });
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstant.getIMPSSystemStatusUrl, res);
        }
        this.commonMethod.hideLoader();
      });
  }

  gotoDelete(item) {
    console.log(item);
    this.selModel = "deleteSysConfig";
    this.itemToDelete = item;
    openTinyModel();
  }

  closeActionModel() {
    closeTinyModel();
  }

  deleteSystemStatus() {
    closeTinyModel();
    var param = {
      id: this.itemToDelete.id,
    };

    this.commonMethod.showLoader();
    this.commonServiceCall
    .postResponsePromise(this.appConstant.deleteImpsStatusByIdUrl, param)
    .subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        showToastMessage(res.responseMessage);
        this.addAuditTrailAdaptor(
          "Request:" +
            this.appConstant.apiURL.serviceURL_ESB +
            this.appConstant.deleteImpsStatusByIdUrl +
            "\n" +
            "Params={}" +
            JSON.stringify(param),
          "Delete"
        );
        console.log(res);
        this.getImpsSystemStatus();
      } else {
        this.errorCallBack(this.appConstant.deleteImpsStatusByIdUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancel() {
    this.commonMethod.cancel();
  }

  gotoSystemStatusEdit(item) {
    console.log(item);
    this.router.navigateByUrl("/impsSystemStatusEdit", {
      state: { id: item.id },
    });
  }

}
