import { Injectable, NgZone } from '@angular/core';
import { EncryptDecryptService } from './encrypt-decrypt-service.service';
import { Router } from '@angular/router';
import { AppConstants } from './app-constants';
declare var showToastMessage: any;
@Injectable({
  providedIn: 'root'
})
export class CommonDataShareService {

  public browserRefresh: boolean;
  public selectedNav="";
  public page = "role";
  public activityPage = "mobileActivity";
  public makerRole = "Maker"
  public corpMakerRole = "Corporate Maker"
  public isOffline : Boolean = false;
  public loginOTP;
  public user_ID;
  public getById;
  public username;
  public user_Name
  public user_lat=""
  public user_lon=""
  public user_IP
  public submenuId
  public submenuname
  public roleId
  public roleName
  public roleType
  public roleTypeId
  public routeUrl
  public sessionToken
  public deviceToken
  public productTypes: any = [];
  idle_session_time: any = 180;

  public corpUserAddCifValue;

  public countryData = {
    updatedStatusId: '',
    id: ''
  }
  public bankTokenData = {
    channel: ''
  }
  public themeName = {
    updatedStatusId: '',
    id: ''
  }
  public themeColor = {
    updatedStatusId: '',
    id: ''
  }
  public themeBgColor = {
    updatedStatusId: '',
    id: ''
  }
  public themeMenuOptions = {
    updatedStatusId: '',
    id: ''
  }
  public themeApply = {
    createdon: '',
    id: ''
  }
  public menuRightDetailValue ={
    menuId: '',
    roleId: '',
  }

  public customizeMenuRightDetailValue ={
    menuId: '',
    productType: '',
    appId: ''
  }

  public masterLanguage ={
    langId: ''
  }
  public masterConfig ={
    id: ''
  }
  public masterCalculator = {
    id: '',
    createdon: ''
  }
  public adapterIp = {
    id: '',
    createdon: ''
  }

  public securityQuestion = {
    id: '',
    createdon: ''
  }

  public documentType = {
    id: '',
    createdOn: ''
  }

  public holidayList = {
    id: '',
    createdOn: ''
  }

  public investmentProduct = {
    id: '',
    createdOn: ''
  }

  public messageCodeMaster = {
    id: '',
    createdOn: ''
  }

  public countryMaster = {
    id: '',
    createdOn: ''
  }

  public stateMaster = {
    id: '',
    createdOn: ''
  }

  public cityMaster = {
    id: '',
    createdOn: ''
  }

  public adapterChannel = {
    id: '',
    createdon: ''
  }
  public RMMaster = {
    id: '',
    createdon: ''
  }
  public notificationTemplate = {
    id: '',
    createdon: ''
  }
  public accountType = {
    id: '',
    createdon: ''
  }
  public masterLocation = {
    locId: '',
    countryId: '',
    stateId: '',
    cityId: ''
  }

  public corpUserLocation = {
    countryId: '',
    stateId: '',
    cityId: ''
  }

  public masterMenuId="";
  public adminEditData={
    roleId : '',
    userId : '',
    corpUserId : ''
  }

  public announcementData = {
    id: '',
    createdon: ''
  }

  public corpDesignationLevelData = {
    id: '',
    createdOn: ''
  }

  public DonationData = {
    id: '',
    createdOn: '',
    createdby: ''
  }

  public corpDonationData = {
    id: '',
    createdOn: '',
    createdby: ''
  }

  public offerData = {
    id: '',
    createdon: ''
  }

  public corpProductData = {
    id: '',
    createdon: ''
  }

  public agentMoneyReconsile ={
    accNo : ''
  }
  public services = {
    id: ''
  };
  public corpCompanyDetails = {
    id: '',
    createdOn: ''
  }
  public corpCompanyMenu = {
    id: '',
    createdOn: ''
  };
  public corpUserTypeDetails = {
    id: '',
    createdOn: ''
  }
  public corpAccountUserTypeDetails = {
    id: '',
    createdOn: '',
    accountTypeId: "",
    corpUserTypeId: "",
  }

  public activitySetting = {
    id: '',
    createdOn: '',
    statusId: '',
    statusName: '',
    activityId: '',
  }

  public adminactivitySetting = {
    id: '',
    createdOn: '',
    statusId: '',
    statusName: '',
    activityId: '',
    tpin:'',
    otp:''
  }

  public customerAgent = {
    id:'',
    createdon: ''
  }

  public customerInfo = {
    id:'',
    createdon: '',
    mobile: ''
  }

  public notificationCategories = {
    id:'',
    createdOn: '',
  }

  public custNotificationCategories = {
    id:'',
    custName: '',
    cif: '',
    createdOn: '',
  }

  public corporateUser = {
    id:'',
    createdOn: '',
  }

  public masterLimits = {
    id:'',
    createdOn: '',
  }

  public setCorpLimits = {
    createdOn: '',
  }

  public dynamicReports = {
    id: '',
    createdOn: ''
  };

  constructor(
    private encryptDecrypt: EncryptDecryptService,
    private router: Router,
    private appConstants: AppConstants,
    private ngZone: NgZone
  ) { }

  encryptRequestData(reqData, passphrase) {
    let ecryptMap;
    ecryptMap = this.encryptDecrypt.encryptText(JSON.stringify(reqData), passphrase);
    console.log("after param add " + JSON.stringify(reqData));
    return ecryptMap

  }

  decryptRequestData(reqData, passphrase) {
    let ecryptMap;
    ecryptMap = this.encryptDecrypt.decryptText(reqData, passphrase);
    //console.log("after param add " + JSON.stringify(reqData));
    return ecryptMap

  }

  navigateFromUrl(url) {
    this.ngZone.run(() => this.router.navigateByUrl(url)).then();
  }

}
