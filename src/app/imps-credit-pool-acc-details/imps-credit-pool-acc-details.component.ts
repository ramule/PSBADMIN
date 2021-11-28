import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { ImpsCreditPoolAccDetailsService } from './imps-credit-pool-acc-details.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-imps-credit-pool-acc-details',
  templateUrl: './imps-credit-pool-acc-details.component.html',
  styleUrls: ['./imps-credit-pool-acc-details.component.css']
})
export class ImpsCreditPoolAccDetailsComponent implements OnInit {

  menuLink = "impsCreditPoolAccDetails";
  selModel: any = "";
  itemToDelete: any;
  priviledgeDataArr: any = [];
  impsCreditPoolAccDetailsArr: any = [];
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstant: AppConstants,
    private impsCreditPoolAccDetailsService: ImpsCreditPoolAccDetailsService
  ) {}

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Credit Pool Account Details";
    this.getLeftMenuId();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsCreditPoolAccDetailsService.addAuditTrailAdaptorParams(
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
          this.getPoolAccDetails();
        }
      } else {
        showToastMessage("You Dont Have Priviledge To View The Data");
      }
    });
  }

  cancel() {
    this.commonMethod.cancel();
  }

  getPoolAccDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstant.getCreditPoolAccDetailsUrl)
      .subscribe((data) => {
        var res = data.resp;
        console.log("get Credit Pool Acc Details data: ", res);
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
              this.appConstant.apiURL.serviceURL_ESB +
              this.appConstant.getCreditPoolAccDetailsUrl +
              "\n" +
              "Params={}",
            "view"
          );
          console.log(res);
          this.impsCreditPoolAccDetailsArr = res.result;
          console.log("Credit Pool Acc Details array: ", this.impsCreditPoolAccDetailsArr);
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
          this.errorCallBack(this.appConstant.getCreditPoolAccDetailsUrl, res);
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

  addSystemConfig() {
    this.router.navigateByUrl("/impsCreditPoolAccDetailsAdd");
  }

  gotoEdit(item) {
    this.commonDataShareService.submenuname = "impsCreditPoolAccDetailsEdit";
    this.router.navigateByUrl("/impsCreditPoolAccDetailsEdit", {
      state: { id: item.id },
    });
  }

  gotoDelete(item) {
    console.log(item);
    this.selModel = "deletePoolAccDetails";
    this.itemToDelete = item;
    openTinyModel();
  }

  closeActionModel() {
    closeTinyModel();
  }

  deleteConfig() {
    closeTinyModel();
    var param = {
      id: this.itemToDelete.id,
    };

    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstant.deleteCreditPoolAccDetailsUrl, param)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          showToastMessage(res.responseMessage);
          this.addAuditTrailAdaptor(
            "Request:" +
              this.appConstant.apiURL.serviceURL_ESB +
              this.appConstant.deleteCreditPoolAccDetailsUrl +
              "\n" +
              "Params={}" +
              JSON.stringify(param),
            "Delete"
          );
          console.log(res);
          this.getPoolAccDetails();
        } else {
          this.errorCallBack(this.appConstant.deleteCreditPoolAccDetailsUrl, res);
        }
        this.commonMethod.hideLoader();
      });
  }

}
