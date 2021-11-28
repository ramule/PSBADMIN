import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-masking-rules',
  templateUrl: './masking-rules.component.html',
  styleUrls: ['./masking-rules.component.css']
})
export class MaskingRulesComponent implements OnInit {

  maskingRulesList = [];
  newMaskingRulesList = [];
  priviledgeDataArr: any = [];;
  id = "48";
  menuLink = "maskingRules";
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public commonDataService: CommonDataShareService,
    private location: Location
  ) { }


  ngOnInit(){
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.commonServiceCall.pageName = "Masking Rules";
    //this.getMaskingRulesList();
    //this.getPriviledgeData()
    this.getLeftMenuId()
  }

/* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
getLeftMenuId() {
  var id = "";
  var url = this.appConstants.getLeftMenuByMenuLinkUrl + this.menuLink;
  this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
    var res = data.resp;
    if (res.responseCode == "200") {
      console.log('response data: ', res);
      this.commonData.submenuId = res.result[0].id;
      id = res.result[0].id;
      this.getPriviledgeData(id);
      console.log('Left Menu Id: ', id);
    } else {
      showToastMessage('Cannot get Id');
    }
  });
}

   /* Insert tracking for user activities*/
    addAuditTrailAdaptor(URL,operation)
    {
        var param = {
     "ChannelName": "DESKTOP",
        "channelRequest": URL,
        "eventName":'Masking Rules',
        "category":"Masking Rules",
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
        this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
        })
    }

  getPriviledgeData(id) {
    var url = this.appConstants.getPriviledgeDataUrl + id+"/"+this.commonData.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if(this.priviledgeDataArr.viewChecked) {
          this.getMaskingRulesList();
        }
        else {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

  gotoAddMasking(){
    this.commonData.submenuname = "maskingRulesAdd";
    this.router.navigateByUrl("/maskingRulesAdd");
  }

  //on load functions
  getMaskingRulesList(){
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getMaskingRulesListUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
           this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.getMaskingRulesListUrl+"\n"+"Params={}",'view')
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.maskingRulesList = res.result;
        console.log(this.maskingRulesList);
        this.maskingRulesList.forEach(element => {
          //element.createdon = this.formatDate(element.createdon);
          this.newMaskingRulesList.push(element);
        });
        console.log('newConfigMasters array: ', this.newMaskingRulesList);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getMaskingRulesListUrl, res);
      }
      this.destroyDataTable();
    });
  }

  destroyDataTable() {
    console.log('destroy datatable called...');
    $('#dt-sample').DataTable().clear().destroy();
  }

  formatDate(inputDate) {
    if(inputDate!=null || inputDate!= undefined || inputDate!= '') {
      var newDate = new Date(inputDate);
      return newDate.getDate()+'/'+(newDate.getMonth() + 1)+'/'+newDate.getFullYear();
    } else {
      return "";
    }
  }

  errorCallBack(fld, res) {
      if (fld == this.appConstants.getMaskingRulesListUrl) {
      this.commonMethod.errorMessage(res);
    }
  }

  cancelClick(){
    this.commonMethod.cancel();
  }

  gotoMaskRulesEdit(item){
    console.log(item);
    if(item.statusname === 'ADMIN APPROVER PENDING' && this.commonData.roleType == this.commonData.makerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      console.log(item);
      this.commonData.submenuname = "maskingRulesEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
      this.router.navigateByUrl("/maskingRulesEdit",{ state: { id: item.id} });
    }
  }
}
