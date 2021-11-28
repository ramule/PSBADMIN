import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
import { CorporateMenuService } from './corporate-menu.service';
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-corporate-menu',
  templateUrl: './corporate-menu.component.html',
  styleUrls: ['./corporate-menu.component.css']
})
export class CorporateMenuComponent implements OnInit {

  corporateMenuMaster: any =[];
  priviledgeDataArr: any =[];
  menuLink="corporateMenu"
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    public corpMenuService:CorporateMenuService
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Corporate Menu";
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
            this.getCorporateMenuDetails();
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
        var param = this.corpMenuService.addAuditTrailAdaptorParams(URL,operation);
        console.log(param)
        this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
        })
    }


  getCorporateMenuDetails()
  {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getAllCorpMenus).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.corporateMenuMaster = res.result;
        console.log('Corporate Menu Master array: ', this.corporateMenuMaster);
          this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.getAllCorpMenus+"\n"+"Params={}",'view')
      } else {
        this.commonMethod.hideLoader();
       // this.errorCallBack(this.appConstants.getAllCorpMenus, res);
      }
      $('#dt-sample').DataTable().clear().destroy();
    });
  }



  gotoAddCorporateMenu(){
    this.router.navigateByUrl("/corporateMenuAdd");
    this.commonDataShareService.submenuname = "corporateMenuAdd";
  }

  gotoEditCorporateMenu(item) {
    console.log(item);
    if(item.statusName === 'CORP_APPROVER_PENDING' && this.commonDataShareService.roleType == this.commonDataShareService.corpMakerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.commonDataShareService.corpCompanyMenu.createdOn = item.createdon;
      this.router.navigateByUrl("/corporateMenuEdit",{ state: { id: item.id} });
      this.commonDataShareService.submenuname = "corporateMenuEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
    }
  }

  cancelClick() {
    this.commonMethod.cancel();
  }

}
