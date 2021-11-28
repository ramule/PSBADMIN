import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-activity-notification-setting',
  templateUrl: './activity-notification-setting.component.html',
  styleUrls: ['./activity-notification-setting.component.css']
})
export class ActivityNotificationSettingComponent implements OnInit {

  beforeParams :any = []
  CreateCheckBox: boolean = false;
  UpdateCheckBox: boolean = false;
  activityMaster: any = [];
  priviledgeDataArr: any = [];
  menuLink = "activityNotificationSetting";
  userDetails: any;
  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonMethod: CommonMethods,
    public appConstant: AppConstants,
    private commonDataService: CommonDataShareService
  ) { }

  ngOnInit() {
    this.commonServiceCall.pageName = "Activity Notification Setting";
    this.getLeftMenuId();
  }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstant.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log("response data: ", res);
        this.commonDataService.submenuId = res.result[0].id;
        this.commonDataService.submenuname = res.result[0].menuLink;
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
      this.appConstant.getPriviledgeDataUrl +
      id +
      "/" +
      this.commonDataService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log("response data: ", res);
        this.priviledgeDataArr = res.result;
        console.log("response array: ", this.priviledgeDataArr);
        if (this.priviledgeDataArr.viewChecked) {
          this.getAllActivities();
        } else {
          showToastMessage("You Dont Have Priviledge To View The Data");
        }
      } else {
        showToastMessage("You Dont Have Priviledge To View The Data");
      }
    });
  }

     /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL,operation) {
    var param = {
      "ChannelName": "DESKTOP",
      "channelRequest": URL,
      "eventName":'Activity Notification Setting',
      "category":"Access Rights",
      "action":operation,
      "properties":URL,
      "IP":this.commonDataService.user_IP,
      "X-FORWARDEDIP":this.commonDataService.user_IP,
      "Lat":this.commonDataService.user_lat,
      "Lon":this.commonDataService.user_lon,
      "Browser":this.commonMethod.getBrowserName(),
      "Device":"",
      "OS":this.commonMethod.getOSName(),
      "CHANNELID":"4",
      "CREATEDBY":this.commonDataService.user_ID,
      "CREATEDBYNAME":this.commonDataService.user_Name,
       "UPDATEDBY":this.commonDataService.user_ID,
      "UPDATEDBYNAME":this.commonDataService.user_Name,
      "authorization":"0"
    }
    console.log(param)
     this.commonServiceCall.postResponseAuditTracking(this.appConstant.insertAudit, param).subscribe(data => {
    })
  }

  cancel() {
    this.commonMethod.cancel();
  }

  select(type) {
    console.log(type);
    switch (type) {
      case 'email':
        if ($("#emailCheckBox").is(":checked")) {
          this.activityMaster.map(v => v.isEmailChecked = true);
        } else {
          this.activityMaster.map(v => v.isEmailChecked = false);
        }
        break;

      case 'sms':
        if ($("#smsCheckBox").is(":checked")) {
          this.activityMaster.map(v => v.isSmsChecked = true);
        } else {
          this.activityMaster.map(v => v.isSmsChecked = false);
        }
        break;


      case 'push':
        if ($("#pushCheckBox").is(":checked")) {
          this.activityMaster.map(v => v.isPushChecked = true);
        } else {
          this.activityMaster.map(v => v.isPushChecked = false);
        }
        break;

      default:
        break;
    }
  }


  saveActivityDetails() {

    var selParams = [];
    let date = new Date();
    this.activityMaster.forEach(e => {
      var objIndex = this.activityMaster.findIndex(x => x.id == e.id);
      if (e.isEmailChecked) {

        this.activityMaster[objIndex].email = 'Y'
      }
      else {
        this.activityMaster[objIndex].email = 'N'
      }

      if (e.isSmsChecked) {
        this.activityMaster[objIndex].sms = 'Y'
      }
      else {
        this.activityMaster[objIndex].sms = 'N'
      }

      if (e.isPushChecked) {
        this.activityMaster[objIndex].push = 'Y'
      }
      else {
        this.activityMaster[objIndex].push = 'N'
      }

      var params = {
        "id": e.actinotiid,
        "push": e.push,
        "sms": e.sms,
        "displayname": e.displayname,
        "activitycode": e.activitycode,
        "email": e.email,
        "createdon": e.createdon,
        "createdby": this.commonDataService.user_ID,
        "activityid": {"id": e.id},
        "statusid":{"id":"3"}
        };

      selParams.push(params);
    });

    if(selParams.length > 0) {
      this.save(selParams);
    }
    else {
      window.location.reload();
      showToastMessage("Details Updated Successfully");
    }

    console.log('activityMaster Array: ', this.activityMaster);
    console.log('selParams Array: ', selParams);
  }

    save(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstant.saveActivityNotificationUrl, param).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log(data);
        //this.activityLog = data.resp;
        showToastMessage(res.responseMessage);
         this.addAuditTrailAdaptor("Request:"+this.appConstant.apiURL.serviceURL_ESB+this.appConstant.saveActivityNotificationUrl+"\n"+"Params="+JSON.stringify(param),'update')
      }
      else {
        this.errorCallBack(this.appConstant.saveActivityNotificationUrl, res);
      }
    })
  }


  getAllActivities() {
    $("#emailCheckBox").prop("checked", false);
    $("#smsCheckBox").prop("checked", false);
    $("#pushCheckBox").prop("checked", false);
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstant.getAllActivityNotificationsUrl).subscribe((data) => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();

        this.activityMaster = res.result;
        console.log("activity data: ", this.activityMaster);

        this.activityMaster.forEach(element => {
          if(element.email == 'Y') {
            element.isEmailChecked = true;
          }
          else {
            element.isEmailChecked = false;
          }

          if(element.sms == 'Y') {
            element.isSmsChecked = true;
          }
          else {
            element.isSmsChecked = false;
          }

          if(element.push == 'Y') {
            element.isPushChecked = true;
          }
          else {
            element.isPushChecked = false;
          }
        });

        // this.commonMethod.setDataTable1(this.commonServiceCall.pageName);

        this.setDatatable(this.commonServiceCall.pageName);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.getAllActivityNotificationsUrl, res);
      }
    });
  }

  setDatatable(pagename) {
    setTimeout(function () {
      $('table.display').DataTable({
        dom: 'lfrtipB',
        scrollY: "350px",
        pageLength: "50",
        scrollCollapse: true,
        buttons: [
          {extend:'excel',className: 'buttonsToHide',title:pagename},
          {extend:'pdf',className: 'buttonsToHide',orientation : 'landscape',pageSize : 'LEGAL',title:pagename},
          {extend:'csv',className: 'buttonsToHide',title:pagename}
    ]
      });
      $('#dt-sample').DataTable().buttons('.buttonsToHide').nodes().css("display", "none");
      $('#dt-sample1').DataTable().buttons('.buttonsToHide').nodes().css("display", "none");
      $('#dt-sample2').DataTable().buttons('.buttonsToHide').nodes().css("display", "none");
      $('#dt-sample3').DataTable().buttons('.buttonsToHide').nodes().css("display", "none");
      $('#dt-sample4').DataTable().buttons('.buttonsToHide').nodes().css("display", "none");
      $('#dt-sample5').DataTable().buttons('.buttonsToHide').nodes().css("display", "none");
      $('.dataTables_paginate').css({"width": "50%","float":"right"})
      $('.dataTables_length').css({"float":"left","margin-top":"10px"})
      $('.dataTables_info').css("float","left")
      $(".dataTables_filter input").focus(function(){
        $('.dataTables_filter input').attr('type', 'text');
      });
    })
  }

  // editActivityNotificationSettings(item) {
  //   this.router.navigateByUrl("/activityNotificationSettingEdit", { state: { id: item.actinotiid } });
  // }


  /**
   * This function is invoked whenever there is an error in the rest api
   * @param fld
   * @param res
   */
  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

}
