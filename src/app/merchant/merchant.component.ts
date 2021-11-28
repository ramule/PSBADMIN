import { Component, OnInit } from '@angular/core';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.css']
})
export class MerchantComponent implements OnInit {

  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
  ) { }

  ngOnInit(): void {
  }

}
