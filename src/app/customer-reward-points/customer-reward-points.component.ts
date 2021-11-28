import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
declare var showToastMessage: any;
declare var $: any
@Component({
  selector: 'app-customer-reward-points',
  templateUrl: './customer-reward-points.component.html',
  styleUrls: ['./customer-reward-points.component.css']
})
export class CustomerRewardPointsComponent implements OnInit {

  custRewardMasterArr = [];
  p: number = 1;

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    public appConstant: AppConstants
  ) { }



  ngOnInit() {
    this.commonServiceCall.pageName = "Customer Reward Points";
    this.getCustomerRewardPoints();
  }


  cancelClick() {
    this.router.navigateByUrl('/dashboard');
  }

  getCustomerRewardPoints() {
    $('#dt-sample').DataTable().clear().destroy();
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstant.getCustRewardPoints).subscribe((data) => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.commonMethod.setDataTable(this.commonServiceCall.pageName);
        this.custRewardMasterArr = res.result;
      } else {
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable": "No Data found"
            }
          });
        })
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.getCustRewardPoints, res);
      }
    });
  }


  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

}
