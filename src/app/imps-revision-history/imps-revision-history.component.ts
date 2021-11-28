import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { ImpsRevisionHistoryService } from './imps-revision-history.service';

declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-imps-revision-history',
  templateUrl: './imps-revision-history.component.html',
  styleUrls: ['./imps-revision-history.component.css']
})
export class ImpsRevisionHistoryComponent implements OnInit {

  menuLink = "impsRevisionHistory";
  priviledgeDataArr: any = [];
  impsRevisionHistoryArr: any = [];
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstant: AppConstants,
    private impsRevisionHistoryService: ImpsRevisionHistoryService
  ) {}

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Revision History";
    this.getLeftMenuId();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsRevisionHistoryService.addAuditTrailAdaptorParams(
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
          this.getImpsRevisionDetails();
        }
      } else {
        showToastMessage("You Dont Have Priviledge To View The Data");
      }
    });
  }

  cancel() {
    this.commonMethod.cancel();
  }

  getImpsRevisionDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall
    .getResponsePromise(this.appConstant.getAllRevisionDetailsUrl)
    .subscribe((data) => {
      var res = data.resp;
      console.log("get Revision History data: ", res);
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor(
          "Request:" +
            this.appConstant.apiURL.serviceURL_ESB +
            this.appConstant.getAllRevisionDetailsUrl +
            "\n" +
            "Params={}",
          "view"
        );
        console.log(res);
        this.impsRevisionHistoryArr = res.result;
        console.log("Revision History array: ", this.impsRevisionHistoryArr);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
      } else if (res.responseCode == "202") {
        setTimeout(function () {
          $("table.display").DataTable({
            language: {
              emptyTable: "No Data found",
            },
          });
        });
      } else {
        this.errorCallBack(this.appConstant.getAllRevisionDetailsUrl, res);
      }
      this.commonMethod.destroyDataTable();
      setTimeout(() => {
        this.commonMethod.hideLoader();
      }, 3000);
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }


}
