import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { CommonDataShareService } from "../common-data-share.service";
import { CommonMethods } from "../common-methods";
import { AppConstants } from "../app-constants";
declare var showToastMessage: any;
@Component({
  selector: "app-navmenu",
  templateUrl: "./navmenu.component.html",
  styleUrls: ["./navmenu.component.css"],
})
export class NavmenuComponent implements OnInit {
  public token = sessionStorage.getItem("authToken");
  public menuItems: any[];
  public selectedPage;
  profile_base64: any;
  profile_file: any;
  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
    private router: Router,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    public appConstant: AppConstants
  ) {}

  ngOnInit() {
    this.getMenuList();

    /* The data will load into variables on page refresh */
    this.commonDataShareService.user_ID = localStorage.getItem('user_ID');
    this.commonDataShareService.username = localStorage.getItem('username');
    this.commonDataShareService.user_Name = localStorage.getItem('user_Name');
    this.commonDataShareService.roleId = localStorage.getItem('roleId');;
    this.commonDataShareService.roleName = localStorage.getItem('roleName');
    this.commonDataShareService.roleTypeId = localStorage.getItem('roleTypeId');
    this.commonDataShareService.roleType = localStorage.getItem('roleType');
    this.commonServiceCall.userCredential = localStorage.getItem('userCredential');
    this.commonServiceCall.lastLogin = localStorage.getItem('lastLogin');
    this.commonServiceCall.emailId = localStorage.getItem('emailId');
    this.commonServiceCall.thumbnailstring = localStorage.getItem('thumbnailstring');
  }

  toggleSection(index) {
    this.menuItems[index].open = !this.menuItems[index].open;
    if (this.menuItems && this.menuItems[index].open) {
      this.menuItems
        .filter((item, itemIndex) => itemIndex != index)
        .map((item) => (item.open = false));
    }
  }

  logout() {
    var params = {
      "userid": this.commonDataShareService.user_ID
    }
    this.commonServiceCall.postResponsePromise(this.appConstant.logoutUrl, params).subscribe((resp) => {
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

  /* This method calls on page load to get Menu list */
  getMenuList() {
    // var roleId = this.commonDataShareService.roleTypeId;
    var roleId = localStorage.getItem('roleTypeId');
    if (roleId == undefined) {
      this.router.navigateByUrl("/login");
      return;
    }
    console.log("menu role id", roleId);
    var req = this.appConstant.findAllLeftMenuUrl + roleId;
    this.commonServiceCall.getResponsePromise(req).subscribe((data) => {
      if (data.status) {
        this.menuItems = data.resp.result;
        this.menuItems[0].open = false;
        console.log("menuItems", this.menuItems);
        localStorage.setItem("menuArray",JSON.stringify(this.menuItems))
      } else {
        // showToastMessage("Your Session Has Been Expired. Please Login Again");
        this.router.navigateByUrl("/login");
      }
    });
  }

  gotoPage(pageName) {
    console.log(pageName);
    this.selectedPage = pageName;
    this.commonDataShareService.selectedNav = pageName;
    this.router.navigateByUrl("/" + pageName.menuLink);
  }

  /* Method to redirect to profile page */
  addProfileImage(event: any) {
    this.commonDataShareService.routeUrl = "";
    this.router.navigateByUrl("/adminEditUser", {
      state: { id: this.commonDataShareService.user_ID },
    });
  }

  /*Method to convert image into file format*/
  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
}
