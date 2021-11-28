import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
declare var showToastMessage: any;
declare var device: any;
import { Injectable } from '@angular/core';
import { AppConstants } from './app-constants';
import { CommonDataShareService } from 'src/app/common-data-share.service';
declare var $ :any;
@Injectable({
  providedIn: 'root',
})
export class CommonMethods {
  [x: string]: any;
  loginRequestUrl: any;
  constructor(
    private router: Router,
    private appConstants: AppConstants,
    public commonDataService: CommonDataShareService,
  ) { }

  disableBack;
  validateEmpty(validateText) {
    return (validateText == undefined || validateText == '' || validateText == null || validateText == ' ' || validateText == "null")
  }

  hideLoader() {
    this.disableBack = false;
    $("#appLoader").hide();
  }

  showLoader() {
    this.disableBack = true;
    $("#appLoader").show();
  }


  errorMessage(resp) {
    if (resp.responseCode == 401) {
      // session expired
      showToastMessage('Your Session Has Been Expired');
    } else if (resp.responseCode == 102) {
      // enter valid login credential
      showToastMessage('Your Session Has Been Expired. Please Login Again');
      this.router.navigateByUrl('/login');
      sessionStorage.setItem('isLoggedIn', 'false');
    } else {
      console.log(resp);
      showToastMessage(resp.responseMessage);
    }
  }

  //need to delete
  errorMessage1(resp) {
    if (resp.code == 401) {
      // session expired
      showToastMessage('Your Session Has Been Expired');
    } else if (resp.code == 102) {
      // enter valid login credential
      showToastMessage('Your Session Has Been Expired. Please Login Again');
      this.router.navigateByUrl('/login');
      sessionStorage.setItem('isLoggedIn', 'false');
    } else if (resp.code == 103) {
      // enter valid login credential
      showToastMessage('Enter Valid Login Credential');
    } else if (resp.code == 199) {
      showToastMessage('Enter Valid Login Credential');
    } else {
      // Same user already logged in. Please try after some time.
      showToastMessage(
        'Same User Already Logged In. Please Try After Some Time'
      );
    }
  }


  cancel(){
    this.loginRequestUrl = "";
    this.router.navigateByUrl('/dashboard');
  }

  downLoadFile(type){
    switch (type) {
      case 'excel':
        $('.buttons-excel').click()
        break;
      case 'pdf':
        $('.buttons-pdf').click()
          break;
       case 'csv':
        $('.buttons-csv').click()
        break;

      default:
        break;
    }
  }

  /**
   * common function to initiallize data table
   */
  setDataTable(pagename){
    setTimeout(function () {
      $('table.display').DataTable({
        dom: 'lfrtipB',
        scrollY: "350px",
        scrollX: true,
        scrollCollapse: true,
        buttons: [
          {extend:'excel',className: 'buttonsToHide',title:pagename},
          {extend:'pdf',className: 'buttonsToHide',orientation : 'landscape',pageSize : 'LEGAL',title:pagename},
          {extend:'csv',className: 'buttonsToHide',title:pagename}
    ]
      });
      /// for datatable css like vertical scrolling,buttons alignment and serach overlapping icon issue
      $('#dt-sample').DataTable().buttons('.buttonsToHide').nodes().css("display", "none");
      $('#dt-sample1').DataTable().buttons('.buttonsToHide').nodes().css("display", "none");
      $('#dt-sample2').DataTable().buttons('.buttonsToHide').nodes().css("display", "none");
      $('#dt-sample3').DataTable().buttons('.buttonsToHide').nodes().css("display", "none");
      $('#dt-sample4').DataTable().buttons('.buttonsToHide').nodes().css("display", "none");
      $('#dt-sample5').DataTable().buttons('.buttonsToHide').nodes().css("display", "none");
      $('.dataTables_paginate').css({"width": "50%","float":"right"})
      $('.dataTables_length').css({"float":"left","margin-top":"10px"})
      $('.dataTables_info').css("float","left")
      $(".dataTables_filter input").focus(function(){
        $('.dataTables_filter input').attr('type', 'text');
      });
    })
  }

