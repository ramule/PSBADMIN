import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Location } from '@angular/common';

declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-master-customize-submenu',
  templateUrl: './master-customize-submenu.component.html',
  styleUrls: ['./master-customize-submenu.component.css']
})
export class MasterCustomizeSubmenuComponent implements OnInit {

  subMenuMasterArray = []
  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location
  ) { }

  ngOnInit() {
    this.commonServiceCall.pageName = "Customize Submenu Master";
    this.getAllSubMasterMenuDetails();
  }

  cancel() {
  }

  getAllSubMasterMenuDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getAllCustomizationSubMenuUrl).subscribe((data) => {
      $('#dt-sample').DataTable().clear().destroy();
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.subMenuMasterArray = res.result;
      } else {
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable" : "No Data found"
            }
          });
        })
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getAllCustomizationSubMenuUrl, res);
      }
    });

  }

  cancelClick(){
    this.router.navigateByUrl('masterCustomizeMenu');
  }

  gotoAddMasterCustomizeSubmenu() {
    this.router.navigateByUrl('mmasterCustomizeSubmenuAdd');
  }

  gotoMasterSubMenuDetails(item) {
    this.router.navigateByUrl("/masterCustomizeSubmenuEdit",{ state: { id: item.id} });
  }

  errorCallBack(fld, res) {
      this.commonMethod.errorMessage(res);
  }
}
