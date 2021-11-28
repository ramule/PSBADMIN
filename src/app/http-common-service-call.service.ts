import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import * as $ from "jquery";
declare var showToastMessage: any;
import { AppConstants } from "./app-constants";
import { CommonDataShareService } from "./common-data-share.service";
import { CommonMethods } from "./common-methods";
import { EncryptDecryptService } from "./encrypt-decrypt.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class HttpCommonServiceCallService {
  authToken: any;
  userCredential: any;
  selectedNav: any;
  lastLogin: any;
  pageName: any;
  emailId: any;
  phonenumber: any;
  thumbnailstring: any;
  makerRequestEditUrl: any;

  constructor(
    private constants: AppConstants,
    private common: CommonMethods,
    private commonDataService: CommonDataShareService,
    private encryptDecryptService: EncryptDecryptService,
    public appConstants: AppConstants,
    public router: Router
  ) {}

  authResponsePromise(url, request): Observable<any> {
    var subject = new Subject<any>();

    var response;
    var myObj = this;
    console.log("req param: ", request);

    // ***************** to encrypt request data
    let encryptData = this.encryptDecryptService.encryptText(
      this.constants.staticKey,
      JSON.stringify(request)
    );
    console.log("encrypted data: ", encryptData);
    // *******************************************

    // ****************** to ensure our decryption method working fine with above encrypted req
    let decryptData = this.encryptDecryptService.decryptText(
      this.constants.staticKey,
      encryptData
    );
    console.log("decrypted data: ", decryptData);
    // ****************************************************************************************

    const requestObj = {
      map: encryptData,
    };
    try {
      $.ajax({
        crossDomain: true,
        type: "POST",
        dataType: "json",
        url: myObj.constants.apiURL.serviceURL_ESB + url,
        contentType: "application/json",
        data: requestObj == undefined ? "" : JSON.stringify(requestObj),
        // data: request == undefined ? '' : JSON.stringify(request),
        headers: {
          deviceId: "12",
        },
        async: true,
        timeout: 30000,
        success: function (data, status, request) {
          console.log("encrypted data: ", data);
          // var res = data.result;
          // console.log('res:', res);

          // Decrypt login response
          let decryptData = myObj.encryptDecryptService.decryptText(
            myObj.constants.staticKey,
            data.result
          );
          console.log("decrypted data: ", decryptData);
          data.result = JSON.parse(decryptData);

          var response = {
            status: true,
            resp: data,
          };
          console.log("response: ", response);
          subject.next(response);
          subject.complete();
        },
        error: function (data) {
          console.log("encrypted data: ", data);
          if (myObj.commonDataService.isOffline) {
            showToastMessage(
              "Device Is Offline. Please Check Your Internet Connection."
            );
            myObj.common.hideLoader();
          } else if (data.statusText == "timeout") {
            showToastMessage(
              "Unable To Connect To Server. Please Try After Sometime."
            );
            myObj.common.hideLoader();
          } else if (data.statusText == "Internal Server Error") {
            showToastMessage(data.statusText);
            myObj.common.hideLoader();
          } else {
            myObj.common.hideLoader();
            var response = {
              status: false,
              message: data.statusText,
            };
            //response = JSON.parse(data.responseJSON.toString());
            subject.next(response);
          }
          subject.complete();
        },
      });
    } catch (e) {
      subject.complete();
    }
    return subject.asObservable();
  }

  postResponsePromise(url, request?: any): Observable<any> {
    console.log("url: ", url);
    var subject = new Subject<any>();
    var response;
    var myObj = this;

    // ***************** to encrypt request data
    let encryptData = this.encryptDecryptService.encryptText(
      localStorage.getItem("sessionToken"),
      JSON.stringify(request)
    );
    console.log("encrypted data: ", encryptData);
    // *******************************************

    // ****************** to ensure our decryption method working fine with above encrypted req
    let decryptData = this.encryptDecryptService.decryptText(
      localStorage.getItem("sessionToken"),
      encryptData
    );
    console.log("decrypted data: ", decryptData);
    // ****************************************************************************************

    const requestObj = {
      map: encryptData,
    };

    try {
      $.ajax({
        crossDomain: true,
        type: "POST",
        dataType: "json",
        url: myObj.constants.apiURL.serviceURL_ESB + url,
        contentType: "application/json",
        data: requestObj == undefined ? "" : JSON.stringify(requestObj),
        // data: request == undefined ? "" : JSON.stringify(request),
        headers: {
          deviceId: localStorage.getItem("deviceToken"),
        },
        async: true,
        timeout: 30000,
        success: function (data, status, request) {
          console.log("success data: ", data);

          if (data["responseCode"] == 200 || data["responseCode"] == 202) {
            let decryptData = myObj.encryptDecryptService.decryptText(
              localStorage.getItem("sessionToken"),
              data.result
            );
            console.log("decrypted data: ", decryptData);
            data.result = JSON.parse(decryptData);

            response = {
              status: true,
              resp: data,
            };

            subject.next(response);
            subject.complete();
          }
          else if (data["responseCode"] == 92) {
            showToastMessage(data.responseMessage);
            myObj.router.navigateByUrl("/login");
            myObj.common.hideLoader();
          }
          else if(data["responseCode"] == 500) {
            showToastMessage(data.responseMessage);
            myObj.common.hideLoader();
          }
        },
        error: function (data) {
          console.log("error response", data);
          if (myObj.commonDataService.isOffline) {
            showToastMessage(
              "Device Is Offline. Please Check Your Internet Connection."
            );
            myObj.common.hideLoader();
          } else if (data.statusText == "timeout") {
            showToastMessage(
              "Unable To Connect To Server. Please Try After Sometime."
            );
            myObj.common.hideLoader();
          } else if (data.statusText == "Internal Server Error") {
            showToastMessage(data.statusText);
            myObj.common.hideLoader();
          } else {
            myObj.common.hideLoader();
            var response = {
              status: false,
              message: data.statusText,
            };
            //response = JSON.parse(data.responseJSON.toString());
            subject.next(response);
          }
          subject.complete();
        },
      });
    } catch (e) {
      subject.complete();
    }
    return subject.asObservable();
  }

  getResponsePromise(url, request?: any): Observable<any> {
    var newUrlIndex = getPosition(url, "/", 2);
    var encryptData = null;
    function getPosition(string, subString, index) {
      return string.split(subString, index).join(subString).length;
    }

    var newUrl = url.slice(0, newUrlIndex);
    console.log("", newUrl);

    console.log(getPosition(url, "/", 2));
    console.log(newUrlIndex);
    var param = null;
    console.log("url: ", url);
    var splittedUrl: any = [];

    for (var i = 2; i < 10; i++) {
      if (url.split("/")[i] != undefined) {
        splittedUrl[i - 2] = url.split("/")[i];
      }
    }
    console.log("splitted url: ", splittedUrl);
    console.log("splitted url length: ", splittedUrl.length);

    for (var j = 0; j < 5; j++) {
      if (
        splittedUrl[j] == undefined ||
        splittedUrl[j] == null ||
        splittedUrl[j] == ""
      ) {
        // return url;
      } else {
        if (splittedUrl.length == 1) {
          param = {
            id1: splittedUrl[0],
          };
        } else if (splittedUrl.length == 2) {
          param = {
            id1: splittedUrl[0],
            id2: splittedUrl[1],
          };
        } else if (splittedUrl.length == 3) {
          param = {
            id1: splittedUrl[0],
            id2: splittedUrl[1],
            id3: splittedUrl[2],
          };
        } else if (splittedUrl.length == 4) {
          param = {
            id1: splittedUrl[0],
            id2: splittedUrl[1],
            id3: splittedUrl[2],
            id4: splittedUrl[3],
          };
        } else {
          param = {
            id1: splittedUrl[0],
            id2: splittedUrl[1],
            id3: splittedUrl[2],
            id4: splittedUrl[3],
            id5: splittedUrl[4],
          };
        }
      }
    }
    console.log("params: ", param);
    var subject = new Subject<any>();
    var response;
    var myObj = this;

    if (param != null) {
      // ***************** to encrypt request data
      encryptData = this.encryptDecryptService.encryptText(
        localStorage.getItem("sessionToken"),
        JSON.stringify(param)
      );
      console.log("encrypted data: ", encryptData);
      // *******************************************

      // ****************** to ensure our decryption method working fine with above encrypted req
      let decryptData = this.encryptDecryptService.decryptText(
        localStorage.getItem("sessionToken"),
        encryptData
      );
      console.log("decrypted data: ", decryptData);
      // ****************************************************************************************
    }

    const requestObj = {
      map: encryptData,
    };

    try {
      $.ajax({
        crossDomain: true,
        type: "POST",
        dataType: "json",
        url: myObj.constants.apiURL.serviceURL_ESB + newUrl,
        data: requestObj == undefined ? "" : JSON.stringify(requestObj),
        contentType: "application/json",
        headers: {
          deviceId: localStorage.getItem("deviceToken"),
        },
        async: true,
        timeout: 30000,
        success: function (data, status, request) {
          console.log("success data: ", data);

          if (data["responseCode"] == 200 || data["responseCode"] == 202) {
            var decryptData = myObj.encryptDecryptService.decryptText(
              localStorage.getItem("sessionToken"),
              data.result
            );
            data.resp = JSON.parse(decryptData);
            data.result = JSON.parse(decryptData);
            console.log("decrypted data: ", decryptData);

            response = {
              status: true,
              resp: data,
            };

            subject.next(response);
            subject.complete();
          } else if (data["responseCode"] == 92) {
            showToastMessage(data.responseMessage);
            myObj.router.navigateByUrl("/login");
            myObj.common.hideLoader();
          }
          else if(data["responseCode"] == 500) {
            showToastMessage(data.responseMessage);
            myObj.common.hideLoader();
          }
          else {
            decryptData = myObj.encryptDecryptService.decryptText(
              localStorage.getItem("sessionToken"),
              data
            );
            console.log("decrypted data: ", decryptData);

            response = {
              status: true,
              resp: JSON.parse(decryptData),
            };

            subject.next(response);
            subject.complete();
          }
        },
        error: function (data) {
          console.log("error response", data);
          if (myObj.commonDataService.isOffline) {
            showToastMessage(
              "Device Is Offline. Please Check Your Internet Connection."
            );
            myObj.common.hideLoader();
          } else if (data.statusText == "timeout") {
            showToastMessage(
              "Unable To Connect To Server. Please Try After Sometime."
            );
            myObj.common.hideLoader();
          } else if (data.statusText == "Internal Server Error") {
            showToastMessage(data.statusText);
            myObj.common.hideLoader();
          } else {
            myObj.common.hideLoader();
            var response = {};
            try {
              response = {
                status: false,
                message: data.statusText,
              };
            } catch (e) {
              response = {
                status: false,
              };
            }
            subject.next(response);
          }
          subject.complete();
        },
      });
    } catch (e) {
      subject.complete();
    }
    return subject.asObservable();
  }

  postResponsePromiseFileUplaod(url, request?: any): Observable<any> {
    var subject = new Subject<any>();
    var response;
    var myObj = this;
    try {
      $.ajax({
        type: "POST",
        enctype: "multipart/form-data",
        url: this.constants.apiURL.serviceURL_ESB + url,
        data: request == undefined ? "" : request,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (data, status, request) {
          response = {
            status: true,
            resp: data,
          };
          subject.next(response);
          subject.complete();
        },
        error: function (data) {
          console.log("error response", data);
          myObj.common.hideLoader();
          var response = {
            status: false,
            code: data.responseJSON.code,
            message: data.responseJSON.desc,
            errorResp: data.responseJSON,
          };
          subject.next(response);
          subject.complete();
        },
      });
    } catch (e) {
      subject.complete();
    }
    return subject.asObservable();
  }

  postResponsePromiseFile(url, request?: any): Observable<any> {
    var subject = new Subject<any>();
    var response;
    var myObj = this;
    try {
      $.ajax({
        crossDomain: true,
        type: "POST",
        dataType: "json",
        url: this.constants.publicUrl.serviceURL_ESB_FILE + url,
        contentType: "application/json",
        data: request == undefined ? "" : JSON.stringify(request),
        async: true,
        timeout: 300000,
        success: function (data, status, request) {
          //response = JSON.parse(data);
          //response = data;

          response = {
            status: true,
            resp: data,
          };
          subject.next(response);
          subject.complete();
        },
        error: function (data) {
          console.log("error response", data);
          if (myObj.commonDataService.isOffline) {
            showToastMessage(
              "Device Is Offline. Please Check Your Internet Connection."
            );
            myObj.common.hideLoader();
          } else if (data.statusText == "timeout") {
            showToastMessage(
              "Unable To Connect To Server. Please Try After Sometime."
            );
            myObj.common.hideLoader();
          } else {
            myObj.common.hideLoader();
            var response = {
              status: false,
              code: data.responseJSON.code,
              message: data.responseJSON.desc,
              errorResp: data.responseJSON,
            };
            subject.next(response);
          }
          subject.complete();
        },
      });
    } catch (e) {
      subject.complete();
    }
    return subject.asObservable();
  }

  postResponseAuditTracking(url, request?: any): Observable<any> {
    var subject = new Subject<any>();
    var response;
    var myObj = this;
    try {
      $.ajax({
        crossDomain: true,
        type: "POST",
        dataType: "json",
        url: this.constants.apiURL.serviceURL_TrackAudit + url,
        contentType: "application/json",
        data: request == undefined ? "" : JSON.stringify(request),
        headers: {
          "X-AUTH-TOKEN": localStorage.getItem("authToken"),
        },
        async: true,
        timeout: 30000,
        success: function (data, status, request) {
          //response = JSON.parse(data);
          //response = data;

          response = {
            status: true,
            resp: data,
          };
          subject.next(response);
          subject.complete();
        },
        error: function (data) {
          console.log("error response", data);
          myObj.common.hideLoader();
          var response = {
            status: false,
            code: data.responseJSON.code,
            message: data.responseJSON.desc,
            errorResp: data.responseJSON,
          };
          subject.next(response);
          subject.complete();
        },
      });
    } catch (e) {
      subject.complete();
    }
    return subject.asObservable();
  }

  getClientIPAddress() {
    var subject = new Subject<any>();
    var response;
    var myObj = this;
    try {
      fetch("https://jsonip.com", { mode: "cors" })
        .then((resp) => resp.json())
        .then((response) => {
          myObj.commonDataService.user_IP = response.ip;
        });
    } catch (e) {
      console.log(e);
    }
  }
}
