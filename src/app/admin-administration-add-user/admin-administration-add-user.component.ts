import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { AppConstants } from "../app-constants";
import { CommonMethods } from "../common-methods";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { FormValidationsService } from "../form-validations.service";
import { AdminAdministrationAddUserService } from "./admin-administration-add-user.service";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { CommonDataShareService } from "../common-data-share.service";
import { Router } from "@angular/router";

declare var showToastMessage: any;

@Component({
  selector: "app-admin-administration-add-user",
  templateUrl: "./admin-administration-add-user.component.html",
  styleUrls: ["./admin-administration-add-user.component.css"],
})
export class AdminAdministrationAddUserComponent implements OnInit {
  @ViewChild('smallImg', {static: false})
  smallImgInputVar: ElementRef;

  addUserForm: FormGroup;
  roleid: any;
  roleType: any;
  formErrors = {
    userId: "",
    fname: "",
    lname: "",
    emailId: "",
    phoneNo: "",
    productType: "",
    userType: "",
    smallImage: "",
  };

  roles: any = [];

  isSmallImgError: boolean = false;
  isValidSmallFileFormat: boolean = false;
  isValidSmallSizeFileFormat: boolean = false;
  smallImage: any;
  smallImageValue: File;
  images = {
    smallImage: "",
    largeImage: "",
  };
  formData: any;
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public adminAddUser: AdminAdministrationAddUserService,
    public appConstants: AppConstants,
    public commonMethod: CommonMethods
  ) { }

  public buildForm() {
    this.addUserForm = this.form.group({
      userId: new FormControl("", [
        Validators.required,
        ,
        Validators.pattern(/^[a-zA-Z0-9 ]+$/),
      ]),
      fname: new FormControl("", [Validators.required]),
      lname: new FormControl("", [Validators.required]),
      phoneNo: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      emailId: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
        Validators.pattern(/^[a-z]+[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,6}$/),
      ]),
      productType: new FormControl("", [Validators.required]),
      userType: new FormControl("OMNI", [Validators.required]),
      smallImage: new FormControl(""),
      roleType: new FormControl(""),
    });
    this.addUserForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.addUserForm,
        this.formErrors,
        true
      );
    });
  }

  ngOnInit() {
    this.commonServiceCall.pageName = "Add New User";
    this.buildForm();
    this.getRoles();
  } /* Insert tracking for user activities*/

  addAuditTrailAdaptor(URL, operation) {
    var param = this.adminAddUser.addAuditTrailAdaptorParams(URL, operation);
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => { });
  }

  //on load functions
  getRoles() {
    this.commonMethod.showLoader();
    var param = this.adminAddUser.getRoleTypeIdCall();
    console.log('role type id param: ', param);
    this.commonServiceCall.postResponsePromise(this.appConstants.getActiveRoles, param).subscribe((data) => {
        var res = data.resp;
        this.commonMethod.hideLoader();
        if (data.status) {
          console.log("roles", data.resp);
          this.roles = res.result;
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.getActiveRoles, res);
        }
      });
  }

  onRoleChange(event) {
    this.roleid = event.target.value;
    console.log(this.roleid);
  }

  add() {
    this.isSmallImgError = false;
    this.isValidSmallFileFormat = false;
    if (this.addUserForm.get("smallImage").value == "") {
      this.isSmallImgError = true;
    }
    this.formValidation.markFormGroupTouched(this.addUserForm);
    if (this.addUserForm.valid) {
      var formData = this.addUserForm.value;
      // if(this.isSmallImgError == true){ return;}
      if (this.isValidSmallSizeFileFormat == true) {
        return;
      }

      this.formData = this.addUserForm.value;
      // const _formData = new FormData();
      // _formData.append("file1", this.addUserForm.get("smallImage").value);
      // _formData.append("file2", this.addUserForm.get("smallImage").value);
      // this.uploadImg(_formData);

      var inputData = this.adminAddUser.getAdduserParam(
        this.addUserForm.value,
        this.images
      );
      this.addUserMaster(inputData);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.addUserForm,
        this.formErrors,
        false
      );
    }
  }

  /*
  uploadImg(param) {
    this.commonServiceCall
      .postResponsePromiseFileUplaod(this.appConstants.uploadFile, param)
      .subscribe((data) => {
        console.log(data);
        if (data.status) {
          var inputData = this.adminAddUser.getAdduserParam(
            this.addUserForm.value,
            data.resp
          );
          this.addUserMaster(inputData);
        } else {
          showToastMessage("Error In File Upload");
        }
      });
  }
  */

  cancel() {
    this.router.navigateByUrl("/administration");
  }

  addUserMaster(param) {
    console.log("adding user: ", param);
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.addUserDetails, param)
      .subscribe((data) => {
        var res = data.resp;
        console.log("add user response: ", res);
        if (res.responseCode == "200") {
          console.log(res);
          this.commonMethod.hideLoader();
          showToastMessage("User Has Been Added Successfully");
          this.addAuditTrailAdaptor(
            "Request:" +
            this.appConstants.apiURL.serviceURL_ESB +
            this.appConstants.addUserDetails +
            "\n" +
            "Params=" +
            JSON.stringify(param),
            "add"
          );
          this.router.navigateByUrl("/administration");
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.addUserDetails, res);
        }
      });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  addImage(event: any, type) {
    console.log("inside");
    console.log(event);

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log(file);
      if (
        event.target.files[0].type == "image/jpeg" ||
        event.target.files[0].type == "image/png"
      ) {
        this.commonMethod.getBase64FromFile(file);
      } else {
        if (type == "small") {
          this.isValidSmallFileFormat = true;
          this.isValidSmallSizeFileFormat = false;
        }
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        var img = new Image();
        var me = this;
        img.src = window.URL.createObjectURL(file);
        img.onload = function () {
          console.log(img);
          var width = img.naturalWidth,
            height = img.naturalHeight;
          if (type == "small") {
            if (width > 128 || height > 80) {
              me.isValidSmallSizeFileFormat = true;
              me.isValidSmallFileFormat = false;
            } else {
              me.smallImage = e.target.result;
              me.commonMethod.getBase64FromFile(file).subscribe((base64) => {
                me.images.smallImage = base64;
              });
              me.addUserForm.get("smallImage").setValue(file);
              me.isSmallImgError = false;
              me.isValidSmallSizeFileFormat = false;
              me.isValidSmallFileFormat = false;
            }
          }
        };
      };

      reader.readAsDataURL(file);
    }
  }

  onImgDelete() {
    this.smallImage = "";
    this.images.smallImage = "";
    this.smallImgInputVar.nativeElement.value = "";
  }

  alphaNumericOnly(event){
    var inp = String.fromCharCode(event.keyCode);
    if(/[a-zA-Z0-9-_ ]/.test(inp)){
      return true;
    }
    else{
      event.preventDefault();
      return false;
    }
  }

}
