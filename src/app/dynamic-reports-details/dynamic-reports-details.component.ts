import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
import { DynamicReportsDetailsService } from './dynamic-reports-details.service';


declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-dynamic-reports-details',
  templateUrl: './dynamic-reports-details.component.html',
  styleUrls: ['./dynamic-reports-details.component.css']
})
export class DynamicReportsDetailsComponent implements OnInit {
  reportDetailsArray: any =[];
  priviledgeDataArr: any =[];
  menuLink="dynamicReports"
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    public dynamicService:DynamicReportsDetailsService
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Reports";
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    //this.getCorporateMenuDetails()
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
            this.getDynamicReportsDetails();
          }
          else {
            showToastMessage('You Dont Have Priviledge To View The Data');
          }
        } else {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      });
    }

       /* Insert tracking for user activities*/
    addAuditTrailAdaptor(URL,operation)
    {
        var param = this.dynamicService.addAuditTrailAdaptorParams(URL,operation);
        console.log(param)
        this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
        })
    }


  getDynamicReportsDetails()
  {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getAllSubReportDetailsUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.reportDetailsArray = res.result;
        console.log('sub report details array: ', this.reportDetailsArray);
          this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.getAllSubReportDetailsUrl+"\n"+"Params={}",'view')
      } else {
       this.errorCallBack(this.appConstants.getAllCorpMenus, res);
      }
      this.commonMethod.hideLoader();
      $('#dt-sample').DataTable().clear().destroy();
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  gotoAddDynamicReports(){
    this.router.navigateByUrl("/dynamicReportsDetailsAdd");
    this.commonDataShareService.submenuname = "dynamicReportsDetailsAdd";
  }

  gotoEditDynamicReports(item) {
    console.log(item);
    this.commonDataShareService.dynamicReports.createdOn = item.createdon;
    this.router.navigateByUrl("/dynamicReportsDetailsEdit",{ state: { id: item.id} });
    this.commonDataShareService.submenuname = "dynamicReportsDetailsEdit";
    this.commonServiceCall.makerRequestEditUrl = this.router.url;
  }

  cancelClick() {
    this.commonMethod.cancel();
  }

}
