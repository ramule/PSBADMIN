import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { FormValidationsService } from "../form-validations.service";
import { CommonDataShareService } from "../common-data-share.service";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { Router } from "@angular/router";
import { CommonMethods } from "../common-methods";
import { AppConstants } from "../app-constants";
import { CustomerInformationService } from "./customer-information.service";
import { Location } from "@angular/common";
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: "app-customer-information",
  templateUrl: "./customer-information.component.html",
  styleUrls: ["./customer-information.component.css"],
})
export class CustomerInformationComponent implements OnInit {
  customerInfoList: any = [];
  message = "";
  priviledgeDataArr: any = [];
  id = "54";
  menuLink = "customerInfo";

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public notificationService: CustomerInformationService,
    private location: Location
  ) { }

  /**
   * This function will be called on initilization of page
   * functionality
   * define page name
   * get all list of all notification sent
   */
  ngOnInit() {
    history.pushState(
      {},
      "self",
      this.location.prepareExternalUrl(this.router.url)
    );
    this.commonServiceCall.pageName = "Customers Info";

    this.getLeftMenuId();
  }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstants.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log("response data: ", res);
        this.commonData.submenuId = res.result[0].id;
        id = res.result[0].id;
        this.getPriviledgeData(id);
        console.log("Left Menu Id: ", id);
      } else {
        showToastMessage("Cannot get Id");
      }
    });
  }

  getPriviledgeData(id) {
    var url = this.appConstants.getPriviledgeDataUrl + id + "/" + this.commonData.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log("response data: ", res);
        this.priviledgeDataArr = res.result;
        console.log("response array: ", this.priviledgeDataArr);
        if (this.priviledgeDataArr.viewChecked) {
          this.getCustomerInfo();
        } else {
          showToastMessage("You Dont Have Priviledge To View The Data");
        }
      } else {
        showToastMessage("You Dont Have Priviledge To View The Data");
      }
    });
  } /* Insert tracking for user activities*/

  addAuditTrailAdaptor(URL, operation) {
    var param = this.notificationService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => { });
  }

  /**
   * This function will redirect to notification screen
   */
  gotoEditCustomerInfo() {
    this.commonData.submenuname = "customerInfoAdd";
    this.router.navigateByUrl("/customerInfoAdd");
  }

  /**
   * This function will get all notification already sent
   */
  getCustomerInfo() {
    this.commonMethod.destroyDataTable(); /*** Data table is destroyed */
    this.commonMethod.showLoader(); /*** Loader is called */
    this.commonServiceCall
      .getResponsePromise(this.appConstants.getCustomerInfo)
      .subscribe((data) => {
        var res = data.resp;
        console.log(res);
        if (res.responseCode == "200") {
          /*** Data table is initiallized */
          this.addAuditTrailAdaptor(
            "Request:" +
            this.appConstants.apiURL.serviceURL_ESB +
            this.appConstants.getCustomerInfo +
            "\n" +
            "Params={}",
            "view"
          );
          this.commonMethod.setDataTable(this.commonServiceCall.pageName);
          /*** responce is mapped to notification table*/
          this.customerInfoList = res.result;
        } else if (res.responseCode == "202") {
          setTimeout(function () {
            $('table.display').DataTable({
              "language": {
                "emptyTable": "No Data found"
              }
            })
          });
        } else {
          this.errorCallBack(this.appConstants.getCustomerInfo, data.resp);
        }
        this.commonMethod.hideLoader();
      });
  }

  /**
   * This function will redirect to edit page of customer Other Info
   */
  editCustomerOtherInfo(item) {
    console.log(item);
    if (item.statusname === 'ADMIN APPROVER PENDING' && this.commonData.roleType == this.commonData.makerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.commonData.submenuname = "customerInfoEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
      this.commonData.customerInfo.mobile = item.mobile;
      this.router.navigateByUrl("/customerInfoEdit", { state: { id: item.id } });
    }
  }

  cancelClick() {
    this.router.navigateByUrl("/dashboard");
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }
}
