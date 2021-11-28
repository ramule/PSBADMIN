import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { NotificationService } from 'src/app/notification/notification.service';
import { NotificationDetailsService } from './notification-details.service'
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.css']
})
export class NotificationDetailsComponent implements OnInit {

  notificationDtlForm: FormGroup;
  priviledgeDataArr: any = [];
  menuLink = "notificationDetails";
  formErrors = {
    searchBy:'',
    customerName:'',
    mobileNo:''
  }

  sentNotificationList: any =[];
  message = '';


  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public notificationService: NotificationService,
    private notificationDtlService: NotificationDetailsService
  ) { }

  public buildForm() {
    this.notificationDtlForm = this.form.group({
      searchBy: new FormControl('', [Validators.required])
    });
    this.notificationDtlForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.notificationDtlForm, this.formErrors, true)
    });
  }

   /**
   * This function will be called on initilization of page
   * functionality
   * define page name
   * get all list of all notification sent
   */
  ngOnInit(){
    this.commonServiceCall.pageName = "Notifications Details";
    this.getLeftMenuId();
  }

    /* Insert tracking for user activities*/
    addAuditTrailAdaptor(URL,operation)
    {
        var param = this.notificationDtlService.addAuditTrailAdaptorParams(URL,operation);
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
        this.commonData.submenuId = res.result[0].id;
        this.commonData.submenuname = res.result[0].menuLink;
        id = res.result[0].id;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

  getPriviledgeData(id) {
    var url = this.appConstants.getPriviledgeDataUrl + id+"/"+this.commonData.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if(this.priviledgeDataArr.viewChecked) {
          this.getNotificationList();
        }
        else {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

  /**
   * This function will redirect to notification screen
   */
  gotoSendNotification(){
    this.router.navigateByUrl("/notificationSend");
  }

  /**
   * This function will get all notification already sent
   */
  getNotificationList(){
    this.commonMethod.destroyDataTable(); /*** Data table is destroyed */
    this.commonMethod.showLoader(); /*** Loader is called */
    this.commonServiceCall.getResponsePromise(this.appConstants.getNoticationDtl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if(res.responseCode == "200"){
        this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.getNoticationDtl+"\n"+"Params={}",'view')
        /*** Data table is initiallized */
        this.commonMethod.setDataTable(this.commonServiceCall.pageName);
        /*** responce is mapped to notification table*/
        this.sentNotificationList = res.result;
      }
      else if (res.responseCode == "202"){
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable" : "No Data found"
            }})});
      }
      else{
        this.errorCallBack(this.appConstants.getNoticationDtl, data.resp);
      }
      this.commonMethod.hideLoader();
      this.commonMethod.destroyDataTable();
    })
  }

  /**
   * This function will send notification to customer again
   * @param item selected customer detail
   */
  resendNotification(item){
    console.log(item);
    var param = this.notificationDtlService.getResendParam(item);/*** Param is initiallized */
    //return;
    this.commonMethod.showLoader(); /*** Loader is called */
    this.commonServiceCall.postResponsePromise(this.appConstants.resedNotification,param).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if(res.responseCode == "200"){
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
        this.getNotificationList();/*** Reloading notification */
      }
      else{
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.resedNotification, data.resp);
      }

    })
  }


  /**
   * This function is used to view message in a popup
   * @param item selected customer detail
   */
  viewNotificationMsg(item){
    console.log(item);
    this.message = item.notificationMsg
    openTinyModel();
  }

  /**
   * This function is used to closed popup
   */
  closeActionModel(){
    closeTinyModel();
  }










  cancel(){

  }
  excelDownload()
  {
    $('.buttons-excel').click()
  }

  pdfDownload()
  {
    $('.buttons-pdf').click()
  }

  csvDownload()
  {
    $('.buttons-csv').click()
  }


  destroyDataTable() {
    $('#dt-sample').DataTable().clear().destroy();
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancelClick(){
    this.commonMethod.cancel();
  }



}
