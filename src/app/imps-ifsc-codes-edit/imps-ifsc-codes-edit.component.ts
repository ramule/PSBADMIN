import { Component, OnInit } from "@angular/core";

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { FormValidationsService } from "../form-validations.service";
import { CommonDataShareService } from "../common-data-share.service";
import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { Router } from "@angular/router";
import { CommonMethods } from "../common-methods";
import { AppConstants } from "../app-constants";
import { DatePipe } from "@angular/common";
import { ImpsIfscCodesEditService } from "./imps-ifsc-codes-edit.service";
import { Location } from "@angular/common";
import { browserRefresh } from "../app.component";

declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: "app-imps-ifsc-codes-edit",
  templateUrl: "./imps-ifsc-codes-edit.component.html",
  styleUrls: ["./imps-ifsc-codes-edit.component.css"],
})
export class ImpsIfscCodesEditComponent implements OnInit {
  ifscEditForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    ifsc: "",
    short: "",
    nbin: "",
    bank_name: "",
    banktype: "",
    membertype: "",
  };
  isCustomizedIFSC: boolean = false;
  isLiveFlag: boolean = false;
  beforeParams: any;
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    public appConstant: AppConstants,
    public datePipe: DatePipe,
    private impsIFSCEditService: ImpsIfscCodesEditService,
    public location: Location
  ) {}
  public buildForm() {
    this.ifscEditForm = this.form.group({
      ifsc: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]+$/)]),
      short: new FormControl("", [Validators.required]),
      nbin: new FormControl("", [Validators.required]),
      bank_name: new FormControl("", [Validators.required]),
      banktype: new FormControl("", [Validators.required]),
      membertype: new FormControl("", [Validators.required]),
    });
    this.ifscEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.ifscEditForm,
        this.formErrors,
        true
      );
    });
  }

  ngOnInit(): void {

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/impsIFSC');
      return;
    }

    this.commonServiceCall.pageName = "Edit IFSC Codes";
    this.buildForm();
    var IFSC_id = this.location.getState();
    this.getIFSCDetailsById(IFSC_id);
  }

  getIFSCDetailsById(param) {

    var params = {
      "id": param.id
    }

    this.commonServiceCall
      .postResponsePromise(this.appConstant.getAllIfscCodeDetailsById, params)
      .subscribe((data) => {
        var res = data.resp;
        if (res.responseCode == "200") {
          console.log(res);
          this.commonMethod.hideLoader();
          this.beforeParams = res.result[0];

          if(this.beforeParams.is_live == 'Y') {
            this.isLiveFlag = true;
          }
          else {
            this.isLiveFlag = false;
          }

          if(this.beforeParams.use_customized_ifsc) {
            this.isCustomizedIFSC = true;
          }
          else {
            this.isCustomizedIFSC = false;
          }

          this.ifscEditForm.patchValue({
            ifsc: res.result[0].ifsc_code,
            short: res.result[0].short_code,
            nbin: res.result[0].nbin,
            bank_name: res.result[0].bank_name,
            banktype: res.result[0].bank_type,
            membertype: res.result[0].member_type,
          });
        } else {
          this.commonMethod.hideLoader();
        }
      });
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsIFSCEditService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstant.insertAudit, param)
      .subscribe((data) => {});
  }

  editIFSCCode() {
    this.formValidation.markFormGroupTouched(this.ifscEditForm);
    if (this.ifscEditForm.valid) {
      var formData = this.ifscEditForm.value;
      var param = this.impsIFSCEditService.editIFSC(
        formData,
        this.isCustomizedIFSC,
        this.isLiveFlag,
        this.beforeParams
      );
      this.updateIFSCCodes(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.ifscEditForm,
        this.formErrors,
        false
      );
    }
  }

  updateIFSCCodes(param) {
    this.commonMethod.showLoader();
    var url = this.appConstant.updateIfscCode;
    this.commonServiceCall.postResponsePromise(url, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor(
          "Request:" +
            this.appConstant.apiURL.serviceURL_ESB +
            this.appConstant.updateIfscCode +
            "\n" +
            "Params=" +
            JSON.stringify(param) +
            "\n" +
            "Before Update Params=" +
            JSON.stringify(this.beforeParams),
          "update"
        );
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
        this.router.navigateByUrl("/impsIFSC");
      } else {
        this.commonMethod.hideLoader();
      }
    });
  }

  onCustomizeStateChange(event) {
    this.isCustomizedIFSC = !this.isCustomizedIFSC;
  }

  onIsLiveFlagChange(event) {
    this.isLiveFlag = !this.isLiveFlag;
  }

  cancel() {
    this.router.navigateByUrl("/impsIFSC");
  }
}
