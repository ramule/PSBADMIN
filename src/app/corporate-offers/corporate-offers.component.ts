import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Location } from '@angular/common';
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-corporate-offers',
  templateUrl: './corporate-offers.component.html',
  styleUrls: ['./corporate-offers.component.css']
})
export class CorporateOffersComponent implements OnInit {

  showForm: boolean = false;
  p: number = 1;

  userAppId: any = [];
  productType: any = [];
  appId: any;
  showTable: boolean = false;
  custOfferMasters: any = [];

  priviledgeDataArr: any = [];
  priveledge: any;
  menuLink = "corporateOffers";

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonMethod: CommonMethods,
    public appConstants: AppConstants,
    private commonDataService: CommonDataShareService,
    private location: Location
  ) { }



  ngOnInit() {
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.commonServiceCall.pageName = "Corporate Offer";
    this.getStatus();
    this.getProductType();
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
        this.commonDataService.submenuId = res.result[0].id;
        id = res.result[0].id;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

  //get priviledge
  getPriviledgeData(id) {
    var url = this.appConstants.getPriviledgeDataUrl + id + "/" + this.commonDataService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if (this.priviledgeDataArr.viewChecked) {
          this.priveledge = true
        }
        else {
          showToastMessage('You Dont Have Priviledge To View The Data');
          this.priveledge = false
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
        this.priveledge = false
      }
    });
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = {
      "ChannelName": "DESKTOP",
      "channelRequest": URL,
      "eventName": 'Corporate Offers',
      "category": "Corporate",
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
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }


  gotoAddOffer() {
    this.commonDataService.submenuname = "corporateOffersAdd";
    this.router.navigateByUrl("/corporateOffersAdd");
  }

  getCustOfferDtl(item) {
    console.log(item);
    if (item.statusName === 'CORP_APPROVER_PENDING' && this.commonDataService.roleType == this.commonDataService.corpMakerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.commonDataService.submenuname = "corporateOffersEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
      this.commonDataService.offerData.createdon = item.createdon;
      this.router.navigateByUrl("/corporateOffersEdit", { state: { id: item.id } });
    }
  }

  //load all appId
  getStatus() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.masterStatusUrl).subscribe(data => {
      if (data.status) {
        console.log('Data resp: ', data.resp);
        this.userAppId = [];
        data.resp.forEach(el => {
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

  getProductType() {
    this.commonServiceCall.getResponsePromise(this.appConstants.masterListUrl).subscribe(data => {
      if (data.status) {
        console.log("roles", data.resp);
        this.productType = data.resp;
      }
      else {
        this.commonMethod.errorMessage(data);
      }

    })
  }

  //assign appId and load offer
  stateChange(event: any) {
    this.appId = event.target.value;
    console.log(this.appId);
    if (this.priveledge)
      this.getOfferDtl();
    else
      showToastMessage('You Dont Have Priviledge To View The Data');
  }



  //get offer list
  getOfferDtl() {
    $('#dt-sample').DataTable().clear().destroy();
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getOfferDetails + "/" + this.appId).subscribe(data => {
      console.log(data);
      var res = data.resp;
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getOfferDetails + "/" + this.appId + "\n" + "Params={}", 'view')
        //initiallize datatable
        setTimeout(function () {
          $('table.display').DataTable({
            dom: 'lfrtipB',
            scrollY: "350px",
            scrollX: true,
            scrollCollapse: true,
            buttons: [
              {
                extend: 'excel', className: 'buttonsToHide', title: 'Offer', exportOptions: {
                  columns: [0, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                }
              },
              {
                extend: 'pdf', className: 'buttonsToHide', title: 'Offer', orientation: 'landscape', pageSize: 'LEGAL',
                customize: function (doc) {
                  for (var i = 1; i < doc.content[1].table.body.length; i++) {

                    var smallImg = doc.content[1].table.body[i][1].text;
                    var bigImg = doc.content[1].table.body[i][2].text;


                    doc.content[1].table.body[i][1] = {
                      margin: [0, 0, 0, 12],
                      alignment: 'center',
                      image: 'data:image/png;base64,' + smallImg,
                      height: 20,
                      width: 20
                    };

                    doc.content[1].table.body[i][2] = {
                      margin: [0, 0, 0, 12],
                      alignment: 'center',
                      image: 'data:image/png;base64,' + bigImg,
                      height: 20,
                      width: 20
                    };
                  }
                }

              },
              {
                extend: 'csv', className: 'buttonsToHide', title: 'Offer', exportOptions: {
                  columns: [0, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                }
              }
            ]
          });
          /// for datatable css like vertical scrolling,buttons alignment and serach overlapping icon issue
          $('#dt-sample').DataTable().buttons('.buttonsToHide').nodes().css("display", "none");
          $('.dataTables_paginate').css({ "width": "50%", "float": "right" })
          $('.dataTables_length').css({ "float": "left", "margin-top": "10px" })
          $('.dataTables_info').css("float", "left")
          $(".dataTables_filter input").focus(function () {
            $('.dataTables_filter input').attr('type', 'text');
          });
        })
        this.custOfferMasters = [];
        this.custOfferMasters = res.result;
        if (this.custOfferMasters.length < 1) {
          showToastMessage("No Record Available");
          this.showTable = false;
        }
        else {
          this.showTable = true;
        }
        this.commonMethod.hideLoader();
      } else {
        $('table.display').DataTable({
          "language": {
            "emptyTable": "No Data found"
          }
        });
        this.commonMethod.hideLoader();
        this.showTable = false;
        this.errorCallBack(this.appConstants.getCustomerDetails, res);
      }
    })
  }

  filterCorporateOffers() {
    return this.custOfferMasters.filter(x => x.appId == 2);
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

}
