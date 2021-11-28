import { Component, OnInit } from '@angular/core';

import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
declare var showToastMessage: any;

declare var $: any;
@Component({
  selector: 'app-admin-omni-channel-request',
  templateUrl: './admin-omni-channel-request.component.html',
  styleUrls: ['./admin-omni-channel-request.component.css']
})
export class AdminOmniChannelRequestComponent implements OnInit {
  // id = 31;
  menuLink = "adminOmniChannelReq";
  priviledgeDataArr: any = [];
  omniRequestForm: FormGroup
  showTable: boolean = false;
  omniChannelReq = [];
  omniChannelReqLists = [];
  newOmniChannelReqLists = [];
  p: number = 1;
  formErrors = {
    selectedStatus: ''
  }

  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    public appConstant: AppConstants,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    private commonDataService: CommonDataShareService
  ) { }



  ngOnInit() {
    this.getLeftMenuId();
    this.buildForm();
    this.commonServiceCall.pageName = "Omni Channel Request"
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = {
      "ChannelName": "DESKTOP",
      "channelRequest": URL,
      "eventName": 'Omni Channel Request',
      "category": "Administration",
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
    this.commonServiceCall.postResponseAuditTracking(this.appConstant.insertAudit, param).subscribe(data => {
    })
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
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

  getPriviledgeData(id) {
    var url = this.appConstant.getPriviledgeDataUrl + id + "/" + this.commonData.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if (this.priviledgeDataArr.viewChecked) {
          this.getOmniChannelReq();
          setTimeout(function () {
            $('table.display').DataTable({
              "language": {
                "emptyTable": "No Data found"
              }
            })
          });
        }
        else {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }


  cancel() {
    this.commonMethod.cancel();
  }

  getOmniChannelReq() {
    var userDetails = JSON.parse(this.commonServiceCall.userCredential);
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstant.getOmniChannelRequest + this.commonDataService.roleTypeId).subscribe((data) => {
      var res = data.resp;
      $('#dt-sample').DataTable().clear().destroy();
      console.log(res);
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:" + this.appConstant.apiURL.serviceURL_ESB + this.appConstant.getOmniChannelRequest + this.commonDataService.roleTypeId + "\n" + "Params={}", 'view')
        // console.log('response data: ', JSON.stringify(res));
        this.omniChannelReq = res.result;
        this.omniChannelReq.forEach(element => {
          if (element.statusname != "SUCCESS") {
            this.newOmniChannelReqLists.push(element);
          }
        });
        console.log('new array: ', this.newOmniChannelReqLists);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
      } else if (res.responseCode == "202"){
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable" : "No Data found"
            }})});
      } else {
        this.errorCallBack(this.appConstant.getOmniChannelRequest, res);
      }
      this.commonMethod.hideLoader();
      $('#dt-sample').DataTable().clear().destroy();
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  gotoOmniChannelReqDtls(item) {
    console.log(item);
    this.router.navigateByUrl("/adminOmniChannelReqEdit", { state: { value: item } });
  }

  getFilteredOmniChannelReqLists(statusName) {
    this.showTable = true;
    this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
    return this.omniChannelReqLists = this.omniChannelReq.filter(x => x.statusname == statusName);
  }


  selectedValue(status) {
    this.showTable = false;
    $('#dt-sample').DataTable().clear().destroy();
    if (status != '') {
      this.getFilteredOmniChannelReqLists(status)
    }
  }

  /**
   * This function is used to build the form for validations
   */
  public buildForm() {
    this.omniRequestForm = this.form.group({
      selectedStatus: new FormControl('', [Validators.required]),
    });
    this.omniRequestForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.omniRequestForm, this.formErrors, true)
    });
  }
}
