import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
declare var showToastMessage: any;

@Component({
  selector: 'app-customer-wise-balance',
  templateUrl: './customer-wise-balance.component.html',
  styleUrls: ['./customer-wise-balance.component.css']
})
export class CustomerWiseBalanceComponent implements OnInit {

  p: number = 1;
  customerWiseDtl: any = []

  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.getCustomerWiseBalance();
  }


  getCustomerWiseBalance(){
    var req = 'transaction/getCustomerwiseBalance';
    this.commonServiceCall.postResponsePromise(req).subscribe(data => {
      console.log(data);
      if (data.status) {
        console.log(data.resp);
        this.customerWiseDtl = data.resp;
      }
      else {
        showToastMessage("Master Load Error");
      }

    })
  }

  //https://infrabotsdev.infrasofttech.com/UploadOffer/transaction/getCustomerwiseBalance == post
}
