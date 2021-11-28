import { Component, OnInit } from '@angular/core';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { element } from 'protractor';
import { CorprateActivitySettingsService } from './corprate-activity-settings.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-corporate-activity-settings',
  templateUrl: './corporate-activity-settings.component.html',
  styleUrls: ['./corporate-activity-settings.component.css']
})
export class CorporateActivitySettingsComponent implements OnInit {
  id = 1;
  masterCompany: any = [];
  activityMaster: any = [];
  levelBlockArray: any = [];
  corpApproverTypeValuesArr: any = [];
  corporateApproverTypeArr: any = [];
  corporateApproverTypeBackupArr: any = [];
  corporateUsersArr: any = [];
  corporateUsersArr2: any = [];
  corporateUsersArr3: any = [];
  corporateUsersArr4: any = [];
  masterUser: any = [];
  HierarchyArr: any = [];
  corpLimitData: any = [];
  approverLevel: any = "";
  companyId: any;
  corpCompanySelected: boolean = false;
  selModel: any;
  globalArrayIndex: any;
  priviledgeDataArr: any = [];
  menuLink = "corporateActivitySettings"
  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonMethod: CommonMethods,
    public appConstant: AppConstants,
    private commonDataService: CommonDataShareService,
    public corpActivitySetting: CorprateActivitySettingsService
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Corporate Activity Settings";
    this.getCompanyList()
    // this.getMasterActivityDetails()
    this.getLeftMenuId();
    this.getCorporateApproverType(this.id);
    this.levelBlockArray.push(this.levelBlockArray.length + 1);
  }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstant.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        this.commonDataService.submenuId = res.result[0].id;
        id = res.result[0].id;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

  getPriviledgeData(id) {
    var url = this.appConstant.getPriviledgeDataUrl + id + "/" + this.commonDataService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if (this.priviledgeDataArr.viewChecked) {
          //  this.getCalculatorFormula();
        }
        else {
          showToastMessage('You Dont Have Priviledge To View Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View Data');
      }
    });
  }

  getCorporateApproverType(id) {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstant.getCorpApproverTypeListUrl + id).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.corporateApproverTypeArr = res.result;
        this.corporateApproverTypeBackupArr = res.result;
        console.log('corporate approver type array: ', this.corporateApproverTypeArr);
      } else {
        $('table.display').DataTable({
          "language": {
            "emptyTable": "No Data found"
          }
        });
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.getCorpApproverTypeListUrl, res);
      }
      this.commonMethod.destroyDataTable();
    });
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.corpActivitySetting.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstant.insertAudit, param).subscribe(data => {
    })
  }

  getCompanyList() {
    this.commonMethod.showLoader();
    this.masterCompany = [];
    this.commonServiceCall.getResponsePromise(this.appConstant.getCorpCompanyDetailsUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        res.result.forEach(element => {
          if (element.statusName == 'ACTIVE') {
            this.masterCompany.push(element)
          }
        })
      } else {
        this.errorCallBack(this.appConstant.getCorpCompanyDetailsUrl, res);
      }
      this.commonMethod.hideLoader();
      this.commonMethod.destroyDataTable();
    });
  }

  /* This function calls when an error occurs */
  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  cancel() {
    this.commonMethod.cancel();
  }

  getMasterActivityDetails(companyId) {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstant.getAllActivitySettingForCorp + companyId).subscribe(data => {
      $('#dt-sample').DataTable().clear().destroy();
      var res = data.resp;
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:" + this.appConstant.apiURL.serviceURL_ESB + this.appConstant.getAllActivitySettingForCorp + companyId + "\n" + "Params={}", 'view')
        console.log("getMasterActivity", data.resp);
        this.activityMaster = res.result;
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        console.log('Activity Master Array: ', this.activityMaster);
        this.activityMaster.forEach(el => {
          //selected activity
          if (el.activitySelected == "YES")
            el.isSelectChecked = true
          else
            el.isSelectChecked = false

          //maker check
          el.isMakerChecked = true

          //checker check
          if (el.checker == 'Y')
            el.isCheckerChecked = true
          else
            el.isCheckerChecked = false

          //approver check
          if (el.approver == 'Y')
            el.isApproverChecked = true
          else
            el.isApproverChecked = false
        });
      }
      else {
        this.errorCallBack(this.appConstant.getPSBAppMenu, res);
      }
      this.commonMethod.destroyDataTable();
      this.commonMethod.hideLoader();
    })
  }

  onCompanyChange(event) {
    this.corpCompanySelected = true;
    this.companyId = event.target.value;
    console.log(event);
    this.activityMaster = [];
    this.approverLevel = this.companyId.split('-')[1];
    console.log(this.approverLevel);
    this.getMasterActivityDetails(this.companyId.split('-')[0]);
  }

  saveCompanyActivityDetails() {
    var corpActivityArr = [];
    var tempArr = this.activityMaster;
    var filterdata = tempArr.filter((f) => f.isSelectChecked == true)
    console.log(tempArr.filter((f) => f.isSelectChecked == true));
    console.log(filterdata);

    filterdata.forEach(element => {
      var maker = 'Y';
      if (element.isCheckerChecked == true) {
        var checkerData = 'Y';
      }
      else {
        checkerData = 'N';
      }

      if (element.isApproverChecked == true) {
        var approverData = 'Y';
      }
      else {
        approverData = 'N';
      }

      var params = {
        "activityId": element.activityId,
        "createdBy": element.createdBy,
        "statusId": element.statusId,
        "maker": maker,
        "checker": checkerData,
        "approver": approverData,
        "companyId": this.companyId.split('-')[0]
      }

      corpActivityArr.push(params);
    });

    if(corpActivityArr.length > 0) {
      this.save(corpActivityArr);
    }
    else {
      showToastMessage('Please Select Atleast One Activity');
    }
  }

  save(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstant.saveCorpActivitiesUrl, param).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.addAuditTrailAdaptor("Request:" + this.appConstant.apiURL.serviceURL_ESB + this.appConstant.saveCorpActivitiesUrl + "\n" + "Params=" + JSON.stringify(param), 'add')
        console.log(res.result);
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
      } else {
        showToastMessage(res.responseMessage);
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstant.saveCorpActivitiesUrl, res);
      }
    });
  }

  onCorpApproverTypeChange(event, index) {
    $("input:radio").attr("checked", false);
    console.log('change called');
    var data = {
      level: index + 1,
      id: event.target.value
    }
    console.log(data);
    var objIndex = this.corpApproverTypeValuesArr.findIndex((obj) => obj.level == index + 1);
    if (objIndex < 0) {
      this.corpApproverTypeValuesArr.push(data);
    }
    else {
      this.corpApproverTypeValuesArr[objIndex].id = event.target.value;
    }
  }

  filterCorpApproverArray(index) {

    var tempArr = this.corporateApproverTypeBackupArr;
    if (index == 0) {
      if (this.corporateUsersArr.length == 1 || this.corporateUsersArr.length == 2) {
        return tempArr.filter(x => x.approverType == 'Any One')
      }
      else if (this.corporateUsersArr.length == 3) {
        return tempArr.filter(x => x.approverType == 'Any Two' || x.approverType == 'Any One')
      }
      else if (this.corporateUsersArr.length == 4) {
        return tempArr.filter(x => x.approverType == 'Any Three' || x.approverType == 'Any Two' || x.approverType == 'Any One')
      }
      else {
        return tempArr;
      }
    }
    else if (index == 1) {
      // return this.corporateApproverTypeArr;
      if (this.corporateUsersArr2.length == 1 || this.corporateUsersArr2.length == 2) {
        return tempArr.filter(x => x.approverType == 'Any One')
      }
      else if (this.corporateUsersArr2.length == 3) {
        return tempArr.filter(x => x.approverType == 'Any Two' || x.approverType == 'Any One')
      }
      else if (this.corporateUsersArr2.length == 4) {
        return tempArr.filter(x => x.approverType == 'Any Three' || x.approverType == 'Any Two' || x.approverType == 'Any One')
      }
      else {
        return tempArr;
      }
    }
    else if (index == 2) {
      // return this.corporateApproverTypeArr;
      if (this.corporateUsersArr3.length == 1 || this.corporateUsersArr3.length == 2) {
        return tempArr.filter(x => x.approverType == 'Any One')
      }
      else if (this.corporateUsersArr3.length == 3) {
        return tempArr.filter(x => x.approverType == 'Any Two' || x.approverType == 'Any One')
      }
      else if (this.corporateUsersArr3.length == 4) {
        return tempArr.filter(x => x.approverType == 'Any Three' || x.approverType == 'Any Two' || x.approverType == 'Any One')
      }
      else {
        return tempArr;
      }
    }
    else if (index == 3) {
      //return this.corporateApproverTypeArr;
      if (this.corporateUsersArr4.length == 1 || this.corporateUsersArr4.length == 2) {
        return tempArr.filter(x => x.approverType == 'Any One')
      }
      else if (this.corporateUsersArr4.length == 3) {
        return tempArr.filter(x => x.approverType == 'Any Two' || x.approverType == 'Any One')
      }
      else if (this.corporateUsersArr4.length == 4) {
        return tempArr.filter(x => x.approverType == 'Any Three' || x.approverType == 'Any Two' || x.approverType == 'Any One')
      }
      else {
        return tempArr;
      }
    }
  }

  getArray(index) {
    console.log(index);
    if (index == 0) {
      return this.corporateUsersArr;
    }
    else if (index == 1) {
      return this.corporateUsersArr2;
    }
    else if (index == 2) {
      return this.corporateUsersArr3;
    }
    else if (index == 3) {
      return this.corporateUsersArr4;
    }
  }

  onUserRemoved(user, index) {
    $("input:radio").attr("checked", false);
    if (index == 0) {
      var objIndex = this.corporateUsersArr.findIndex((obj) => obj.id == user.id);
      this.corporateUsersArr.splice(objIndex, 1);
    }
    else if (index == 1) {
      var objIndex = this.corporateUsersArr2.findIndex((obj) => obj.id == user.id);
      this.corporateUsersArr2.splice(objIndex, 1);
    }
    else if (index == 2) {
      var objIndex = this.corporateUsersArr3.findIndex((obj) => obj.id == user.id);
      this.corporateUsersArr3.splice(objIndex, 1);
    }
    else if (index == 3) {
      var objIndex = this.corporateUsersArr4.findIndex((obj) => obj.id == user.id);
      this.corporateUsersArr4.splice(objIndex, 1);
    }
  }

  addUser(index) {
    $("input:radio").attr("checked", false);
    console.log(index);
    var temp1 = this.corporateUsersArr;
    var temp2 = this.corporateUsersArr2;
    var temp3 = this.corporateUsersArr3;
    var temp4 = this.corporateUsersArr4;
    openTinyModel();
    this.selModel = "viewdata"
    this.globalArrayIndex = index;
    this.commonServiceCall.getResponsePromise(this.appConstant.getCorpUsersByCompId + this.companyId.split('-')[0]).subscribe(data => {
      var res = data.resp;
      this.masterUser = [];
      if (res.responseCode == "200") {
        console.log(res.result);
        this.masterUser = res.result;
        this.masterUser.forEach((element) => {
          element.isChecked = false;
          element.isDisabled = false;
        });
      } else {
        this.commonMethod.errorMessage(data);
      }
    });
  }


  closeActionModel() {
    this.selModel = "";
    closeTinyModel();
  }

  selectsingle(item) {
    var objIndex = this.masterUser.findIndex((obj) => obj.id == item.id);
    if (this.masterUser[objIndex].isChecked == true) {
      this.masterUser[objIndex].isChecked = false;
    } else {
      this.masterUser[objIndex].isChecked = true;
    }
  }

  onUserSelected() {
    var newarray = this.masterUser;
    var finalarray = newarray.filter((f) => f.isChecked == true && f.isDisabled == false);
    console.log('final array: ', finalarray);
    finalarray.forEach(element => {
      if (this.globalArrayIndex == 0) {
        this.corporateUsersArr.push(element);
      }
      else if (this.globalArrayIndex == 1) {
        this.corporateUsersArr2.push(element);
      }
      else if (this.globalArrayIndex == 2) {
        this.corporateUsersArr3.push(element);
      }
      else if (this.globalArrayIndex == 3) {
        this.corporateUsersArr4.push(element);
      }
    });
    closeTinyModel();
  }

  onChange(type, level, id) {
    console.log('type: ', type);
    console.log('level: ', level);
    console.log('value: ', id);

    if (this.levelBlockArray.length <= 3) {
      var data = {
        type: type,
        level: level,
        id: id,
      };

      var objIndex = this.HierarchyArr.findIndex((obj) => obj.level == data.level);
      if (objIndex < 0) {
        this.HierarchyArr.push(data);
      }
      else {
        this.HierarchyArr.splice(objIndex, 1);
        this.HierarchyArr.push(data);
      }

      this.levelBlockArray.push(this.levelBlockArray.length);

    }
    else {
      showToastMessage('Yoh have added maximum levels');
    }
  }

  onDefaultWorkflowChange(type, level, id) {
    console.log('type: ', type);
    console.log('level: ', level);
    console.log('value: ', id);
    var data = {
      type: type,
      level: level,
      id: id,
    };

    var objIndex = this.HierarchyArr.findIndex((obj) => obj.level == data.level);
    if (objIndex < 0) {
      this.HierarchyArr.push(data);
    }
    else {
      this.HierarchyArr.splice(objIndex, 1);
      this.HierarchyArr.push(data);
    }

    this.onDefaultFinishWorkflow();
  }

  onDefaultFinishWorkflow() {
    this.corpLimitData = [];
    var corpUserIds = [];
    console.log('Hierarchy Array: ', this.HierarchyArr);
    console.log('Level 1 Array: ', this.corporateUsersArr);
    console.log('Level 2 Array: ', this.corporateUsersArr2);
    console.log('Level 3 Array: ', this.corporateUsersArr3);
    console.log('Level 4 Array: ', this.corporateUsersArr4);
    console.log('Approver type Array: ', this.corpApproverTypeValuesArr);

    for (var i = 0; i < 4; i++) {
      if (i == 0) {
        if (this.corporateUsersArr.length > 0) {
          this.corporateUsersArr.forEach(element => {
            corpUserIds.push(element.id)
          });

          /* check for hierarchy id is blank or not */
          var checkHierarchy = this.HierarchyArr[i];
          if (checkHierarchy == null) {
            var hierarchyid = ""
          }
          else {
            hierarchyid = this.HierarchyArr[i].id
          }

          /* check for corp approver type id is blank or not */
          var checkCorpApprover = this.corpApproverTypeValuesArr[i];
          if (checkCorpApprover == null) {
            var corpApproverTypeVal = 1
          }
          else {
            corpApproverTypeVal = this.corpApproverTypeValuesArr[i].id
          }

          var data = {
            "minAmount": "",
            "maxAmount": "",
            "approverLevelId": i + 1, // block number
            "approverMasterId": corpApproverTypeVal, // any one any two
            "hierarchyMasterId": hierarchyid, // hierarchy ids
            "corpUserId": corpUserIds // user ids according to block level
          }
          this.corpLimitData.push(data);
        }
        corpUserIds = [];
      }
      if (i == 1) {
        if (this.corporateUsersArr2.length > 0) {
          this.corporateUsersArr2.forEach(element => {
            corpUserIds.push(element.id)
          });

          /* check for hierarchy id is blank or not */

          var checkHierarchy = this.HierarchyArr[i];
          if (checkHierarchy == null) {
            var hierarchyid = ""
          }
          else {
            hierarchyid = this.HierarchyArr[i].id
          }

          /* check for corp approver type id is blank or not */

          var checkCorpApprover = this.corpApproverTypeValuesArr[i];
          if (checkCorpApprover == null) {
            var corpApproverTypeVal = 1
          }
          else {
            corpApproverTypeVal = this.corpApproverTypeValuesArr[i].id
          }

          var data = {
            "minAmount": "",
            "maxAmount": "",
            "approverLevelId": i + 1, // block number
            "approverMasterId": corpApproverTypeVal, // any one any two
            "hierarchyMasterId": hierarchyid, // hierarchy ids
            "corpUserId": corpUserIds // user ids according to block level
          }
          this.corpLimitData.push(data);
        }
        corpUserIds = [];
      }
      if (i == 2) {
        if (this.corporateUsersArr3.length > 0) {
          this.corporateUsersArr3.forEach(element => {
            corpUserIds.push(element.id)
          });

          /* check for hierarchy id is blank or not */

          var checkHierarchy = this.HierarchyArr[i];
          if (checkHierarchy == null) {
            var hierarchyid = ""
          }
          else {
            hierarchyid = this.HierarchyArr[i].id
          }

          /* check for corp approver type id is blank or not */
          var checkCorpApprover = this.corpApproverTypeValuesArr[i];
          if (checkCorpApprover == null) {
            var corpApproverTypeVal = 1
          }
          else {
            corpApproverTypeVal = this.corpApproverTypeValuesArr[i].id
          }

          var data = {
            "minAmount": "",
            "maxAmount": "",
            "approverLevelId": i + 1, // block number
            "approverMasterId": corpApproverTypeVal, // any one any two
            "hierarchyMasterId": hierarchyid, // hierarchy ids
            "corpUserId": corpUserIds // user ids according to block level
          }
          this.corpLimitData.push(data);
        }
        corpUserIds = [];
      }
      if (i == 3) {
        if (this.corporateUsersArr4.length > 0) {
          this.corporateUsersArr4.forEach(element => {
            corpUserIds.push(element.id)
          });

          /* check for hierarchy id is blank or not */

          var checkHierarchy = this.HierarchyArr[i];
          if (checkHierarchy == null) {
            var hierarchyid = ""
          }
          else {
            hierarchyid = this.HierarchyArr[i].id
          }

          /* check for corp approver type id is blank or not */
          var checkCorpApprover = this.corpApproverTypeValuesArr[i];
          if (checkCorpApprover == null) {
            var corpApproverTypeVal = 1
          }
          else {
            corpApproverTypeVal = this.corpApproverTypeValuesArr[i].id
          }

          var data = {
            "minAmount": "",
            "maxAmount": "",
            "approverLevelId": i + 1, // block number
            "approverMasterId": corpApproverTypeVal, // any one any two
            "hierarchyMasterId": hierarchyid, // hierarchy ids
            "corpUserId": corpUserIds // user ids according to block level
          }
          this.corpLimitData.push(data);
        }
        corpUserIds = [];
      }
    }
    // this.saveCorpSetLimit(param);
  }

}