  setDataTableWithImages(pagename, col){
    setTimeout(function () {
      $('table.display').DataTable({
        dom: 'lfrtipB',
        scrollY: "350px",
        scrollX: true,
        scrollCollapse: true,
        buttons: [
          {extend:'excel',className: 'buttonsToHide',title:pagename, exportOptions: {
            columns: ':not(.notexport)'
        }},
          {extend:'pdf',className: 'buttonsToHide',orientation : 'landscape',pageSize : 'LEGAL',title:pagename, exportOptions: {
            columns: ':not(.notexport)'
        }},
          {extend:'csv',className: 'buttonsToHide',title:pagename, exportOptions: {
            columns: ':not(.notexport)'
        }}
    ]
      });
      /// for datatable css like vertical scrolling,buttons alignment and serach overlapping icon issue
      $('#dt-sample').DataTable().buttons('.buttonsToHide').nodes().css("display", "none");
      $('.dataTables_paginate').css({"width": "50%","float":"right"})
      $('.dataTables_length').css({"float":"left","margin-top":"10px"})
      $('.dataTables_info').css("float","left")
      $(".dataTables_filter input").focus(function(){
        $('.dataTables_filter input').attr('type', 'text');
      });
    })
  }

  setDataTable1(pagename){
    setTimeout(function () {
      $('table.display').DataTable({
        dom: 'lfrtipB',
        scrollY: "350px",
        scrollCollapse: true,
        buttons: [
          {extend:'excel',className: 'buttonsToHide',title:pagename,exportOptions: {
            columns: ':not(.notexport)'
        }},
          {extend:'pdf',className: 'buttonsToHide',orientation : 'landscape',pageSize : 'LEGAL',title:pagename,exportOptions: {
            columns: ':not(.notexport)'
        }},
          {extend:'csv',className: 'buttonsToHide',title:pagename,exportOptions: {
            columns: ':not(.notexport)'
        }}
    ]
      });
      $('#dt-sample').DataTable().buttons('.buttonsToHide').nodes().css("display", "none");
      $('#dt-sample1').DataTable().buttons('.buttonsToHide').nodes().css("display", "none");
      $('#dt-sample2').DataTable().buttons('.buttonsToHide').nodes().css("display", "none");
      $('#dt-sample3').DataTable().buttons('.buttonsToHide').nodes().css("display", "none");
      $('#dt-sample4').DataTable().buttons('.buttonsToHide').nodes().css("display", "none");
      $('#dt-sample5').DataTable().buttons('.buttonsToHide').nodes().css("display", "none");
      $('.dataTables_paginate').css({"width": "50%","float":"right"})
      $('.dataTables_length').css({"float":"left","margin-top":"10px"})
      $('.dataTables_info').css("float","left")
      $(".dataTables_filter input").focus(function(){
        $('.dataTables_filter input').attr('type', 'text');
      });
    })
  }

  setDataTableWithoutButtons(pagename){
    setTimeout(function () {
      $('table.display').DataTable({
        dom: 'lfrtip',
        scrollY: "350px",
        scrollCollapse: true,
      });
      $('#dt-sample').DataTable().buttons('.buttonsToHide').nodes().css("display", "none");
      $('.dataTables_paginate').css({"width": "50%","float":"right"})
      $('.dataTables_length').css({"float":"left","margin-top":"10px"})
      $('.dataTables_info').css("float","left")
      $(".dataTables_filter input").focus(function(){
        $('.dataTables_filter input').attr('type', 'text');
      });
    })
  }



  setDataTableWithoutPagination(pagename){
    setTimeout(function () {
      $('table.display').DataTable({
        dom: 'lfrtip',
        scrollY: "350px",
        scrollX: true,
        scrollCollapse: true,
        paging: false
      });
      $('#dt-sample').DataTable().buttons('.buttonsToHide').nodes().css("display", "none");
      $('.dataTables_paginate').css({"width": "50%","float":"right"})
      $('.dataTables_length').css({"float":"left","margin-top":"10px"})
      $('.dataTables_info').css("float","left")
      $(".dataTables_filter input").focus(function(){
        $('.dataTables_filter input').attr('type', 'text');
      });
    })
  }

  setDataTableWithoutEntries(pagename){
    setTimeout(function () {
      $('table.display').DataTable({
        scrollY: "350px",
        scrollCollapse: true,
        "searching": true,
        "ordering": true,
        "info": true,
        "lengthChange": false
      });
      $('#dt-sample').DataTable().buttons('.buttonsToHide').nodes().css("display", "none");
      $('.dataTables_paginate').css({"width": "50%","float":"right"})
      $('.dataTables_length').css({"float":"left","margin-top":"10px"})
      $('.dataTables_info').css("float","left")
      $('.dataTables_filter').css({"margin-left": "-87px"})
      $(".dataTables_filter input").focus(function(){
        $('.dataTables_filter input').attr('type', 'text');
      });
    })
  }

