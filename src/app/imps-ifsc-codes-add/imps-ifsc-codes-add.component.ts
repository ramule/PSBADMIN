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
import { ImpsIfscCodesAddService } from "./imps-ifsc-codes-add.service";

declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: "app-imps-ifsc-codes-add",
  templateUrl: "./imps-ifsc-codes-add.component.html",
  styleUrls: ["./imps-ifsc-codes-add.component.css"],
})
export class ImpsIfscCodesAddComponent implements OnInit {
  showForm: boolean = false;
  ifscAddForm: FormGroup;
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
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    public appConstant: AppConstants,
    public datePipe: DatePipe,
    private impsIFSCAddService: ImpsIfscCodesAddService
  ) {}
  public buildForm() {
    this.ifscAddForm = this.form.group({
      ifsc: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9 ]+$/),
      ]),
      short: new FormControl("", [Validators.required]),
      nbin: new FormControl("", [Validators.required]),
      bank_name: new FormControl("", [Validators.required]),
      banktype: new FormControl("", [Validators.required]),
      membertype: new FormControl("", [Validators.required]),
    });
    this.ifscAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(
        this.ifscAddForm,
        this.formErrors,
        true
      );
    });
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Add IFSC Codes";
    this.buildForm();
    this.commonMethod.hideLoader();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsIFSCAddService.addAuditTrailAdaptorParams(
      URL,
      operation
    );
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstant.insertAudit, param)
      .subscribe((data) => {});
  }

  addIFSCCode() {
    this.formValidation.markFormGroupTouched(this.ifscAddForm);
    if (this.ifscAddForm.valid) {
      var formData = this.ifscAddForm.value;
      var param = this.impsIFSCAddService.addIFSC(
        formData,
        this.isCustomizedIFSC
      );
      this.saveIFSCCodes(param);
    } else {
      this.formErrors = this.formValidation.validateForm(
        this.ifscAddForm,
        this.formErrors,
        false
      );
    }
  }

  saveIFSCCodes(param) {
    this.commonMethod.showLoader();
    var url = this.appConstant.insertIfscCode;
    this.commonServiceCall.postResponsePromise(url, param).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor(
          "Request:" +
            this.appConstant.apiURL.serviceURL_ESB +
            this.appConstant.insertIfscCode +
            "\n" +
            "Params=" +
            JSON.stringify(param),
          "add"
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

  cancel() {
    this.router.navigateByUrl("/impsIFSC");
  }
}
