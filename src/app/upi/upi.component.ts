import { Component, OnInit } from '@angular/core';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';

@Component({
  selector: 'app-upi',
  templateUrl: './upi.component.html',
  styleUrls: ['./upi.component.css']
})
export class UpiComponent implements OnInit {

  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
  ) { }

  ngOnInit(): void {
  }

}
