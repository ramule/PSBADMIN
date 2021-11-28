import { Component, OnInit } from '@angular/core';
import { CommonMethods } from '../common-methods';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';

@Component({
  selector: 'app-admin-notification',
  templateUrl: './admin-notification.component.html',
  styleUrls: ['./admin-notification.component.css']
})
export class AdminNotificationComponent implements OnInit {

  constructor(
    public commonMethod:CommonMethods,
    public commonServiceCall: HttpCommonServiceCallService,
    ) { }

  ngOnInit(): void {
  }

  cancel(){
    this.commonMethod.cancel();
  }
}
