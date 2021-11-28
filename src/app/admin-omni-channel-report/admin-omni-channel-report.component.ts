import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service'
import { CommonMethods } from '../common-methods';

declare var showToastMessage: any;
@Component({
  selector: 'app-admin-omni-channel-report',
  templateUrl: './admin-omni-channel-report.component.html',
  styleUrls: ['./admin-omni-channel-report.component.css']
})
export class AdminOmniChannelReportComponent implements OnInit {

  Status: any = [];
  omniChannelReport: any = [];
  showTable: boolean = false;
  statusError: boolean = false;


  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }

  ngOnInit() {
    this.getStatus();
  }


  cancel() {
    this.commonMethod.cancel();
  }


  //onload
  getStatus() {
    var url = 'message/getStatus'
    this.commonServiceCall.getResponsePromise(url).subscribe(data => {
      if (data.status) {
        this.Status = data.resp
      }
      else {

      }

    })
  }



  selectedStatus(roleId) {
    if (roleId == '') {
      this.showTable = false;
      return;
    }

    this.showTable = true;
    var url = 'omniChannel/getOmniChannelRequestReport/' + roleId
    this.commonServiceCall.getResponsePromise(url).subscribe(data => {
      if (data.status) {
        this.omniChannelReport = data.resp;
      }
      else {

      }

    })
  }

  addCharges() {

  }


}
