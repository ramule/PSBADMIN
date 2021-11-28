import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AppConstants } from "../app-constants";
import { CommonDataShareService } from "../common-data-share.service";
import { CommonMethods } from "../common-methods";
import { FormValidationsService } from "../form-validations.service";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { DocumentTypeService } from "./document-type.service";
import { Location } from "@angular/common";
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: "app-document-type",
  templateUrl: "./document-type.component.html",
  styleUrls: ["./document-type.component.css"],
})
export class DocumentTypeComponent implements OnInit {
  documentTypeArr: any = [];
  priviledgeDataArr: any = [];
  menuLink = "documentType";
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    public dynamicService: DocumentTypeService
  ) {}

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Document Type";
    history.pushState(
      {},
      "self",
      this.location.prepareExternalUrl(this.router.url)
    );
    //this.getCorporateMenuDetails()
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
        this.commonDataShareService.submenuId = res.result[0].id;
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
      this.appConstants.getPriviledgeDataUrl +
      id +
      "/" +
      this.commonDataShareService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log("response data: ", res);
        this.priviledgeDataArr = res.result;
        console.log("response array: ", this.priviledgeDataArr);
        if (this.priviledgeDataArr.viewChecked) {
          this.getDocumentTypeDetails();
        } else {
          showToastMessage("You Dont Have Priviledge To View The Data");
        }
      } else {
        showToastMessage("You Dont Have Priviledge To View The Data");
      }
    });
  } /* Insert tracking for user activities*/

  addAuditTrailAdaptor(URL, operation) {
    var param = this.dynamicService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  getDocumentTypeDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.getDocumentTypeListUrl)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          console.log("response data: ", res);
          this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
          this.documentTypeArr = res.result;
          console.log("Corporate Menu Master array: ", this.documentTypeArr);
          this.addAuditTrailAdaptor(
            "Request:" +
              this.appConstants.apiURL.serviceURL_ESB +
              this.appConstants.getAllReportDetails +
              "\n" +
              "Params={}",
            "view"
          );
        } else if(res.responseCode == "202") {
          setTimeout(function () {
            $('table.display').DataTable({
              "language": {
                "emptyTable" : "No Data found"
              }}
            )}
          );
        } else {
          this.errorCallBack(this.appConstants.getDocumentTypeListUrl, res);
        }
        this.commonMethod.hideLoader();
        $("#dt-sample").DataTable().clear().destroy();
      });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }


  gotoAddDocumentType() {
    this.router.navigateByUrl("/documentTypeAdd");
    this.commonDataShareService.submenuname = "documentTypeAdd";
  }

  gotoEditDocumentType(item) {
    console.log(item);
    if (
      item.statusName === "ADMIN APPROVER PENDING" &&
      this.commonDataShareService.roleType == this.commonDataShareService.makerRole
    ) {
      showToastMessage("You Cannot Perform This Action");
    } else {
      this.commonDataShareService.dynamicReports.createdOn = item.createdon;
      this.router.navigateByUrl("/documentTypeEdit", {
        state: { id: item.id },
      });
      this.commonDataShareService.submenuname = "documentTypeEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
    }
  }

  cancelClick() {
    this.commonMethod.cancel();
  }
}
