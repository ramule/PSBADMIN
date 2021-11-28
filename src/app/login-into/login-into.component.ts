import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { element } from 'protractor';
import { CommonDataShareService } from '../common-data-share.service';

declare var showToastMessage: any;
@Component({
  selector: 'app-login-into',
  templateUrl: './login-into.component.html',
  styleUrls: ['./login-into.component.css']
})
export class LoginIntoComponent implements OnInit {
  loginInto: any;
  loginIntoData: any = [
    {
      value : 'UPI',
      id : 'UPI',
      status : false
    },
    {
      value : 'IMPS',
      id : 'IMPS',
      status : false
    },
    {
      value : 'MERCHANT',
      id : 'MERCHANT',
      status : false
    },
    {
      value : 'BILL PAYMENT',
      id : 'BILLPAYMENT',
      status : false
    },
    {
      value : 'OMNI',
      id : 'OMNI',
      status : false
    }
  ];

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService
  ) { }

  ngOnInit(): void {
    this.getMenuList();
  }


  getMenuList() {
    var roleId = this.commonDataShareService.roleId;
    if(roleId == undefined){
      this.router.navigateByUrl('/login');
      return;
    }
    console.log('menu role id', roleId);
    var req = 'menu/findAllLeftMenu/' + roleId;
    this.commonServiceCall.getResponsePromise(req).subscribe((data) => {
      if (data.status) {
        console.log(data);
          this.loginIntoData.forEach(element => {
            data.resp.forEach(el => {
              if(element.id == el.menuName){
                element.status = true;
              }
            });
        });

        this.loginInto = this.loginIntoData;
        console.log("this.loginInto ======>",this.loginInto);
      } else {
        showToastMessage('Your Session Has Been Expired. Please Login Again');
      }
    });
  }

  goToPage(pageName:any){
    console.log(pageName);
    this.router.navigateByUrl("/"+pageName);
  }

}
