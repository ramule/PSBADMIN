import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CbsMessageTemplateService } from './cbs-message-template.service';
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-cbs-message-template',
  templateUrl: './cbs-message-template.component.html',
  styleUrls: ['./cbs-message-template.component.css']
})
export class CbsMessageTemplateComponent implements OnInit {

  cbsMessageTemplateArr: any = [];
  priviledgeDataArr: any = [];
  menuLink = "cbsMessageTemplate"

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    public cbsMessageTemplateService: CbsMessageTemplateService

  ) { }

  ngOnInit(): void {
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.commonServiceCall.pageName = "CBS Message Template";
    this.getLeftMenuId()
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.cbsMessageTemplateService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstants.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        this.commonDataShareService.submenuId = res.result[0].id;
        id = res.result[0].id;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

  getPriviledgeData(id) {
    var url = this.appConstants.getPriviledgeDataUrl + id + "/" + this.commonDataShareService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if (this.priviledgeDataArr.viewChecked) {
          this.getCbsMessageTemplate();
        }
        else {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

  getCbsMessageTemplate() {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall.getResponsePromise(this.appConstants.getAllCbsMessageTemplateUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.cbsMessageTemplateArr = res.result;
        //initiallize datatable
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getAllCbsMessageTemplateUrl + "\n" + "Params={}", 'view')
      } else if (res.responseCode == "202") {
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable": "No Data found"
            }
          })
        });
      } else {
        this.errorCallBack(this.appConstants.getAllCbsMessageTemplateUrl, res);
      }
      this.commonMethod.hideLoader();
      this.commonMethod.destroyDataTable();
    });
  }


  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  editCbsMessageTemplate(item) {
    console.log(item);
    this.commonDataShareService.submenuname = "cbsMessageTemplateEdit";
    this.commonServiceCall.makerRequestEditUrl = this.router.url;
    this.router.navigateByUrl("/cbsMessageTemplateEdit", { state: { id: item.id } });
  }


  gotoAddCbsMessageTemplate() {
    this.commonDataShareService.submenuname = "cbsMessageTemplateAdd";
    this.router.navigateByUrl("/cbsMessageTemplateAdd");
  }
  cancelClick() {
    this.commonMethod.cancel();
  }

}
