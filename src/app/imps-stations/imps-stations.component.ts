import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { FormValidationsService } from '../form-validations.service';
import { ImpsStationsService } from './imps-stations.service';

declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-imps-stations',
  templateUrl: './imps-stations.component.html',
  styleUrls: ['./imps-stations.component.css']
})
export class ImpsStationsComponent implements OnInit {

  impsStationForm: FormGroup;
  todayDate:any;
  type: any;
  menuLink = "impsStations";

  impsStationsArr: any = [];
  priviledgeDataArr: any = [];
  viewDataArray: any = [];
  formErrors = {
    searchBy: '',
    name: ''
  }
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonMethod : CommonMethods,
    private appConstants: AppConstants,
    private impsStationsService: ImpsStationsService,
    public datePipe: DatePipe,
    private commonDataService: CommonDataShareService
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Station";
    this.buildForm();
    this.commonMethod.hideLoader();
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.impsStationsService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param);
    this.commonServiceCall
      .postResponseAuditTracking(this.appConstants.insertAudit, param)
      .subscribe((data) => {});
  }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstants.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log("response data: ", res);
        this.commonDataService.submenuId = res.result[0].id;
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
      this.commonDataService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log("response data: ", res);
        this.priviledgeDataArr = res.result;
        console.log("response array: ", this.priviledgeDataArr);
        if (this.priviledgeDataArr.viewChecked) {
        } else {
          showToastMessage("You Dont Have Priviledge To View The Data");
        }
      } else {
        showToastMessage("You Dont Have Priviledge To View The Data");
      }
    });
  }

  public buildForm() {
    this.impsStationForm = this.form.group({
      searchBy: new FormControl('', [Validators.required]),
    });
    this.impsStationForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.impsStationForm, this.formErrors, true)
    });
  }

  onSubmitClicked() {
    this.formValidation.markFormGroupTouched(this.impsStationForm);

    if (this.impsStationForm.valid) {
      var formData = this.impsStationForm.value;
      if (this.type == 'name') {
        var params = this.impsStationsService.getStationByNameCall(formData);
        this.getStationByNameDetails(params);
      }
      else {
        this.getAllStations();
      }
    } else {
      this.formErrors = this.formValidation.validateForm(this.impsStationForm, this.formErrors, false)
    }
  }

  getAllStations() {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getAllImpsStations).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getAllImpsStations + "\n" + "Params={}", 'view')
        //initiallize datatable
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.impsStationsArr = res.result;
      } else {
        $('table.display').DataTable({
          "language": {
            "emptyTable": "No Data found"
          }
        });
        this.errorCallBack(this.appConstants.getAllImpsStations, res);
      }
      this.commonMethod.hideLoader();
      this.commonMethod.destroyDataTable();
    });
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  getStationByNameDetails(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall
    .postResponsePromise(this.appConstants.getStationsByNameUrl, param)
    .subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log("response data: ", res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.impsStationsArr = res.result;
        console.log("IMPS Stations: ", this.impsStationsArr);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getStationsByNameUrl + "\n" + "Params={}", 'view')
      } else {
        this.errorCallBack(this.appConstants.getStationsByNameUrl, res);
      }
      this.commonMethod.hideLoader();
      this.commonMethod.destroyDataTable();
    });
  }

  getSearchStation(value) {
    console.log(value);
    this.type = value.searchBy;
    this.impsStationsArr = [];
    this.impsStationForm.removeControl('name');

    if (this.type == 'name') {
      this.impsStationForm.addControl('name', new FormControl('', [Validators.required]));
    }
  }

  cancel(){
    this.commonMethod.cancel();
  }

}
