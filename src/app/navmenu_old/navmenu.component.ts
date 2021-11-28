import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent implements OnInit {

  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
    private commonData: CommonDataShareService,
    private router: Router,
    private appConstants: AppConstants
  ) { }

  ngOnInit(): void {
  }

  logout() {
    var params = {
      "userid": this.commonData.user_ID
    }
    this.commonServiceCall.postResponsePromise(this.appConstants.logoutUrl, params).subscribe(resp => {
      console.log(resp);
      if (resp.status) {
        // this.commonServiceCall.authToken = '';
        localStorage.clear();
        this.commonServiceCall.userCredential = {};
        sessionStorage.setItem('userCredential','');
        this.router.navigateByUrl('/login');
      } else {
      }
    });
  }

}
