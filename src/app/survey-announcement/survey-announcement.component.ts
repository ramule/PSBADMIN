import { Component, OnInit } from "@angular/core";
import { AppConstants } from "../app-constants";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { Router } from "@angular/router";
import { SurveyAnnouncementService } from "./survey-announcement.service";
import { CommonDataShareService } from "../common-data-share.service";
import { CommonMethods } from "../common-methods";
import { DatePipe } from "@angular/common";
import { Location } from "@angular/common";
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: "app-survey-announcement",
  templateUrl: "./survey-announcement.component.html",
  styleUrls: ["./survey-announcement.component.css"],
})
export class SurveyAnnouncementComponent implements OnInit {
  announcementList: any = [];
  showForm: boolean = false;
  isAddButtonClicked = false;
  masterStatus = [];
  formErrors = {
    surveyName: "",
    status: "",
    surveyStart: "",
    surveyEnd: "",
  };
  todayDate: any;
  toDateValid: boolean = false;
  isToDateValidError: any;
  userAppId: any = [];
  appId: any;
  showTable: boolean = false;
  priviledgeDataArr: any = [];
  priveledge: any;
  menuLink = "announcement";
  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    private commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private surveyService: SurveyAnnouncementService,
    public datePipe: DatePipe,
    private location: Location
  ) {}

  /**
   * This function will be called on initilization of page
   * functionality
   * define page name
   * Intialize form
   * get all the status list
   * get today's date
   */
  ngOnInit(): void {
    history.pushState(
      {},
      "self",
      this.location.prepareExternalUrl(this.router.url)
    );
    this.commonServiceCall.pageName = "Announcement";
    this.getStatus(); /*** get all the status from status master */
    this.todayDate = this.datePipe.transform(
      new Date(),
      "yyyy-MM-dd"
    ); /*** get today's date and assign in 'yyyy-MM-dd' format */
    //this.getPriviledgeData()
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
        this.commonDataService.submenuId = res.result[0].id;
        id = res.result[0].id;
        this.getPriviledgeData(id);
        console.log("Left Menu Id: ", id);
      } else {
        showToastMessage("Cannot get Id");
      }
    });
  }

  //get priviledge
  getPriviledgeData(id) {
    var url =
      this.appConstants.getPriviledgeDataUrl +
      id +
      "/" +
      this.commonDataService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log("response data: ", res);
        this.priviledgeDataArr = res.result;
        console.log("response array: ", this.priviledgeDataArr);
        if (this.priviledgeDataArr.viewChecked) {
          this.priveledge = true;
        } else {
          showToastMessage("You Dont Have Priviledge To View The Data");
          this.priveledge = false;
        }
      } else {
        showToastMessage("You Dont Have Priviledge To View The Data");
        this.priveledge = false;
      }
    });
  } /* Insert tracking for user activities*/

  addAuditTrailAdaptor(URL, operation) {
    var param = this.surveyService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  /**
   * This function call api for status master
   */
  //load all appId
  getStatus() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.masterStatusUrl)
      .subscribe((data) => {
        if (data.status) {
          console.log("Data resp: ", data.resp);
          this.userAppId = [];
          data.resp.forEach((el) => {
            if (el.id == 3 || el.id == 0) {
              this.userAppId.push(el);
            }
          });
        } else {
          this.commonMethod.errorMessage(data);
        }
        this.commonMethod.hideLoader();
      });
  }

  //assign appId and load offer
  stateChange(event: any) {
    this.appId = event.target.value;
    if (this.priveledge) this.getAccouncementsList();
    else showToastMessage("You Dont Have Priviledge To View The Data");
  }

  navigatePage() {
    this.commonDataService.submenuname = "addAnnouncement";
    this.router.navigateByUrl("/addAnnouncement");
  }

  /**
   * This function get all the active and inactive survey
   */
  getAccouncementsList() {
    this.commonMethod.showLoader(); /*** show loader */
    this.commonServiceCall
      .getResponsePromise(
        this.appConstants.getAccouncementsDetails + "/" + this.appId
      )
      .subscribe((data) => {
        var res = data.resp;
        this.commonMethod.destroyDataTable(); /*** Data table is destroyed */
        if (res.responseCode == "200") {
          this.addAuditTrailAdaptor(
            "Request:" +
              this.appConstants.apiURL.serviceURL_ESB +
              this.appConstants.getAccouncementsDetails +
              "/" +
              this.appId +
              "\n" +
              "Params={}",
            "view"
          );
          /*** responce is mapped to survey table*/
          this.announcementList = res.result;
          /*** Data table is initiallized */
          // this.commonMethod.setDataTable(this.commonServiceCall.pageName);
          setTimeout(function () {
            $("table.display").DataTable({
              dom: "lfrtipB",
              scrollY: "350px",
              scrollX: true,
              scrollCollapse: true,
              buttons: [
                {
                  extend: "excel",
                  className: "buttonsToHide",
                  title: "Announcement",
                  exportOptions: {
                    columns: [0, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                  },
                },
                {
                  extend: "pdf",
                  className: "buttonsToHide",
                  title: "Announcement",
                  orientation: "landscape",
                  pageSize: "LEGAL",
                  customize: function (doc) {
                    for (var i = 1; i < doc.content[1].table.body.length; i++) {
                      var smallImg = doc.content[1].table.body[i][2].text;
                      var bigImg = doc.content[1].table.body[i][3].text;

                      doc.content[1].table.body[i][2] = {
                        margin: [0, 0, 0, 12],
                        alignment: "center",
                        image: "data:image/png;base64," + smallImg,
                        height: 20,
                        width: 20,
                      };

                      doc.content[1].table.body[i][3] = {
                        margin: [0, 0, 0, 12],
                        alignment: "center",
                        image: "data:image/png;base64," + bigImg,
                        height: 20,
                        width: 20,
                      };
                    }
                  },
                },
                {
                  extend: "csv",
                  className: "buttonsToHide",
                  title: "Announcement",
                  exportOptions: {
                    columns: [0, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                  },
                },
              ],
            });
            /// for datatable css like vertical scrolling,buttons alignment and serach overlapping icon issue
            $("#dt-sample")
              .DataTable()
              .buttons(".buttonsToHide")
              .nodes()
              .css("display", "none");
            $(".dataTables_paginate").css({ width: "50%", float: "right" });
            $(".dataTables_length").css({
              float: "left",
              "margin-top": "10px",
            });
            $(".dataTables_info").css("float", "left");
            $(".dataTables_filter input").focus(function () {
              $(".dataTables_filter input").attr("type", "text");
            });
          });
          if (this.announcementList.length < 1) {
            showToastMessage("No Record Available");
            this.showTable = false;
          } else {
            this.showTable = true;
          }
          this.commonMethod.hideLoader();
        } else {
          /*** Data table is initiallized if no record available */
          setTimeout(function () {
            $("table.display").DataTable({
              language: {
                emptyTable: "No Data found",
              },
            });
          });
          this.commonMethod.hideLoader(); /*** hide loader */
          /*** function call if any error */
          this.errorCallBack(this.appConstants.getAccouncementsDetails, res);
        }
      });
  }

  filterRetailAnnounements() {
    return this.announcementList.filter(x => x.appId != 2);
  }

  /**
   * functionality to handel errors in api call
   * display error message in case of error
   */
  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  /**
   * Hide add survey form
   * reset add survey form
   * reload survey list
   */
  cancel() {
    this.showForm = !this.showForm;
    this.isAddButtonClicked = false;
    this.getAccouncementsList();
  }

  /**
   * This function is called on clicking of add button
   * used to show add survey form
   */
  showHideForm() {
    this.showForm = !this.showForm;
    this.isAddButtonClicked = true;
    setTimeout(() => {
      $("#sl_Survey").val("");
    });
  }

  getAnnouncementDtls(item) {
    console.log(item);
    if(item.statusName === 'ADMIN APPROVER PENDING' && this.commonDataService.roleType == this.commonDataService.makerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.commonDataService.submenuname = "announcementEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
      this.commonDataService.announcementData.createdon = item.createdon;
      this.router.navigateByUrl("/announcementEdit", { state: { id: item.id } });
    }
  }

  closeActionModel() {}
}
