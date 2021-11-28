import { Component, OnInit } from '@angular/core';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';

@Component({
  selector: 'app-imps',
  templateUrl: './imps.component.html',
  styleUrls: ['./imps.component.css']
})
export class ImpsComponent implements OnInit {

  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
  ) { }

  ngOnInit(): void {
  }

}
