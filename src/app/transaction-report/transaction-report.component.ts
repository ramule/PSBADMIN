import { Component, OnInit } from '@angular/core';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';

@Component({
  selector: 'app-transaction-report',
  templateUrl: './transaction-report.component.html',
  styleUrls: ['./transaction-report.component.css']
})
export class TransactionReportComponent implements OnInit {

  constructor(
    public commonServiceCall: HttpCommonServiceCallService
  ) { }

  ngOnInit() {
    this.commonServiceCall.pageName = "Transaction Report";
  }

}
