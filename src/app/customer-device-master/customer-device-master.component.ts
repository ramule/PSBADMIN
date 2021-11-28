import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { Location } from '@angular/common';
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-customer-device-master',
  templateUrl: './customer-device-master.component.html',
  styleUrls: ['./customer-device-master.component.css']
})
export class CustomerDeviceMasterComponent implements OnInit {

  id = 17;
  menuLink = "customerDeviceMaster";
  p: number = 1;
  deviceMasterList: any = [];
  priviledgeDataArr: any = [];

  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonMethod: CommonMethods,
    private appConstant: AppConstants,
    public commonDataService: CommonDataShareService,
    public location: Location
  ) { }

  ngOnInit() {
    this.commonServiceCall.pageName = "Device Master";
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.getLeftMenuId();
  }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstant.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        id = res.result[0].id;
        this.commonDataService.submenuId = res.result[0].id;
        this.commonDataService.submenuname = res.result[0].menuLink;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

  getPriviledgeData(id) {
    var url = this.appConstant.getPriviledgeDataUrl + id + "/" + this.commonDataService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if (this.priviledgeDataArr.viewChecked) {
          this.getDeviceMaster();
        }
        else {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = {
      "ChannelName": "DESKTOP",
      "channelRequest": URL,
      "eventName": 'Device Master',
      "category": "Master",
      "action": operation,
      "properties": URL,
      "IP": this.commonDataService.user_IP,
      "X-FORWARDEDIP": this.commonDataService.user_IP,
      "Lat": this.commonDataService.user_lat,
      "Lon": this.commonDataService.user_lon,
      "Browser": this.commonMethod.getBrowserName(),
      "Device": "",
      "OS": this.commonMethod.getOSName(),
      "CHANNELID": "4",
      "CREATEDBY": this.commonDataService.user_ID,
      "CREATEDBYNAME": this.commonDataService.user_Name,
      "UPDATEDBY": this.commonDataService.user_ID,
      "UPDATEDBYNAME": this.commonDataService.user_Name,
      "authorization": "0"
    }
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstant.insertAudit, param).subscribe(data => {
    })
  }

  cancel() {
    this.commonMethod.cancel();
  }

  openPopup(item) {
    console.log(item);
    if (item.statusDescription === 'ADMIN APPROVER PENDING' && this.commonDataService.roleType == this.commonDataService.makerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.router.navigateByUrl("/customerDeviceMasterEdit", { state: { id: item.id } });
      this.commonDataService.submenuname = "customerDeviceMasterEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
    }
  }


  getDeviceMaster() {
    $('#dt-sample').DataTable().clear().destroy();
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstant.getDeviceMasterDetails).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:" + this.appConstant.apiURL.serviceURL_ESB + this.appConstant.getDeviceMasterDetails + "\n" + "Params={}", 'view')
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.deviceMasterList = res.result;
      } else {
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable": "No Data found"
            }
          });
        })
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.getDeviceMasterDetails, res);
      }

    })
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }


}
