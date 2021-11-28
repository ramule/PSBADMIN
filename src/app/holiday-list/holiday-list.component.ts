import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { HolidayListService } from './holiday-list.service';
import { FormValidationsService } from '../form-validations.service';
declare var showToastMessage: any;
@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.css']
})
export class HolidayListComponent implements OnInit {

  holidayListForm: FormGroup;
  formErrors = {
    holidayName: ''
  }
  holidaysArr: any = [];
  holidayId: any;
  holidayListArr:any = [];
  priviledgeDataArr:any = [];
  menuLink="holidayList"

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    private holidayListService: HolidayListService
  ) { }

  ngOnInit(): void {
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.commonServiceCall.pageName = "Holiday List";
    this.buildForm();
    this.getLeftMenuId();
  }

  public buildForm() {
    this.holidayListForm = this.form.group({
      holidayName: new FormControl('', [Validators.required]),
    });
    this.holidayListForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.holidayListForm, this.formErrors, true)
    });
  }


     /* Insert tracking for user activities*/
      addAuditTrailAdaptor(URL,operation)
      {
          var param = this.holidayListService.addAuditTrailAdaptorParams(URL,operation);
          console.log(param)
          this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
          })
      }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstants.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        this.commonDataShareService.submenuId = res.result[0].id;
        id = res.result[0].id;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

  getPriviledgeData(id) {
    var url = this.appConstants.getPriviledgeDataUrl + id+"/"+this.commonDataShareService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if(this.priviledgeDataArr.viewChecked) {
          this.getAllHolidayList();
        }
        else {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

  getAllHolidayList() {
    this.commonMethod.showLoader();
    // this.commonMethod.destroyDataTable();
    var url = this.appConstants.getAllHolidaysUrl;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.holidaysArr = res.result;

        // res.result.forEach(element => {
        //   if(element.statusName == 'ACTIVE') {
        //     this.holidaysArr.push(element);
        //   }
        // });
        //initiallize datatable
        // this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.getHolidayListUrl+"\n"+"Params={}",'view')
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getAllHolidaysUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }

  onHolidayNameChange(event) {
    this.holidayId = event.target.value;
    console.log(this.holidayId);
    this.getHolidayList(this.holidayId);
  }

  getHolidayList(holidayid){
    this.holidayListArr = [];
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    var url = this.appConstants.getHolidayListByIdUrl + holidayid;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.holidayListArr = res.result;
        //initiallize datatable
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        // this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.getHolidayListUrl+"\n"+"Params={}",'view')
      } else {
        this.errorCallBack(this.appConstants.getHolidayListByIdUrl, res);
      }
      this.commonMethod.hideLoader();
    });
  }


  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  editHolidayList(item){
    console.log(item);
    if(item.statusName === 'ADMIN APPROVER PENDING' && this.commonDataShareService.roleType == this.commonDataShareService.makerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.commonDataShareService.submenuname = "holidayListEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
      this.router.navigateByUrl("/holidayListEdit",{ state: { id: item.id } });
    }
  }


  gotoAddHolidayList(){
    this.commonDataShareService.submenuname = "holidayListAdd";
    this.router.navigateByUrl("/holidayListAdd");
  }
  cancelClick(){
    this.commonMethod.cancel();
  }

}
