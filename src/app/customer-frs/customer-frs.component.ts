import { Component, OnInit } from '@angular/core';
import { HttpCommonServiceCallService} from '../http-common-service-call.service'

@Component({
  selector: 'app-customer-frs',
  templateUrl: './customer-frs.component.html',
  styleUrls: ['./customer-frs.component.css']
})
export class CustomerFrsComponent implements OnInit {

  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
  ) { }

  ngOnInit(): void {
  }

}
