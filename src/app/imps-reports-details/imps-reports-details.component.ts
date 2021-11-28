import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DatePipe, Location } from "@angular/common";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CommonDataShareService } from "../common-data-share.service";
import { CommonMethods } from "../common-methods";
import { AppConstants } from "../app-constants";
import { FormValidationsService } from "../form-validations.service";
import { ImpsReportsDetailsService } from './imps-reports-details.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-imps-reports-details',
  templateUrl: './imps-reports-details.component.html',
  styleUrls: ['./imps-reports-details.component.css']
})
export class ImpsReportsDetailsComponent implements OnInit {
  impsReportsMaster: any = [];
  impsReportsData: any = [];
  priviledgeDataArr: any = [];
  datadynamic: any = [];
  finalDataDynamic: any = [];
  coldynamic: any = [];
  menuLink = "impsReports";
  selModel: any;
  selCategoryDelete: any;
  selReportDelete: any;
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    private form: FormBuilder,
    public datePipe: DatePipe,
    private formValidation: FormValidationsService,
    private impsReportsService: ImpsReportsDetailsService
  ) {}

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Reports";
    this.getLeftMenuId();
    this.getReportMaster()
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsReportsService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
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
         // this.getReportMaster();
        } else {
          showToastMessage("You Dont Have Priviledge To View The Data");
        }
      } else {
        showToastMessage("You Dont Have Priviledge To View The Data");
      }
    });
  }

  getReportMaster() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.getAllReports)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          this.commonMethod.hideLoader();
          console.log("response data: ", res);
          this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
          this.impsReportsMaster = res.result;
          console.log("IMPS IFSC Master: ", this.impsReportsMaster);
          // this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getCorpUserTypesUrl + "\n" + "Params={}", 'view')
        } else if(res.responseCode ="202") {
          setTimeout(function () {
            $('table.display').DataTable({
              "language": {
                "emptyTable": "No Data found"
              }
            })
          });
          this.commonMethod.hideLoader();
        } else {
          this.commonMethod.hideLoader();
        }
        this.commonMethod.destroyDataTable();
      });
  }

  openModelToDeleteCategory(item) {
    this.selModel = "deleteCategory";
    this.selCategoryDelete = item;
    openTinyModel();
  }

  deleteCategory() {
    closeTinyModel();
    console.log("deletable item: ", this.selCategoryDelete);
    this.commonMethod.showLoader();
    var url = this.appConstants.deleteReportData;
    var param = this.impsReportsService.deleteReportCall(this.selCategoryDelete);
    this.commonServiceCall.postResponsePromise(url, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
        this.addAuditTrailAdaptor(
          "Request:" +
            this.appConstants.apiURL.serviceURL_ESB +
            this.appConstants.deleteReportData +
            param +
            "\n" +
            "Params=" +
            JSON.stringify(param),
          "delete"
        );
        this.getReportMaster();
      } else {
        this.commonMethod.hideLoader();
      }
    });
  }

  addReports() {
    this.router.navigateByUrl("/impsReportsAdd");
  }

  gotoEdit(item) {
    this.router.navigateByUrl("/impsReportsEdit", {
      state: { id: item.id },
    });
  }

  cancel() {
    this.commonMethod.cancel();
  }

  closeActionModel() {
    closeTinyModel();
  }

  selectedValue(event) {
    this.datadynamic = [];
    this.coldynamic = [];
    this.impsReportsData = [];
    this.finalDataDynamic = [];
    console.log(event.target.value);

    var param = {
      "id": event.target.value
    }

    this.commonMethod.showLoader();
    this.commonServiceCall
    .postResponsePromise(this.appConstants.getDynamicReportDataByRepotId, param)
    .subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log("response data: ", res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.impsReportsData = res.result.result;
        console.log("IMPS Report Data: ", this.impsReportsData);
        this.getDynamicCall(this.impsReportsData);
        // this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getCorpUserTypesUrl + "\n" + "Params={}", 'view')
      } else if(res.responseCode ="202") {
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable": "No Data found"
            }
          })
        });
        this.commonMethod.hideLoader();
      } else {
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
      }
      this.commonMethod.destroyDataTable();
    });
  }

  getDynamicCall(repArray) {
    this.datadynamic = [];
    this.coldynamic = [];

    var contentData: any = [];
    contentData = repArray;
    console.log("content data: ", contentData);
    var col = [];
    var count: any = 0;
    var contentDataLength = contentData.length;

    for (var i = 0; i <= contentDataLength; i++) {
      for (var key in contentData[i]) {
        if (col.indexOf(key) === -1) {
          if (i == 0) {
            this.coldynamic.push(key);
          }
          if (i > count) {
            count++;
            this.finalDataDynamic.push(this.datadynamic);
            this.datadynamic = [];
          }
          if (
            key.toLowerCase().includes("createdon") ||
            key.toLowerCase().includes("updatedon") ||
            key.toLowerCase().includes("validfrom") ||
            key.toLowerCase().includes("validto") ||
            key.toLowerCase().includes("createdondate") ||
            key.toLowerCase().includes("updatedondate")
          ) {
            if (contentData[i][key] == "" || contentData[i][key] == null) {
              this.datadynamic.push("-");
            } else {
              this.datadynamic.push(
                this.datePipe.transform(
                  contentData[i][key],
                  "yyyy/MM/dd hh:mm:ss a"
                )
              );
            }
          } else {
            if (contentData[i][key] == "" || contentData[i][key] == null) {
              this.datadynamic.push("-");
            } else {
              if (
                key.toLowerCase().includes("baseimagelarge") ||
                key.toLowerCase().includes("baseimagesmall")
              ) {
                var img = "data:image/jpg;base64," + contentData[i][key];
                this.datadynamic.push(img);
              } else {
                this.datadynamic.push(contentData[i][key]);
              }
            }
          }
        }
      }
    }
    this.finalDataDynamic.push(this.datadynamic);
    console.log("colDynamic: ", this.coldynamic);
    console.log("dataDynamic: ", this.datadynamic);
    console.log("finalDataDynamic: ", this.finalDataDynamic);
  }
}
