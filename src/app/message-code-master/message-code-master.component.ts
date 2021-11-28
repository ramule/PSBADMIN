import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { MessageCodeMasterService } from './message-code-master.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-message-code-master',
  templateUrl: './message-code-master.component.html',
  styleUrls: ['./message-code-master.component.css']
})
export class MessageCodeMasterComponent implements OnInit {

  menuLink = "messageCodeMaster";
  priviledgeDataArr: any = [];
  msgCodeMasterArr: any = [];
  selModel: any;
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService : CommonDataShareService,
    public commonMethod : CommonMethods,
    public appConstant : AppConstants,
    private messageCodeMasterService: MessageCodeMasterService
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Message Code Master";
    this.getLeftMenuId();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL,operation) {
    var param = this.messageCodeMasterService.addAuditTrailAdaptorParams(URL,operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstant.insertAudit, param).subscribe(data => {
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
        this.commonDataShareService.submenuId = res.result[0].id;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

  getPriviledgeData(id) {
    var url = this.appConstant.getPriviledgeDataUrl + id+"/"+this.commonDataShareService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if(this.priviledgeDataArr.viewChecked) {
          this.getMessageCodeMasterDetails();
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

  cancel(){
    this.commonMethod.cancel();
  }

  getMessageCodeMasterDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstant.getMessageCodeMasterDetailsUrl).subscribe(data => {
      var res = data.resp;
      console.log('get msg code master data: ', res);
      if (res.responseCode == "200") {
         this.addAuditTrailAdaptor("Request:"+this.appConstant.apiURL.serviceURL_ESB+this.appConstant.getMessageCodeMasterDetailsUrl+"\n"+"Params={}",'view')
        console.log(res);
        this.commonMethod.setDataTable(this.commonServiceCall.pageName);
        this.msgCodeMasterArr = res.result;
        console.log('Message Code Master array: ', this.msgCodeMasterArr);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.getMessageCodeMasterDetailsUrl, res);
      }
      this.commonMethod.hideLoader();
    })
  }

  gotoAddMessageCode() {
    this.commonDataShareService.submenuname = "messageCodeMasterAdd";
    this.router.navigateByUrl("/messageCodeMasterAdd");
  }

  gotoMessageCodeEdit(item) {
    console.log(item);
    if(item.statusname === 'ADMIN APPROVER PENDING' && this.commonDataShareService.roleType == this.commonDataShareService.makerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.commonDataShareService.submenuname = "messageCodeMasterEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
      this.router.navigateByUrl("/messageCodeMasterEdit",{ state: { id: item.id} });
    }
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

}
