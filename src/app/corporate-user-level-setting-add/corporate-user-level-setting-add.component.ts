import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-corporate-user-level-setting-add',
  templateUrl: './corporate-user-level-setting-add.component.html',
  styleUrls: ['./corporate-user-level-setting-add.component.css']
})
export class CorporateUserLevelSettingAddComponent implements OnInit {

  levelBlockArray: any = [];
  corpApproverTypeValuesArr: any = [];
  corporateUsersArr: any = [];
  corporateUsersArr2: any = [];
  corporateUsersArr3: any = [];
  corporateUsersArr4: any = [];
  masterUser: any = [];
  HierarchyArr: any = [];
  corpLimitData: any = [];
  selModel: any;
  globalArrayIndex: any;
  companyId: any = 1;
  corporateApproverTypeBackupArr: any = [];
  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonMethod: CommonMethods,
    public appConstant: AppConstants,
    private commonDataService: CommonDataShareService,
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Corporate User Level Settings Add";
    this.levelBlockArray.push(this.levelBlockArray.length + 1);
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

    /* API call for get corp details by id */
    this.commonMethod.destroyDataTable();
    this.commonServiceCall.getResponsePromise(this.appConstant.getCorpUsersByCompId + this.companyId).subscribe(data => {
      var res = data.resp;
      this.masterUser = [];
      if (res.responseCode == "200") {
        console.log(res.result);
        this.masterUser = res.result;
        this.commonMethod.setDataTableWithoutEntries(this.commonServiceCall.pageName);
        this.masterUser.forEach((element) => {
          element.isChecked = false;
          element.isDisabled = false;
        });
      } else {
        this.commonMethod.errorMessage(data);
      }
      this.commonMethod.destroyDataTable();
    });
  }

  onChange(type, level, id) {
    console.log('type: ', type);
    console.log('level: ', level);
    console.log('value: ', id);

    if (this.levelBlockArray.length < 3) {
      var data = {
        type: type,
        level: level,
        id: id,
      };


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

  cancel() {
    this.commonMethod.cancel();
  }

  saveCorpUserLevelSetting() {

  }

  closeActionModel() {
    this.selModel = "";
    closeTinyModel();
  }

}
