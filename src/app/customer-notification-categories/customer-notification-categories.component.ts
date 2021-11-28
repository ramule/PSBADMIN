import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Location } from '@angular/common';
import { CustomerNotificationCategoriesService } from './customer-notification-categories.service';
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-customer-notification-categories',
  templateUrl: './customer-notification-categories.component.html',
  styleUrls: ['./customer-notification-categories.component.css']
})
export class CustomerNotificationCategoriesComponent implements OnInit {

  custNotificationCategoriesArr: any = [];
  priviledgeDataArr: any = [];
  // id="71"
  menuLink = "notificationCategories"

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    public customerNotificationCategoriesService: CustomerNotificationCategoriesService
  ) { }

  ngOnInit(): void {
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.commonServiceCall.pageName = "Customer Notification Categories";

    this.getLeftMenuId()
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.customerNotificationCategoriesService.addAuditTrailAdaptorParams(URL, operation);
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
          this.getCustNotificationCategories();
        }
        else {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

  getCustNotificationCategories() {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall.getResponsePromise(this.appConstants.getCustNotificationCategoriesUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getCustNotificationCategoriesUrl + "\n" + "Params={}", 'view')
        console.log(res);
        this.custNotificationCategoriesArr = res.result;
        //initiallize datatable
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
      } else if (res.responseCode == "202") {
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable": "No Data found"
            }
          })
        });
      } else {
        this.errorCallBack(this.appConstants.getCustNotificationCategoriesUrl, res);
      }
      this.commonMethod.hideLoader();
      this.commonMethod.destroyDataTable();
    });
  }


  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  editCustNotificationCategories(item) {
    console.log(item);
    if (item.statusName === 'ADMIN APPROVER PENDING' && this.commonDataShareService.roleType == this.commonDataShareService.makerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.commonDataShareService.submenuname = "custNotificationCategoriesEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
      this.commonDataShareService.custNotificationCategories.cif = item.cif;
      this.router.navigateByUrl("/custNotificationCategoriesEdit", { state: { id: item.id } });
    }
  }


  gotoCustNotificationCategories() {
    this.commonDataShareService.submenuname = "custNotificationCategoriesAdd";
    this.router.navigateByUrl("/custNotificationCategoriesAdd");
  }
  cancelClick() {
    this.commonMethod.cancel();
  }


}
