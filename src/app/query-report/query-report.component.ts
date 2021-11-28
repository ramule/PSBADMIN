import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../app-constants';
import { CommonMethods } from '../common-methods';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-query-report',
  templateUrl: './query-report.component.html',
  styleUrls: ['./query-report.component.css']
})
export class QueryReportComponent implements OnInit {

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
  ) { }

  ngOnInit() {
    this.commonServiceCall.pageName = "Query Report"
  }

}
