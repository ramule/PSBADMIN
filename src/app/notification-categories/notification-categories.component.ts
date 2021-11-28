import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Location } from '@angular/common';
import { NotificationCategoriesService } from './notification-categories.service';
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-notification-categories',
  templateUrl: './notification-categories.component.html',
  styleUrls: ['./notification-categories.component.css']
})
export class NotificationCategoriesComponent implements OnInit {

  notificationCategoriesArr:any = [];
  priviledgeDataArr:any = [];
  // id="71"
  menuLink="notificationCategories"

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    public notificationCategoriesService: NotificationCategoriesService
  ) { }

  ngOnInit(): void {
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.commonServiceCall.pageName = "Notification Categories";
    //this.getCalculatorFormula();
    this.getLeftMenuId()
  }

  /* Insert tracking for user activities*/
      addAuditTrailAdaptor(URL,operation)
      {
          var param = this.notificationCategoriesService.addAuditTrailAdaptorParams(URL,operation);
          console.log(param)
          this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
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
    var url = this.appConstants.getPriviledgeDataUrl + id+"/"+this.commonDataShareService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if(this.priviledgeDataArr.viewChecked) {
          this.getNotificationCategories();
        }
        else {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

  getNotificationCategories(){
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall.getResponsePromise(this.appConstants.getNotificationCategoriesUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.getNotificationCategoriesUrl+"\n"+"Params={}",'view')
        console.log(res);
        this.notificationCategoriesArr = res.result;
        //initiallize datatable
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.commonMethod.hideLoader();
      } else {
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable" : "No Data found"
            }
          })
        });
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getNotificationCategoriesUrl, res);
      }
    });
  }


  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  editNotificationCategories(item){
    console.log(item);
    if(item.statusName === 'ADMIN APPROVER PENDING' && this.commonDataShareService.roleType == this.commonDataShareService.makerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.commonDataShareService.submenuname = "notificationCategoriesEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
      this.commonDataShareService.notificationCategories.createdOn = item.createdOn;
      this.router.navigateByUrl("/notificationCategoriesEdit",{ state: { id: item.id } });
    }
  }


  gotoNotificationCategories(){
    this.commonDataShareService.submenuname = "notificationCategoriesAdd";
    this.router.navigateByUrl("/notificationCategoriesAdd");
  }
  cancelClick(){
    this.commonMethod.cancel();
  }


}
