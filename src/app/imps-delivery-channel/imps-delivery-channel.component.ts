import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { ImpsDeliveryChannelService } from './imps-delivery-channel.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-imps-delivery-channel',
  templateUrl: './imps-delivery-channel.component.html',
  styleUrls: ['./imps-delivery-channel.component.css']
})
export class ImpsDeliveryChannelComponent implements OnInit {

  impsDeliveryChannelArr: any = [];
  priviledgeDataArr: any = [];
  menuLink = "impsDeliveryChannel";
  selModel: any;
  selDeliveryChannelDelete: any;
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private impsDeliveryChannelService: ImpsDeliveryChannelService
  ) {}

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Delivery Channel";
    this.getLeftMenuId();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsDeliveryChannelService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstants.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log("response data: ", res);
        this.commonDataShareService.submenuId = res.result[0].id;
        id = res.result[0].id;
        this.getPriviledgeData(id);
        console.log("Left Menu Id: ", id);
      } else {
        showToastMessage("Cannot get Id");
      }
    });
  }

  getPriviledgeData(id) {
    var url =
      this.appConstants.getPriviledgeDataUrl +
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
          this.getDeliveryChannelDetails();
        } else {
          showToastMessage("You Dont Have Priviledge To View The Data");
        }
      } else {
        showToastMessage("You Dont Have Priviledge To View The Data");
      }
    });
  }

  getDeliveryChannelDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall
    .getResponsePromise(this.appConstants.getAllDeliveryChannelDetailsUrl)
    .subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log("response data: ", res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.impsDeliveryChannelArr = res.result;
        console.log("IMPS Delivery Channel: ", this.impsDeliveryChannelArr);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getAllDeliveryChannelDetailsUrl + "\n" + "Params={}", 'view')
      } else if(res.responseCode ="202") {
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable": "No Data found"
            }
          })
        });
      } else {
        showToastMessage(res.responseMessage);
      }
      this.commonMethod.hideLoader();
      this.commonMethod.destroyDataTable();
    });
  }

  addTransFee() {
    this.router.navigateByUrl("/impsDeliveryChannelAdd");
  }

  gotoEdit(item) {
    this.router.navigateByUrl("/impsDeliveryChannelEdit");

    this.router.navigateByUrl("/impsDeliveryChannelEdit", {
      state: { id: item.id },
    });
  }

  deleteDeliveryChannel() {
    closeTinyModel();
    console.log("deletable item: ", this.selDeliveryChannelDelete);
    this.commonMethod.showLoader();
    var url = this.appConstants.deleteDeliveryChannelUrl;
    var param = this.impsDeliveryChannelService.deleteDeliveryChannel(this.selDeliveryChannelDelete);
    this.commonServiceCall.postResponsePromise(url, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
        this.addAuditTrailAdaptor(
          "Request:" +
            this.appConstants.apiURL.serviceURL_ESB +
            this.appConstants.deleteDeliveryChannelUrl +
            param +
            "\n" +
            "Params=" +
            JSON.stringify(param),
          "delete"
        );
        this.getDeliveryChannelDetails();
      } else {
        this.commonMethod.hideLoader();
      }
    });
  }

  openModalToDeleteDeliveryChannel(item) {
    this.selModel = "deleteChannel";
    this.selDeliveryChannelDelete = item;
    openTinyModel();
  }

  closeActionModel() {
    closeTinyModel();
  }

  cancel() {
    this.commonMethod.cancel();
  }

}
