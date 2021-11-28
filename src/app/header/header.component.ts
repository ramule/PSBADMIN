import { Component, OnInit } from '@angular/core';
import { HttpCommonServiceCallService } from '../http-common-service-call.service'
import { Router } from '@angular/router';
import { CommonDataShareService } from '../common-data-share.service';
import { AppConstants } from '../app-constants';
declare function openTinyModel2(): any;
declare function closeTinyModel2(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  selModel: any;
  thumbnailstring: any;
  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
    private router: Router,
    public commonDataServiceCall: CommonDataShareService,
    private appConstants: AppConstants
  ) { }

  ngOnInit(){
    this.thumbnailstring = this.commonServiceCall.thumbnailstring != undefined && this.commonServiceCall.thumbnailstring != null && this.commonServiceCall.thumbnailstring != '' ? this.commonServiceCall.thumbnailstring : localStorage.getItem('thumbnailstring');
  }

  fullScreen() {
    // var elem = document.documentElement;
    // elem.requestFullscreen();

    const elem = document.documentElement as HTMLElement & {
      mozRequestFullScreen(): Promise<void>;
      webkitRequestFullscreen(): Promise<void>;
      msRequestFullscreen(): Promise<void>;
    };

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  /* Method to redirect to profile page */
  addProfileImage() {
    this.commonDataServiceCall.routeUrl = "";
    this.router.navigateByUrl("/adminEditUser", {
      state: { id: this.commonDataServiceCall.user_ID != undefined ? this.commonDataServiceCall.user_ID : localStorage.getItem('user_ID') },
    });
  }

  closeActionModel() {
    this.selModel = "";
    closeTinyModel2();
  }

  openModelToDeleteRole() {
    this.selModel = "logoutUser"
    openTinyModel2();
  }

  logout() {
    var params = {
      "userid": this.commonDataServiceCall.user_ID != undefined ? this.commonDataServiceCall.user_ID : localStorage.getItem('user_ID')
    }
    this.commonServiceCall.postResponsePromise(this.appConstants.logoutUrl, params).subscribe((resp) => {
      console.log(resp);
      localStorage.clear();
      this.commonServiceCall.userCredential = {};
      this.router.navigateByUrl('/login');
      sessionStorage.setItem('isLoggedIn', 'false');
      sessionStorage.setItem('userCredential','');
      this.commonDataServiceCall.idle_session_time = 180;
      if (resp.status) {
        // this.commonServiceCall.authToken = '';

      } else {
      }
    });
  }

}
