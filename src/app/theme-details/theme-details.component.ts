import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../app-constants';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { ThemeDetailsService } from './theme-details.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { NgxPrettifyService } from '@smartcodelab/ngx-prettify';
declare var showToastMessage: any;
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare function beautify(): any;
declare var $: any;
@Component({
  selector: 'app-theme-details',
  templateUrl: './theme-details.component.html',
  styleUrls: ['./theme-details.component.css']
})
export class ThemeDetailsComponent implements OnInit {
  message: any;
  cssType: any;
  themeList: any;
  themeName: any;
  channelError: boolean = false;
  channelId: any = '';
  channelName: any;
  productTypes:any = [];

  code = `body {background-color: #ffffff; }body.body-transparent {background-color: transparent; }body.body-tpin {background-color: #ededed; }input, select,textarea {background: transparent; }a {cursor: pointer;color: #00b4f1;text-decoration: underline; }`;

  beautify = require('js-beautify').js;
  //fs = require('fs');

  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    private themeDtlService: ThemeDetailsService,
    private commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods,
    public prettifier: NgxPrettifyService,
    private appConstants: AppConstants,
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Theme";
    this.commonServiceCall.selectedNav = 'themeDtl';
    this.commonMethod.hideLoader();
    this.getAppMasterList();
  }

  onChannelChange(channelId) {
    this.channelId = channelId;
    this.channelName = "MOBILE";
    if (this.channelId == '') {
      return;
    }

    var inputData = {
      "entityId": "MOBILE",
      "deviceId": "9",
      "map": {
        "entityId": "MOBILE",
        "cbsType": "TCS",
        "mobPlatform": "android",
        "mobileAppVersion": "1.0.0",
        "deviceId": "9",
        "clientAppVer": "1.0.0",
        "channelId": channelId
      }
    }
    this.getThemeList(inputData);
  }

  getThemeList(param) {
    $('#dt-sample').DataTable().clear().destroy();
    this.commonMethod.showLoader();
    var url = 'CHANNELTHEMEDATA';
    this.commonServiceCall.postResponsePromiseFile(url, param).subscribe(data => {
      this.commonMethod.hideLoader();
      this.themeList = [];
      if (data.status) {
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.themeList = data.resp.set.records;
        this.themeList.forEach(el => {
          if(el.status == 1){
            el.isChecked = true;
          }
          else{
            el.isChecked = false;
          }
        });
      }
      else {
        if (data.code == 401) {
          showToastMessage("Your Session Has Been Expired");
          this.router.navigateByUrl("/login");
        }
        else {
          showToastMessage("Master Update Error");
        }
      }
    })
  }

  changeStatus(e: any, data) {
    console.log(e);
    console.log(!e.srcElement.value);
    this.themeName = data.themeName;
    var status = 0;
    if(e.srcElement.value == 1){
      status = 0;
    }
    else if(e.srcElement.value == 0){
      status = 1;
    }
    var param = {
      "entityId": "MOBILE",
      "deviceId": "9",
      "map": {
        "entityId": "MOBILE",
        "cbsType": "TCS",
        "mobPlatform": "android",
        "mobileAppVersion": "1.0.0",
        "deviceId": "9",
        "clientAppVer": "1.0.0",
        "themeName": this.themeName,
        "channelId": this.channelId,
        "status": status,
        "themeId": data.themeId
      }
    }

    this.changeSelTheme(param);
  }

  goToPage(type, data) {

    this.router.navigateByUrl("/editTheme", { state: { data: data, type: type } });

    // if(type == 'edit'){
    //   this.router.navigateByUrl("/editTheme",{ state: { message: message ,themeName: themeName,type:type } });
    // }
    // this.message = this.commonDataService.decryptRequestData(message, "@MrN$2Qi8R");;
    // // this.message = this.prettifier.prettify(this.message);
    // console.log("before text ===>",this.message);
    // this.message  = this.message.slice(1,-1);
    // this.message  = this.beautify(this.message, { indent_size: 2, space_in_empty_paren: true });
    // this.themeName = themeName
    // this.cssType = type;
    // openTinyModel()
  }
  changeSelTheme(param) {
    this.commonMethod.showLoader();
    var url = 'THEMEDATASTATUSCHANGE';
    this.commonServiceCall.postResponsePromiseFile(url, param).subscribe(data => {
      console.log(data);
      this.commonMethod.hideLoader();
      if (data.status) {

        if(data.resp.responseParameter.opstatus == "08"){
          showToastMessage(data.resp.responseParameter.Result);
          return;
        }

        var inputData = {
          "entityId": "MOBILE",
          "deviceId": "9",
          "map": {
            "entityId": "MOBILE",
            "cbsType": "TCS",
            "mobPlatform": "android",
            "mobileAppVersion": "1.0.0",
            "deviceId": "9",
            "clientAppVer": "1.0.0",
            "channelId": this.channelId
          }
        }
        this.getThemeList(inputData);
      }
      else {
        if (data.code == 401) {
          showToastMessage("Your Session Has Been Expired");
          this.router.navigateByUrl("/login");
        }
        else {
          showToastMessage("Master Update Error");
        }
      }

    });
  }

  getAppMasterList(){
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.masterListUrl).subscribe((data) => {
      var res = data;
      if (res.status) {
        this.commonMethod.hideLoader();
        this.productTypes = res.resp;
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.masterListUrl, res);
      }
    });
  }

  filterProduct()
  {
    return this.productTypes.filter(x => x.shortName == "MOBILE"  || x.shortName == "DESKTOP"  || x.shortName == "TAB" || x.shortName == "WALLET" );
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }


  //not requrired

  closeActionModel() {
    closeTinyModel();
  }
  deleteCss(type) {
    if (type == 'no') {
      closeTinyModel()
    }
    else {
      var param = {
        "entityId": "MOBILE",
        "deviceId": "9",
        "map": {
          "entityId": "MOBILE",
          "cbsType": "TCS",
          "mobPlatform": "android",
          "mobileAppVersion": "1.0.0",
          "deviceId": "9",
          "clientAppVer": "1.0.0",
          "themeName": this.themeName,
          "channelId": this.channelId
        }
      }
      this.deleteSelTheme(param);
    }
  }

  editTheme() {
    // var inputData = this.themeDtlService.themeEditService(this.themeName, this.message,"10");
    // this.editSelTheme(inputData);
  }

  editSelTheme(param) {
    var url = 'UPDATECHANNELTHEMEDATA';
    this.commonServiceCall.postResponsePromiseFile(url, param).subscribe(data => {
      console.log(data);
      if (data.status) {
        closeTinyModel();
      }
      else {
        if (data.code == 401) {
          showToastMessage("Your Session Has Been Expired");
          this.router.navigateByUrl("/login");
        }
        else {
          showToastMessage("Master Update Error");
        }
      }

    });
  }

  deleteSelTheme(param) {
    var url = 'DELETECHANNELTHEMEDATA';
    this.commonServiceCall.postResponsePromiseFile(url, param).subscribe(data => {
      console.log(data);
      if (data.status) {
        closeTinyModel();
        var inputData = {
          "entityId": "MOBILE",
          "deviceId": "9",
          "map": {
            "entityId": "MOBILE",
            "cbsType": "TCS",
            "mobPlatform": "android",
            "mobileAppVersion": "1.0.0",
            "deviceId": "9",
            "clientAppVer": "1.0.0",
            "channelId": this.channelId
          }
        }

        this.getThemeList(JSON.stringify(inputData));
      }
      else {
        if (data.code == 401) {
          showToastMessage("Your Session Has Been Expired");
          this.router.navigateByUrl("/login");
        }
        else {
          showToastMessage("Master Update Error");
        }
      }

    });
  }


}
