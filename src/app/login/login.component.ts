import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { AppConstants } from "../app-constants";
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { FormValidationsService } from "../form-validations.service";
import { CommonMethods } from "../common-methods";
import { LoginService } from "./login.service";
import { CommonDataShareService } from "../common-data-share.service";
import { DatePipe } from "@angular/common";
import { EncryptDecryptService } from "../encrypt-decrypt.service";
import { param } from "jquery";
import { timer } from "rxjs";
//import { environment } from "src/environments/environment.prod";
//import { timer } from "rxjs";

declare var showToastMessage: any;
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  [x: string]: any;
  isBometric: boolean = false;
  loginForm: FormGroup;
  //captchaCheck:boolean = false; 
  loginUserType: any = "OMNI";
  sessionDecryptKey: any;
  adUserType: boolean = false;
  authenticationLabel: any = "OMNI";
  isOtpLable: boolean = false;
  loginInto: any = [];
  loginResponseArr: any = [];
  siteKeyVal: any = "6LcgrRkbAAAAAC59dt4ENMtvzUsqn8a9J-CUQpp3";
  config:any = { 
       type:1,
       length:6, 
       cssClass:'custom', 
       back: {  
         stroke:"#007c3d",  
         solid:"#007c3d"   
     } , 
       font:{
            color:"#000000", 
           size:"35px"   
     } 
   };
  
  //recaptcha:;
  // loginInto: any = [
  //   {
  //     value: 'UPI',
  //     id: 'UPI'
  //   },
  //   {
  //     value: 'IMPS',
  //     id: 'IMPS'
  //   },
  //   {
  //     value: 'MERCHANT',
  //     id: 'MERCHANT'
  //   },
  //   {
  //     value: 'WINDOWS AUTHENTICATION',
  //     id: 'AD'
  //   },
  //   {
  //     value: 'OMNI',
  //     id: 'OMNI'
  //   }
  // ]
  formErrors = {
    username: "",
    password: "",
    recaptcha: "",
    loginInto: "",
    cn: "",
    otp: ""
  };

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    private loginService: LoginService,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public datepipe: DatePipe,
    private location: Location,
    public encryptDecryptService: EncryptDecryptService
  ) {}

  public buildForm() {
    this.loginForm = this.form.group({
  // cn: new FormControl("", [Validators.required]),
   username: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]+$/)]),
 //username:new FormControl('',[Validators.required,Validators.pattern.preg_replace("/[^A-Za-z0-9 ]/", '', String)]),

 // username: new FormControl('', [Validators.required, Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)]),
 
    
  password: new FormControl("", [Validators.required]),
  recaptcha: new FormControl("",[Validators.required] ), 
      // loginInto: new FormControl('', [Validators.required]),
    });
  
    this.loginForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.loginForm,
        this.formErrors,
        true
      );
    });

    // if(this.showCapcha){
    //   this.loginForm.get('recaptcha')?.setValidators([Validators.required]);
    //   this.loginForm.get('recaptcha').updateValueAndValidity();
    //   }else{
    //     this.loginForm.get('recaptcha').clearValidators();
    //     this.loginForm.get('recaptcha').updateValueAndValidity();
    //   }
  
  }

  ngOnInit() {
    this.buildForm();
    this.createCaptcha();
    
     
    
    // if(environment.production){
    //   this.showCaptcha = true;
    // }
    // if(this.showCaptcha){
    //   this.createCaptcha();
    // }
   this.validateCaptcha();
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.commonMethod.hideLoader();
    this.commonServiceCall.getClientIPAddress();
    // this.commonDataShareService.user_IP = '172.25.3.3';
    this.commonMethod.getLatLon();
    // this.getUserType()
  }

  getProductType(){
    this.commonServiceCall.getResponsePromise(this.appConstants.masterListUrl).subscribe(data => {
      if(data.status){
        console.log("roles",data.resp);
        this.commonDataShareService.productTypes = data.resp;
      }
      else{
        this.commonMethod.errorMessage(data);
      }
    })
  }

  getUserType() {
    this.loginInto = [];
    this.commonServiceCall
      .getResponsePromise(this.appConstants.getUserLoginTypes)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          var data = res.result;
          data.forEach((element) => {
            var arrData = {
              value: element.usertype,
              id: element.usertype,
            };
            this.loginInto.push(arrData);
          });
        } else {
          this.errorCallBack(this.appConstants.getUserLoginTypes, res);
        }
      });
  }

  loginIntoFunction() {
    this.loginForm.get('password').reset();
    if(this.authenticationLabel == 'OMNI') {
      this.authenticationLabel = 'Active Directory Login'
    }
    else {
      this.authenticationLabel = 'OMNI'
    }
    this.loginUserType = this.authenticationLabel;
    console.log(this.loginUserType);

    if (this.loginUserType != "OMNI") {
      this.loginForm.addControl(
        "cn",
        new FormControl("", [Validators.required])
      );
      this.loginForm.removeControl("username");
      this.adUserType = true;
    } else {
      this.loginForm.addControl(
        "username",
        new FormControl("", [Validators.required])
      );
      this.loginForm.removeControl("cn");
      this.adUserType = false;
    }
  }

  onUserTypeChange(event) {
    if (event.target.value == "AD") {
      this.loginForm.addControl(
        "cn",
        new FormControl("", [Validators.required])
      );
      this.loginForm.removeControl("username");
      this.adUserType = true;
    } else {
      this.loginForm.addControl(
        "username",
        new FormControl("", [Validators.required])
      );
      this.loginForm.removeControl("cn");
      this.adUserType = false;
    }
  }

  /* Method to login using Active Directory user */
  apiCallADLogin(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .authResponsePromise(this.appConstants.validateUserUrl, param)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          //get lat long of user
          this.commonMethod.getLatLon();
          //get IP Address of user
          // this.commonServiceCall
          //   .getClientIPAddress("", "")
          //   .subscribe((data) => {
          //     this.commonDataShareService.user_IP = data.resp.ip;
          //   });
          console.log(res);
          this.commonDataShareService.user_ID = res.result.user_ID;
          this.commonDataShareService.user_Name = res.result.userid;
          this.commonDataShareService.roleId = res.result.role_ID;
          this.commonServiceCall.userCredential = JSON.stringify(res.result);
          this.commonServiceCall.lastLogin = this.datepipe.transform(
            res.result.userlastlogin,
            "dd MMM yyyy, h:mm:ss a"
          );
          this.commonServiceCall.emailId = res.result.email;
          this.commonServiceCall.thumbnailstring = res.result.thumbnailstring;
          //24 Jun 2018, 20:45:08
          sessionStorage.setItem("roleId", res.result.role_ID);
          sessionStorage.setItem("userCredential", JSON.stringify(res.result));
          sessionStorage.setItem("isLoggedIn", "true");

          this.getMenuList();
        } else {
          this.loginForm.patchValue({
            cn: "",
            password: "",
          });
          this.formErrors.cn = "";
          this.formErrors.password = "";

          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.validateUserUrl, res);
         // this.validateCaptcha();
        }
      });
  }

  //api call
  goToDashboard() {
    //var captchaValue = document.getElementById('captcha')
//alert(this.code)
    var param: any = "";
    this.formValidation.markFormGroupTouched(this.loginForm);
   
    if(this.loginForm.get('recaptcha').hasError('required')) {
      showToastMessage('Please verify Captcha');
      return;
    }
    if (this.loginForm.valid && this.loginForm.value.recaptcha == this.code) {

      /* Encryption of password to MD5 and store in sessionDecryptKey */
      // this.sessionDecryptKey =
      //   this.loginForm.value.username +
      //   this.appConstants.sessionEncryptKey +
      //   this.encryptDecryptService.createMD5Value(
      //     this.loginForm.value.password
      //   );

      /* Encryption of password to SHA256 and store in sessionDecryptKey */
      this.sessionDecryptKey =
        this.loginForm.value.username +
        this.appConstants.sessionEncryptKey +
        this.encryptDecryptService.createSHA256Value(
          this.loginForm.value.password
        );

      console.log('SHA256 password: ', this.encryptDecryptService.createSHA256Value(this.loginForm.value.password));
      console.log(this.loginForm.value);
      // var userType = this.loginForm.get('loginInto').value;
      if (this.loginUserType == "Active Directory Login") {
        param = this.loginService.getADLoginCredential(this.loginForm.value);
        this.apiCallADLogin(param);
      } else if (this.loginUserType == "OMNI") {
        param = this.loginService.getLoginCredential(this.loginForm.value);
        this.apicallLogin(param);
        
      }
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.loginForm,
        this.formErrors,
        false
      );
    }
  }

  


  // validateCaptcha() {
  //   if(this.txtUsername.value.recaptcha == this.recaptcha) {
         
  //     alert("Captcha is validated successfully")
     
  //   }
  //   else {
  //     if(this.txtUsername.value.recaptcha != '') {
  //       alert("Please enter a valid captcha")
  //     }
  //   }
  // }


  /* Method to login using Admin user */
  apicallLogin(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .authResponsePromise(this.appConstants.loginUrl, param)
      .subscribe((data) => {

        var res = data.resp;
        console.log('data: ', data);
        console.log('login res: ', res);
        if (res.responseCode == "200") {

          showToastMessage('OTP generated and sent to registered email/mobile number');
          this.isOtpLable = true;

          this.loginForm.controls["username"].setValidators([]);
          this.loginForm.controls["username"].updateValueAndValidity();

          this.loginForm.controls["password"].setValidators([]);
          this.loginForm.controls["password"].updateValueAndValidity();

          this.loginForm.controls["recaptcha"].setValidators([]);
          this.loginForm.controls["recaptcha"].updateValueAndValidity();


          this.loginForm.addControl('otp', new FormControl('', [Validators.required]));

          $('#txtUsername').hide();
          $('#txtPwd').hide();
          $('#txtOtp').show();
          //get lat long of user

          this.commonMethod.getLatLon();
    localStorage.setItem("sessionToken", res.result.sessionToken);

    localStorage.setItem("deviceToken", res.result.deviceToken);

    this.commonDataShareService.user_ID = res.result.user_ID;
    // localStorage.setItem('user_ID', res.result.user_ID);

    // this.commonDataShareService.username = res.result.userid;
    // localStorage.setItem('username', res.result.userid);

    // this.commonDataShareService.user_Name =
    //   res.result.first_NAME + " " + res.result.last_NAME;
    // localStorage.setItem('user_Name', res.result.first_NAME + " " + res.result.last_NAME);

    // this.commonDataShareService.roleId = res.result.role_ID;
    // localStorage.setItem('roleId', res.result.role_ID);

    // this.commonDataShareService.roleName = res.result.role;
    // localStorage.setItem('roleName', res.result.role);

    // this.commonDataShareService.roleTypeId = res.result.roletype;
    // localStorage.setItem('roleTypeId', res.result.roletype);

    // this.commonDataShareService.roleType = res.result.roleTypeName;
    // localStorage.setItem('roleType', res.result.roleTypeName);

    // this.commonServiceCall.userCredential = JSON.stringify(res.result);
    // localStorage.setItem('userCredential', JSON.stringify(res.result));

    // this.commonServiceCall.lastLogin = this.datepipe.transform(
    //   res.result.userlastlogin,
    //   "dd MMM yyyy, h:mm:ss a"
    // );
    // localStorage.setItem('lastLogin', this.datepipe.transform(res.result.userlastlogin,"dd MMM yyyy, h:mm:ss a"));

    this.commonServiceCall.emailId = res.result.email;
    this.commonServiceCall.phonenumber = res.result.phonenumber;
    // localStorage.setItem('emailId', res.result.email);

    // this.commonServiceCall.thumbnailstring = res.result.thumbnailstring;
    // localStorage.setItem('thumbnailstring', res.result.thumbnailstring);

    // sessionStorage.setItem("roleId", res.result.role_ID);
    // sessionStorage.setItem("userCredential", JSON.stringify(res.result));
    // sessionStorage.setItem("isLoggedIn", "true");
          console.log(res);
          this.loginResponseArr = res;
          console.log('login response array: ', this.loginResponseArr);

          this.commonDataShareService.loginOTP = res.result.otp;

          this.commonMethod.hideLoader();
          // this.getMenuList();
          // this.getProductType();
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.loginUrl, res);
        }
      });
  }

  setDataToLocalStorgageAndCommonData(res) {

    console.log('res: ', res);
    // this.commonMethod.getLatLon();
    // localStorage.setItem("sessionToken", res.result.sessionToken);

    // localStorage.setItem("deviceToken", res.result.deviceToken);

    this.commonDataShareService.user_ID = res.result.user_ID;
    localStorage.setItem('user_ID', res.result.user_ID);

    this.commonDataShareService.username = res.result.userid;
    localStorage.setItem('username', res.result.userid);

    this.commonDataShareService.user_Name =
      res.result.first_NAME + " " + res.result.last_NAME;
    localStorage.setItem('user_Name', res.result.first_NAME + " " + res.result.last_NAME);

    this.commonDataShareService.roleId = res.result.role_ID;
    localStorage.setItem('roleId', res.result.role_ID);

    this.commonDataShareService.roleName = res.result.role;
    localStorage.setItem('roleName', res.result.role);

    this.commonDataShareService.roleTypeId = res.result.roletype;
    localStorage.setItem('roleTypeId', res.result.roletype);

    this.commonDataShareService.roleType = res.result.roleTypeName;
    localStorage.setItem('roleType', res.result.roleTypeName);

    this.commonServiceCall.userCredential = JSON.stringify(res.result);
    localStorage.setItem('userCredential', JSON.stringify(res.result));

    this.commonServiceCall.lastLogin = this.datepipe.transform(
      res.result.userlastlogin,
      "dd MMM yyyy, h:mm:ss a"
    );
    localStorage.setItem('lastLogin', this.datepipe.transform(res.result.userlastlogin,"dd MMM yyyy, h:mm:ss a"));

    // this.commonServiceCall.emailId = res.result.email;
    localStorage.setItem('emailId', res.result.email);

    this.commonServiceCall.thumbnailstring = res.result.thumbnailstring;
    localStorage.setItem('thumbnailstring', res.result.thumbnailstring);

    sessionStorage.setItem("roleId", res.result.role_ID);
    sessionStorage.setItem("userCredential", JSON.stringify(res.result));
    sessionStorage.setItem("isLoggedIn", "true");
  }

  validateOtp() {

    if (this.loginForm.valid && this.loginForm.value.recaptcha == this.code) {

      var param = this.loginService.validateOtpCall(this.loginForm.value);
      this.commonMethod.showLoader();
      this.commonServiceCall
      .postResponsePromise(this.appConstants.validateLoginOtpUrl, param)
      .subscribe((data) => {

        var res = data.resp;
        console.log('data: ', data);
        console.log('login res: ', res);
        if (res.responseCode == "200") {
          this.setDataToLocalStorgageAndCommonData(this.loginResponseArr);
        //  showToastMessage(res.responseMessage);
          this.getMenuList();
          this.getProductType();
        } else {
          this.loginForm.get('otp').reset();
          this.errorCallBack(this.appConstants.validateLoginOtpUrl, res);
        }
        this.commonMethod.hideLoader();
      });
    }
    else {
      this.formErrors = this.formValidation.validateForm(
        this.loginForm,
        this.formErrors,
        false
      );
    }
  }

  /* Method to get menu list */
  getMenuList() {
    var roleId = this.commonDataShareService.roleTypeId;
    console.log("menu role id", roleId);
    var req = this.appConstants.findAllLeftMenuUrl + roleId;
    this.commonServiceCall.getResponsePromise(req).subscribe((data) => {
      this.commonMethod.hideLoader();
      if (data.status) {
        console.log(data);
        var isValidUser = false;
        data.resp.result.forEach((el) => {
          if (el.menuName == this.loginForm.value.loginInto) {
            isValidUser = true;
          }
        });

        if (
          isValidUser ||
          this.loginUserType == "OMNI" ||
          this.loginUserType == "AD"
        ) {
          //condition to be changed
          this.commonMethod.loginRequestUrl = this.router.url;
          this.router.navigateByUrl("/dashboard");
        } else {
          showToastMessage("You Are Not An Authorized User");
          this.logout();
        }
      } else {
        showToastMessage("Your Session Has Been Expired. Please Login Again");
        this.router.navigateByUrl("/login");
        //this.router.navigateByUrl("/dashboard");
      }
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  logout() {
    var params = {
      "userid": this.commonDataShareService.user_ID
    }
    this.commonServiceCall
      .postResponsePromise(this.appConstants.logoutUrl, params)
      .subscribe((resp) => {
        localStorage.clear();
        this.commonServiceCall.userCredential = {};
        sessionStorage.setItem("userCredential", "");
        sessionStorage.setItem("isLoggedIn", "false");
      });
  }

  onBackToLogin() {
    this.isOtpLable = false;
    this.loginForm.removeControl('otp');
    this.loginForm.reset();
    
  }

  onResendOTP() {
    var param = this.loginService.resendOtpCall();
    console.log(param);
    this.commonMethod.showLoader();
    this.commonServiceCall
    .postResponsePromise(this.appConstants.resendOtpActivationCodeUrl, param)
    .subscribe((data) => {

      var res = data.resp;
      console.log('data: ', data);
      console.log('login res: ', res);
      if (res.responseCode == "200") {
        this.loginForm.get('otp').reset();
        showToastMessage(res.responseMessage);
      } else {
        this.errorCallBack(this.appConstants.resendOtpActivationCodeUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  createCaptcha() {
    //clear the contents of captcha div first
    document.getElementById('captcha').innerHTML = "";
    var charsArray =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lengthOtp = 6;
    var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
      //below code will not allow Repetition of Characters
      var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
      if (captcha.indexOf(charsArray[index]) == -1)
        captcha.push(charsArray[index]);
      else i--;
    }
    var canv = document.createElement("canvas");
    canv.id = "captcha";
    canv.width = 200;
    canv.height = 50;
  
    var ctx = canv.getContext("2d");
    
    ctx.font = "35px Georgia";
    ctx.fillStyle = '#007c3d';
    canv.style.letterSpacing = 25 + "px";
    
    ctx.fillText(captcha.join(""), 40 , 40);
    
    if (this.config.back.stroke) {
      ctx.strokeStyle = this.config.back.stroke;
      for (var i = 0; i < 100; i++) {
        ctx.moveTo(Math.random() * 300, Math.random() * 300);
        ctx.lineTo(Math.random() * 300, Math.random() * 300);
      }
      ctx.stroke();
    }
    //storing captcha so that can validate you can save it somewhere else according to your specific requirements
    this.code = captcha.join("");
    document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
  }


  
closeCaptchaPopup(){ 
  this.captchaExpire=true;    
  this.LoginForm.controls.username.reset()
  this.LoginForm.controls.password.reset()    
  this.LoginForm.controls.captcha.reset()
  this.createCaptcha();  
  this.captchaCounter();    // this.captchaError="";  
  this.commonMethod.closePopup('div.popup-bottom');  // this.captchaError="";
  }


startCounter(){
  this.counter = 120;
  if (this.countDown  && !this.countDown.closed) { this.countDown.unsubscribe(); }
  this.countDown = timer(0, this.tick).subscribe(() => { if(this.counter == 1) this.countDown.unsubscribe(); --this.counter });
}
captchaCounter(){
  this.capCounter = 180;
  if (this.countDown  && !this.countDown.closed) { this.countDown.unsubscribe(); }
  this.countDown = timer(0, this.tick).subscribe(() => { if(this.capCounter == 1) this.countDown.unsubscribe(); --this.capCounter
    if(this.capCounter == 0){
    this.LoginForm.controls.username.reset()
    this.LoginForm.controls.password.reset()
    this.LoginForm.controls.captcha.reset()
    this.createCaptcha();
  }
  });
}


alphaNumericOnly(event){
  var inp = String.fromCharCode(event.keyCode);
  if(/[a-zA-Z0-9]/.test(inp)){
    return true;
  }
  else{
    event.preventDefault();
    return false;
  }
}


 
  
  
  

  playCaptcha() {
    var msg = new SpeechSynthesisUtterance(this.code.split('').join(' '));
    msg.pitch = 800;
    window.speechSynthesis.speak(msg);
  }

  

  validateCaptcha() {
  
    // this.captchaTimeout();
   // this.validateForm(); 
   // if(this.showCapcha) {
      if(this.loginForm.value.recaptcha == this.code) {
      
  
          //  this.apicallLogin(param);
          // this.goToDashboard();
       
      }
      else {
          // if(this.loginForm.value.recaptcha !='') {
           this.loginForm.controls.recaptcha.reset()
         //this.apicallLogin(param);
          //this.validateForm();
      }
    } 

  

  }


  
  
