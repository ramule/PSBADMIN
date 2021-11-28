import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';

declare var showToastMessage: any;
declare var $:any
@Component({
  selector: 'app-admin-wallet-points',
  templateUrl: './admin-wallet-points.component.html',
  styleUrls: ['./admin-wallet-points.component.css']
})
export class AdminWalletPointsComponent implements OnInit {

  id= 4;
  menuLink = "adminWalletPoints";
  showForm:boolean = false;
  rewardsPointsForm: FormGroup;
  formErrors = {
    walletPointsType:'',
    transAmt: '',
    walletPoints:'',
    status:'',
    productType:''
  }
  isAddButtonClicked = false;

  //feild parameter
  masterStatus = [];
  productTypes = [];
  rewardMasterArr = [];
  priviledgeDataArr: any = [];
  p: number = 1;

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod:CommonMethods,
    public appConstant: AppConstants,
    public commonDataService: CommonDataShareService,
    public location : Location
  ) { }

  public buildForm() {
    this.rewardsPointsForm = this.form.group({
      walletPointsType: new FormControl('', [Validators.required,Validators.maxLength(50)]),
      transAmt: new FormControl('', [Validators.required,Validators.maxLength(50)]),
      walletPoints: new FormControl('', [Validators.required,Validators.maxLength(100)]),
      status: new FormControl('', [Validators.required]),
      productType: new FormControl('', [Validators.required]),
    });
    this.rewardsPointsForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.rewardsPointsForm, this.formErrors, true)
    });
  }

  ngOnInit(){
    this.commonServiceCall.pageName = "Reward Points";
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.buildForm();
   // this.getPriviledgeData();
   this.getLeftMenuId()
  }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstant.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        id = res.result[0].id;
        this.commonDataService.submenuId = res.result[0].id;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

     /* Insert tracking for user activities*/
    addAuditTrailAdaptor(URL,operation)
    {
        var param = {
          "ChannelName": "DESKTOP",
          "channelRequest": URL,
          "eventName":'Reward Points',
          "category":"Master",
          "action":operation,
          "properties":URL,
          "IP":this.commonDataService.user_IP,
          "X-FORWARDEDIP":this.commonDataService.user_IP,
          "Lat":this.commonDataService.user_lat,
          "Lon":this.commonDataService.user_lon,
          "Browser":this.commonMethod.getBrowserName(),
          "Device":"",
          "OS":this.commonMethod.getOSName(),
          "CHANNELID":"4",
          "CREATEDBY":this.commonDataService.user_ID,
          "CREATEDBYNAME":this.commonDataService.user_Name,
           "UPDATEDBY":this.commonDataService.user_ID,
          "UPDATEDBYNAME":this.commonDataService.user_Name,
          "authorization":"0"
        }
        console.log(param)
        this.commonServiceCall.postResponseAuditTracking(this.appConstant.insertAudit, param).subscribe(data => {
        })
    }

  getPriviledgeData(id) {
    var url = this.appConstant.getPriviledgeDataUrl + id+"/"+this.commonData.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if(this.priviledgeDataArr.viewChecked) {
          this.getRewardPoints();
        }
        else {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

  showHideForm() {
    this.router.navigateByUrl('/adminWalletPointsAdd');
    this.commonDataService.submenuname = "adminWalletPointsAdd";
    // this.showForm = !this.showForm
    // this.isAddButtonClicked = true;
    // setTimeout(()=>{
    //   // $('#masterSubMenuStatus').val('');
    // })
  }

  cancelClick(){
    this.router.navigateByUrl('/dashboard');
  }

  cancel() {
    this.showForm = !this.showForm;
    this.rewardsPointsForm.reset();
    this.isAddButtonClicked = false;
    this.getRewardPoints();
  }

  addMaster(){
    this.formValidation.markFormGroupTouched(this.rewardsPointsForm);
    if (this.rewardsPointsForm.valid) {
      var formData = this.rewardsPointsForm.value;
      var param = {
        "configtype" : formData.walletPointsType,
        "amount" : formData.transAmt,
        "points" : formData.walletPoints,
        "statusId" : formData.status ,
        "appId" : formData.productType
      };
      console.log(JSON.stringify(param));
      // this.saveWalletPoints(JSON.stringify(param))
    } else {
      this.formErrors = this.formValidation.validateForm(this.rewardsPointsForm, this.formErrors, false)
    }
  }

  getRewardPoints(){
    $('#dt-sample').DataTable().clear().destroy();
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstant.getRewardPoints).subscribe((data) => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.rewardMasterArr = res.result;
        this.addAuditTrailAdaptor("Request:"+this.appConstant.apiURL.serviceURL_ESB+this.appConstant.getRewardPoints+"\n"+"Params={}",'view')
      } else {
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable" : "No Data found"
            }
          });
        })
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.getRewardPoints, res);
      }
    });
  }

errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
}




  gotoRewardPointsDtl(item){
    console.log(item);
    if(item.status === 'ADMIN APPROVER PENDING' && this.commonData.roleId === 5) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.router.navigateByUrl("/adminWalletPointsEdit",{ state: { id: item.id } })
      this.commonDataService.submenuname = "adminWalletPointsEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
    }
  }

}
