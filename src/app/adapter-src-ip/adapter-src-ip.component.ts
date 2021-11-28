import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { FormValidationsService } from "../form-validations.service";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { CommonDataShareService } from "../common-data-share.service";
import { Router } from "@angular/router";
import { CommonMethods } from "../common-methods";
import { AppConstants } from "../app-constants";
import { AdapterSrcIpService } from "./adapter-src-ip.service";
import { Location } from "@angular/common";
declare var showToastMessage: any;
declare var $: any;
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
@Component({
  selector: "app-adapter-src-ip",
  templateUrl: "./adapter-src-ip.component.html",
  styleUrls: ["./adapter-src-ip.component.css"],
})
export class AdapterSrcIpComponent implements OnInit {
  public href: string = "";
  public url: any = "";
  formErrors = {
    adapterChannel: "",
    sourceIp: "",
    status: "",
    remark: "",
    remarkDelete: "",
  };
  adapterSrcIpFields = {
    adapterChannel: "",
    sourceIp: "",
    status: "",
  };
  adapterSourceIpForm: FormGroup;
  remarkForm: FormGroup;
  remarkDeleteForm: FormGroup;
  showForm: boolean = false;
  isAddButtonClicked = false;
  selModel: any;
  roleId: any;
  selChannelToDelete;
  adapterSourceIpDetails = [];
  adapterSourceChannelDetails = [];
  productTypes: any = [];
  menuItems = [];
  priviledgeDataArr: any = [];
  adapterStatus: any = [];
  // id = "68";
  menuLink = "adapterSrcIp";
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    private adapterSourceIpService: AdapterSrcIpService
  ) { }

  public buildForm() {
    this.adapterSourceIpForm = this.form.group({
      adapterChannel: new FormControl("", [Validators.required]),
      sourceIp: new FormControl("", [
        Validators.required,
        Validators.pattern(
          /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
        ),
      ]),
      status: new FormControl("", [Validators.required]),
    });
    this.adapterSourceIpForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.adapterSourceIpForm,
        this.formErrors,
        true
      );
    });

    if (this.selModel == "remarkField") {
      this.remarkForm = this.form.group({
        remark: new FormControl("", [Validators.required]),
      });
      this.remarkForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(
          this.remarkForm,
          this.formErrors,
          true
        );
      });
    }

    if (this.selModel == "deleteChannelWithRemark") {
      this.remarkDeleteForm = this.form.group({
        remarkDelete: new FormControl("", [Validators.required]),
      });
      this.remarkDeleteForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(
          this.remarkDeleteForm,
          this.formErrors,
          true
        );
      });
    }
  }

  ngOnInit() {
    history.pushState(
      {},
      "self",
      this.location.prepareExternalUrl(this.router.url)
    );
    this.href = this.router.url;
    this.url = this.href.substring(0);
    this.roleId = this.commonData.roleId;
    console.log("Role ID: ", this.roleId);
    // alert(this.url);
    console.log(this.url);
    this.commonServiceCall.pageName = "Adapter Source IP";
    this.buildForm();
    this.getStatus();
    this.getadapterSourceIpDetails();
    this.getAppMasterList();
    this.getLeftMenuId();
    this.adapterSourceIpForm.patchValue({
      status: 3
    })
    this.addAuditTrailAdaptor(
      "Request:" +
      this.appConstants.apiURL.serviceURL_ESB +
      this.appConstants.getAdapterSrcIpDetailsUrl +
      "\n" +
      "Params={}",
      "view"
    );
  }

  //on load functions
  getAppMasterList() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.masterListUrl).subscribe((data) => {
      var res = data;
      console.log('response data: ', res);
      if (res.status) {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.productTypes = res.resp;
        console.log('response array: ', this.productTypes);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.masterListUrl, res);
      }
    });
  }

  filterProduct() {
    return this.productTypes.filter(x => x.shortName == "WALLET" || x.shortName == "MOBILE" || x.shortName == "DESKTOP");
  }

  //on load functions
  getStatus() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.masterStatusUrl)
      .subscribe((data) => {
        var res = data;
        if (res.status) {
          this.commonMethod.hideLoader();
          console.log("response data: ", res);
          this.adapterStatus = res.resp;
          console.log("response array: ", this.adapterStatus);
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.masterStatusUrl, res);
        }
      });
  }

  filterStatus() {
    return this.adapterStatus.filter(
      (x) => x.shortName == "ACTIVE" || x.shortName == "INACTIVE"
    );
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.adapterSourceIpService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => { });
  }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstants.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log("response data: ", res);
        this.commonData.submenuId = res.result[0].id;
        this.commonData.submenuname = res.result[0].menuLink;
        id = res.result[0].id;
        this.getPriviledgeData(id);
        console.log("Left Menu Id: ", id);
      } else {
        showToastMessage("Cannot get Id");
      }
    });
  }

  getPriviledgeData(id) {
    var url =
      this.appConstants.getPriviledgeDataUrl +
      id +
      "/" +
      this.commonData.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log("response data: ", res);
        this.priviledgeDataArr = res.result;
        console.log("response array: ", this.priviledgeDataArr);
        if (this.priviledgeDataArr.viewChecked) {
          this.getadapterSourceIpDetails();
        } else {
          showToastMessage("You Dont Have Priviledge To View The Data");
        }
      } else {
        showToastMessage("You Dont Have Priviledge To View The Data");
      }
    });
  }

  getMenuList() {
    var roleId = this.commonData.roleId;
    if (roleId == undefined) {
      this.router.navigateByUrl("/login");
      return;
    }
    console.log("menu role id", roleId);
    var req = "menu/findAllLeftMenu/" + roleId;
    this.commonServiceCall.getResponsePromise(req).subscribe((data) => {
      if (data.status) {
        this.menuItems = data.resp.result;
        console.log("menuItems", this.menuItems);
      } else {
        showToastMessage("Your Session Has Been Expired. Please Login Again");
        this.router.navigateByUrl("/login");
        //this.router.navigateByUrl('/dashboard');
      }
    });
  }

  openActionModel(action, formdata) {
    if (this.adapterSourceIpForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      console.log(formdata.calculatorType);
      this.adapterSrcIpFields.adapterChannel = formdata.adapterChannel;
      this.adapterSrcIpFields.sourceIp = formdata.sourceIp;
      this.adapterSrcIpFields.status = formdata.status;
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.adapterSourceIpForm,
        this.formErrors,
        false
      );
    }
  }

  closeActionMoel() {
    this.adapterSourceIpForm.patchValue({
      adapterChannel: this.adapterSrcIpFields.adapterChannel,
      sourceIp: this.adapterSrcIpFields.sourceIp,
      status: this.adapterSrcIpFields.status,
    });
    closeTinyModel();
  }

  showHideForm() {
    this.showForm = !this.showForm;
    this.isAddButtonClicked = true;
    setTimeout(() => {
      // $('#sl_Status').val('');
      $("#sl_adapterChannel").val("");
    });
    this.adapterSourceIpForm.patchValue({
      status: 3,
    });
  }

  cancel() {
    this.showForm = !this.showForm;
    this.adapterSourceIpForm.reset();
    this.isAddButtonClicked = false;
    this.getadapterSourceIpDetails();
  }

  editAdapterSourceIpDetails(item) {
    console.log(item);
    if (
      item.statusName === "ADMIN APPROVER PENDING" &&
      this.commonData.roleType == this.commonData.makerRole
    ) {
      showToastMessage("You Cannot Perform This Action");
    } else {
      this.commonData.submenuname = "adapterSrcIpEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
      this.commonData.adapterIp.createdon = item.createdon;
      this.router.navigateByUrl("/adapterSrcIpEdit", {
        state: { id: item.id },
      });
    }
  }

  closeActionModel() {
    closeTinyModel();
  }

  getadapterSourceChannelDetails() {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.getAdaptrSrcChannel)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          this.commonMethod.hideLoader();
          console.log("response data: ", res);
          res.result.forEach((element) => {
            if (element.statusName == "ACTIVE") {
              this.adapterSourceChannelDetails.push(element);
            }
          });
          console.log(
            "Adapter Source Channel array: ",
            this.adapterSourceChannelDetails
          );
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.getAdaptrSrcChannel, res);
        }
      });
  }

  getadapterSourceIpDetails() {
    this.adapterSourceIpDetails = [];
    this.commonMethod.showLoader();
    this.commonServiceCall
      .getResponsePromise(this.appConstants.getAdapterSrcIpDetailsUrl)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          this.commonMethod.hideLoader();
          console.log("response data: ", res);
          this.adapterSourceIpDetails = res.result;
          this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        } else {
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.getAdapterSrcIpDetailsUrl, res);
        }
        $("#dt-sample").DataTable().clear().destroy();
      });
  }

  /*Download Buttons for Table*/
  excelDownload() {
    $(".buttons-excel").click();
  }

  pdfDownload() {
    $(".buttons-pdf").click();
  }

  csvDownload() {
    $(".buttons-csv").click();
  }

  addAdapterSourceIp() {
    this.formValidation.markFormGroupTouched(this.adapterSourceIpForm);
    if (this.adapterSourceIpForm.valid) {
      var formData = this.adapterSourceIpForm.value;
      var param = this.adapterSourceIpService.addAdapterServiceCall(formData);
      console.log("request parameters: ", param);
      this.saveAdapterSorceIp(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.adapterSourceIpForm,
        this.formErrors,
        false
      );
    }
  }

  addAdapterSourceIpWithRemark(formdata) {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      var param = this.adapterSourceIpService.addAdapterServiceWithRemarkCall(
        this.adapterSrcIpFields,
        formData
      );
      this.saveAdapterSorceIp(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.remarkForm,
        this.formErrors,
        false
      );
    }
  }

  saveAdapterSorceIp(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.addAdapterSrcIpUrl, param)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          this.cancel();
          showToastMessage(res.responseMessage);
          this.addAuditTrailAdaptor(
            "Request:" +
            this.appConstants.apiURL.serviceURL_ESB +
            this.appConstants.addAdapterSrcIpUrl +
            "\n" +
            "Params=" +
            JSON.stringify(param),
            "add"
          );
        } else {
          if (this.commonData.roleType == this.commonData.makerRole) {
            this.adapterSourceIpForm.patchValue({
              adapterChannel: this.adapterSrcIpFields.adapterChannel,
              sourceIp: this.adapterSrcIpFields.sourceIp,
              status: this.adapterSrcIpFields.status,
            });
          }
          this.commonMethod.hideLoader();
          this.errorCallBack(this.appConstants.addAdapterSrcIpUrl, res);
        }
      });
  }

  openModelToDelete(item) {
    this.selChannelToDelete = item;
    this.commonData.adapterIp.createdon = item.createdon;
    this.selModel = "deleteChannel";
    openTinyModel();
  }

  openModelToDeleteWithRemark(action, item) {
    openTinyModel();
    this.selModel = action;
    this.buildForm();
    console.log(action);
    this.selChannelToDelete = item;
    this.commonData.adapterIp.createdon = item.createdon;
  }

  deleteChannel() {
    closeTinyModel();
    console.log("deleting item: ", this.selChannelToDelete);
    var formData = this.selChannelToDelete;
    var param = this.adapterSourceIpService.deleteChannelCall(formData);
    console.log(formData);
    this.deleteAdapterchannel(param);
  }

  deleteChannelWithRemark(remarkData) {
    console.log("deleting item: ", this.selChannelToDelete);
    this.formValidation.markFormGroupTouched(this.remarkDeleteForm);
    if (this.remarkDeleteForm.valid) {
      closeTinyModel();
      var formData = this.selChannelToDelete;
      var param = this.adapterSourceIpService.deleteChannelWithRemarkCall(
        formData,
        remarkData
      );
      this.deleteAdapterchannel(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.remarkDeleteForm,
        this.formErrors,
        false
      );
    }
  }

  deleteAdapterchannel(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
      .postResponsePromise(this.appConstants.deleteAdapterSrcIpUrl, param)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          showToastMessage(res.responseMessage);
          this.addAuditTrailAdaptor(
            "Request:" +
            this.appConstants.apiURL.serviceURL_ESB +
            this.appConstants.deleteAdapterSrcIpUrl +
            this.selChannelToDelete.id +
            "\n" +
            "Params={}",
            "delete"
          );
          this.getadapterSourceIpDetails();
        } else {
          this.errorCallBack(this.appConstants.deleteAdapterSrcIpUrl, res);
        }
        this.commonMethod.hideLoader();
      });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancelClick() {
    this.commonMethod.cancel();
  }
}
