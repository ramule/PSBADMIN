import { Component, OnInit } from '@angular/core';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';

@Component({
  selector: 'app-bill-payment',
  templateUrl: './bill-payment.component.html',
  styleUrls: ['./bill-payment.component.css']
})
export class BillPaymentComponent implements OnInit {

  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
  ) { }

  ngOnInit(): void {
  }

}
