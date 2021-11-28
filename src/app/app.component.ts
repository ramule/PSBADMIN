import { Component, HostListener } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { AppConstants } from "./app-constants";
import { CommonDataShareService } from "./common-data-share.service";
import { HttpCommonServiceCallService } from "./http-common-service-call.service";
import { Subscription } from 'rxjs';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
export let browserRefresh = false;
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  subscription: Subscription;
  constructor(
    public router: Router,
    public commonDataServiceCall: CommonDataShareService,
    public appConstants: AppConstants,
    public commonServiceCall: HttpCommonServiceCallService
  ) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
  });
  }
  title = "PSBADMIN";

  ngOnInit() {
    var self = this;
    document.addEventListener(
      "deviceready",
      function () {
        self.router.navigateByUrl("/login");
      },
      false
    );
    // self.watchIdleSession();

    document.addEventListener("pause", function () {}, false);
    document.addEventListener("resume", function () {}, false);
    document.addEventListener("offline", function () {}, false);
    document.addEventListener("online", function () {}, false);

    /* Idle Browser Timeout */
    // var idle_time = 180;
    var idle_seconds_counter = 0;

    document.onclick = function () {
      self.commonDataServiceCall.idle_session_time = 180;
    };

    document.onmousemove = function () {
      if(self.commonDataServiceCall.idle_session_time > 60) {
        self.commonDataServiceCall.idle_session_time = 180;
      }
    };

    document.onkeypress = function () {
      self.commonDataServiceCall.idle_session_time = 180;
    };

    idle_seconds_counter = window.setInterval(checkIdleTime, 1000);

    function checkIdleTime() {
      if (self.router.url != "/login" && self.router.url != "/forgotPassword" && self.router.url != '/resetPassword') {
        idle_seconds_counter++;
        if(self.commonDataServiceCall.idle_session_time > 0) {
          self.commonDataServiceCall.idle_session_time--;

          // console.log('idle session time: ', self.commonDataServiceCall.idle_session_time);
          // console.log('session counter: ', idle_seconds_counter);
          if (self.commonDataServiceCall.idle_session_time <= 60) {
            $("#exampleModal").modal({
              show: true,
            });
          }
        }
        else {
          self.logout();
          $('#exampleModal').modal('hide');
          return;
          // showToastMessage("YOUR SESSION HAS BEEN EXPIRED.");
        }
      }
    }

    setInterval(() => {
      if (self.router.url != "/login" && self.router.url != "/forgotPassword" && self.router.url != '/resetPassword') {
        this.commonServiceCall.pageName = this.commonServiceCall.pageName.toUpperCase();
      }
    }, 1000);
  }

  /*
  watchIdleSession() {
    var self = this;
    var idle_seconds_alive_counter = 0;

    idle_seconds_alive_counter = window.setInterval(checkIdleAliveTime, 1000);

    function checkIdleAliveTime() {
      if (self.router.url != "/login") {
        idle_seconds_alive_counter++;
        if(self.commonDataServiceCall.idle_session_time > 0) {
          self.commonDataServiceCall.idle_session_time--;
          if (self.commonDataServiceCall.idle_session_time <= 60) {
            $("#exampleModal").modal({
              show: true,
            });
          }
        }
        else {
          self.logout();
          $('#exampleModal').modal('hide');
          showToastMessage("YOUR SESSION HAS BEEN EXPIRED.");
          setTimeout(() => {
            self.commonDataServiceCall.idle_session_time = 180;
          }, 2000);
        }
      }
    }
  }
  */

  onModalClose() {
    $("#exampleModal").modal({
      show: false,
    });
  }

  keepSessionAlive() {
    this.commonDataServiceCall.idle_session_time = 180;
  }

  onLogoutClicked() {
    this.logout();
    this.commonDataServiceCall.idle_session_time = 180;
  }

  logout() {
    var params = {
      userid: this.commonDataServiceCall.user_ID,
    };
    this.commonServiceCall
      .postResponsePromise(this.appConstants.logoutUrl, params)
      .subscribe((resp) => {
        console.log(resp);
        localStorage.clear();
        this.commonServiceCall.userCredential = {};
        this.router.navigateByUrl("/login");
        sessionStorage.setItem("isLoggedIn", "false");
        sessionStorage.setItem("userCredential", "");
        if (resp.status) {
        } else {
        }
      });
  }
}