  setDataTableChat(id){
    setTimeout(function () {
      $('#'+id).DataTable({
        dom: 'frtip',
        scrollCollapse: true,
        searching: false
      });
    })
  }

   /**
   * common function to destroy data table
   */
  destroyDataTable() {
    $('#dt-sample').DataTable().clear().destroy();
  }

  destroyDataTable1() {
    $('#dt-sample1').DataTable().clear().destroy();
  }

  destroyDataTable2() {
    $('#dt-sample2').DataTable().clear().destroy();
  }

  maskMobileNumber(mobNumber) {
    var temp = "x";
    var num = mobNumber.toString().length - 4;
    for (var i = 1; i < num; i++) {
      temp = temp + "x";
    }
    temp = mobNumber.toString().substring(0, 2) + temp + mobNumber.toString().substring((mobNumber).toString().length - 2, (mobNumber).toString().length);
    return temp;
  }

  showNoDataFoundInDataTable(){
    setTimeout(function () {
      $('table.display').DataTable({
        "language": {
          "emptyTable" : "No Data found"
        }})});
  }

  getBase64FromFile(file): Observable<any> {
    var subject = new Subject<any>();
    var fr = new FileReader();

    fr.onload = (e: any) => {
      subject.next(e.target.result);
      subject.complete();
    };

    fr.readAsDataURL(file);
    return subject.asObservable();
  }

  ///method to get browser name
  getBrowserName()
  {
    var navUserAgent = navigator.userAgent;
    var browserName  = navigator.appName;
    var browserVersion  = ''+parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion,10);
    var tempNameOffset,tempVersionOffset,tempVersion;


    if ((tempVersionOffset=navUserAgent.indexOf("Opera"))!=-1) {
    browserName = "Opera";
    browserVersion = navUserAgent.substring(tempVersionOffset+6);
    if ((tempVersionOffset=navUserAgent.indexOf("Version"))!=-1)
      browserVersion = navUserAgent.substring(tempVersionOffset+8);
    } else if ((tempVersionOffset=navUserAgent.indexOf("MSIE"))!=-1) {
    browserName = "Microsoft Internet Explorer";
    browserVersion = navUserAgent.substring(tempVersionOffset+5);
    } else if ((tempVersionOffset=navUserAgent.indexOf("Chrome"))!=-1) {
    browserName = "Chrome";
    browserVersion = navUserAgent.substring(tempVersionOffset+7);
    } else if ((tempVersionOffset=navUserAgent.indexOf("Safari"))!=-1) {
    browserName = "Safari";
    browserVersion = navUserAgent.substring(tempVersionOffset+7);
    if ((tempVersionOffset=navUserAgent.indexOf("Version"))!=-1)
      browserVersion = navUserAgent.substring(tempVersionOffset+8);
    } else if ((tempVersionOffset=navUserAgent.indexOf("Firefox"))!=-1) {
    browserName = "Firefox";
    browserVersion = navUserAgent.substring(tempVersionOffset+8);
    } else if ( (tempNameOffset=navUserAgent.lastIndexOf(' ')+1) < (tempVersionOffset=navUserAgent.lastIndexOf('/')) ) {
    browserName = navUserAgent.substring(tempNameOffset,tempVersionOffset);
    browserVersion = navUserAgent.substring(tempVersionOffset+1);
    if (browserName.toLowerCase()==browserName.toUpperCase()) {
      browserName = navigator.appName;
    }
    }

    // trim version
    if ((tempVersion=browserVersion.indexOf(";"))!=-1)
      browserVersion=browserVersion.substring(0,tempVersion);
    if ((tempVersion=browserVersion.indexOf(" "))!=-1)
      browserVersion=browserVersion.substring(0,tempVersion);

return browserName
  }

  getOSName()
  {
    var OS = window.navigator.platform ;
    return OS
  }

  getLatLon()
  {
      var self = this
      navigator.geolocation.getCurrentPosition(function(position) {
          var positionInfo = "Your current position is (" + "Latitude: " + position.coords.latitude + ", " + "Longitude: " + position.coords.longitude + ")";
          self.commonDataService.user_lat = JSON.stringify(position.coords.latitude)
          self.commonDataService.user_lon = JSON.stringify(position.coords.longitude)

      });

  }
}


