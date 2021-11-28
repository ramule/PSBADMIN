import { Component, OnInit } from '@angular/core';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonMethods } from '../common-methods';
import { CommonDataShareService } from '../common-data-share.service';
import { AppConstants } from '../app-constants';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  menuLink = "services";
  priviledgeDataArr: any = [];
  p: number = 1;
  statusArr = [];
  statusId;
  selectedId: any = [];
  selectedValue;
  userData: any = [];
  stateChangeStatus = false;
  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
    public commonMethod: CommonMethods,
    private commonDataService: CommonDataShareService,
    private router: Router,
    public appConstants: AppConstants,
    public location:Location
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Services";
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.getStatus();
    this.getLeftMenuId();
    this.commonMethod.hideLoader();
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

  getPriviledgeData(id) {
    var url = this.appConstants.getPriviledgeDataUrl + id+"/"+this.commonDataService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if(!this.priviledgeDataArr.viewChecked) {
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
        var param = {
        "ChannelName": "DESKTOP",
        "channelRequest": URL,
        "eventName":'Services',
        "category":"Service Request",
        "action":operation,
        "properties":URL,
        "IP":this.commonDataService.user_IP,
        "X-FORWARDEDIP":this.commonDataService.user_IP,
        "Lat":this.commonDataService.user_lat,
        "Lon":this.commonDataService.user_lon,
        "Browser":this.commonMethod.getBrowserName(),
        "Device":"",
        "OS":this.commonMethod.getOSName(),
        "CHANNELID":"4",
        "CREATEDBY":this.commonDataService.user_ID,
        "CREATEDBYNAME":this.commonDataService.user_Name,
         "UPDATEDBY":this.commonDataService.user_ID,
        "UPDATEDBYNAME":this.commonDataService.user_Name,
        "authorization":"0"
}
        console.log(param)
        this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
        })
    }

  cancel() {
    this.commonMethod.cancel();
  }

  getStatus() {
    this.commonServiceCall.getResponsePromise(this.appConstants.masterStatusUrl).subscribe(data => {
      if (data.status) {
        console.log('Data resp: ', data.resp);
        this.statusArr = data.resp;
        console.log(this.statusArr);
      } else {
        this.commonMethod.errorMessage(data);
      }
    });
  }

  filterStatus()
  {
    return this.statusArr.filter(x => x.shortName == 'APPROVED' || x.shortName == 'PENDING' || x.shortName == 'REJECTED' || x.shortName == 'DELETED');
  }

  stateChange(event: any) {
    $('#dt-sample').DataTable().clear().destroy();
    this.commonMethod.showLoader();
    this.statusId = event.target.value;
    this.commonServiceCall.getResponsePromise(this.appConstants.getTicket + "/" + this.statusId).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
         this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.getTicket + "/" + this.statusId+"\n"+"Params={}",'view')
        // this.userData = res.result;

        res.result.forEach(element => {
          if(element.shortname != "CORPORATE") {
            this.userData.push(element);
          }
        });

        console.log(this.userData);
        console.log(this.userData.length);
        //initiallize datatable
        this.commonMethod.setDataTable(this.commonServiceCall.pageName);
        if (this.userData.length > 0) {
          this.stateChangeStatus = true;
        }
        else {
          showToastMessage("No Record Found");
          this.stateChangeStatus = false;
        }
        this.commonMethod.hideLoader();
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCustomerDetails, res);
      }
    });
  }

  cancelClick() {
    this.commonMethod.cancel();
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  onEdit(item: any) {
    console.log(item);
    if(item.statusname === 'ADMIN APPROVER PENDING' && this.commonDataService.roleType == this.commonDataService.makerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.commonDataService.services.id = item.id;
      this.router.navigateByUrl('/servicesDtl');
      this.commonDataService.submenuname = "servicesDtl";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
    }
  }

}
