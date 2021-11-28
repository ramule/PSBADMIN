import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { Location } from '@angular/common';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CorporateSetLimitEditService } from './corporate-set-limit-edit.service';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-corporate-set-limit-edit',
  templateUrl: './corporate-set-limit-edit.component.html',
  styleUrls: ['./corporate-set-limit-edit.component.css']
})
export class CorporateSetLimitEditComponent implements OnInit {

  id = 1;
  corporateSetLimitEditForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    fromLimit: '',
    toLimit: '',
    remark: ''
  };

  corporateSetLimitFields = {
    fromLimit: '',
    toLimit: '',
    remark: ''
  };

  corpApproverTypeValuesArr: any = [];
  corporateApproverTypeBackupArr: any = [];
  corporateUsersArr: any = [];
  corporateUsersArr2: any = [];
  corporateUsersArr3: any = [];
  corporateUsersArr4: any = [];
  receivedCorpUsersArr: any = [];
  receivedCorpUsersArr2: any = [];
  receivedCorpUsersArr3: any = [];
  receivedCorpUsersArr4: any = [];
  corporateApproverTypeArr: any = [];
  masterUser: any = [];
  levelBlockArray: any = [];
  HierarchyArr: any = [];
  corpLimitData: any = [];
  selModel: any;
  transLimitId: any;
  globalArrayIndex: any;
  defaultTransFlag: boolean;
  isDefaultWorkflowChecked: boolean = false;
  companyDetails: any = "";
  roleId: any;
  createdBy: any;
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public location: Location,
    private corporateSetLimitEditService: CorporateSetLimitEditService
  ) { }

  ngOnInit() {

    this.commonDataShareService.browserRefresh = false;
    this.commonDataShareService.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonDataShareService.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/corpSetLimit');
      return;
    }

    this.commonServiceCall.pageName = "Corporate Set Limit Edit";
    this.roleId = this.commonDataShareService.roleId;
    this.buildForm();
    this.getCorporateApproverType(this.id);
    this.companyDetails = this.location.getState();
    console.log(this.companyDetails);
    this.defaultTransFlag = this.companyDetails.isDefaultTrans;
    console.log(this.defaultTransFlag);
    console.log('navigation from: ', this.companyDetails.url);
    this.levelBlockArray.push(this.levelBlockArray.length + 1);
    var param = {
      "id": this.companyDetails.id,
      "accNumber": this.companyDetails.accNum,
      "companyId": this.companyDetails.companyId,
      "transLimitId": this.companyDetails.transLimitId
    };
    this.getCorpSetLimitById(param);
  }

  public buildForm() {
    this.corporateSetLimitEditForm = this.form.group({
      fromLimit: new FormControl('', [Validators.required]),
      toLimit: new FormControl('', [Validators.required]),
    });
    this.corporateSetLimitEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.corporateSetLimitEditForm, this.formErrors, true)
    });

    if (this.selModel == 'remarkField') {
      this.remarkForm = this.form.group({
        remark: new FormControl('', [Validators.required])
      });
      this.remarkForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, true)
      });
    }
  }

  onAmountChange(event) {
    this.isDefaultWorkflowChecked = false;
    $("input:radio").attr("checked", false);
  }

  getCorpSetLimitById(param) {
    console.log('editable item: ', param);
    this.commonMethod.showLoader();
    var reqUrl = this.appConstants.getTranByAccNoAndCompIdAndTransIdUrl + param.accNumber + '/' + param.companyId + '/' + param.transLimitId + '/' + param.id;
    this.commonServiceCall.getResponsePromise(reqUrl).subscribe(data => {
      var res = data.resp;
      console.log(res);
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log(res.result);
        this.createdBy = res.result.createdBy;
        this.levelBlockArray = res.result.corpLimitListData[0];
        console.log(this.levelBlockArray);

        this.transLimitId = this.levelBlockArray[0].transLimitId;
        this.corporateSetLimitEditForm.patchValue({
          fromLimit: this.levelBlockArray[0].minAmount,
          toLimit: this.levelBlockArray[0].maxAmount
        });

        this.levelBlockArray.forEach(element => {
          var data = {
            type: element.hierarchyMasterName,
            level: element.approverLevelId,
            id: element.hierarchyMasterId,
          };
          this.HierarchyArr.push(data);
        });

        console.log(this.HierarchyArr);

        this.levelBlockArray.forEach(element => {
          var param = {
            level: element.approverLevelId,
            id: element.approverMasterId
          }
          this.corpApproverTypeValuesArr.push(param);
        });

        console.log(this.corpApproverTypeValuesArr);
        console.log(this.levelBlockArray[2]);

        this.corporateUsersArr = this.levelBlockArray[0];
        this.receivedCorpUsersArr = this.corporateUsersArr.corpUserData;
        console.log('received corp users 1: ', this.receivedCorpUsersArr);
        console.log(this.corporateUsersArr);

        if (this.levelBlockArray[1] !== "" || this.levelBlockArray[1] !== null || this.levelBlockArray[1] !== undefined) {
          this.corporateUsersArr2 = this.levelBlockArray[1];
          this.receivedCorpUsersArr2 = this.corporateUsersArr2.corpUserData;
          console.log('received corp users 2: ', this.receivedCorpUsersArr2);
          console.log(this.corporateUsersArr2);
        }

        if (this.levelBlockArray[2] !== "" || this.levelBlockArray[2] !== null || this.levelBlockArray[2] !== undefined) {
          this.corporateUsersArr3 = this.levelBlockArray[2];
          this.receivedCorpUsersArr3 = this.corporateUsersArr3.corpUserData;
          console.log('received corp users 3: ', this.receivedCorpUsersArr3);
          console.log(this.corporateUsersArr3);
        }

        if (this.levelBlockArray[3] !== "" || this.levelBlockArray[3] !== null || this.levelBlockArray[3] !== undefined) {
          this.corporateUsersArr4 = this.levelBlockArray[3];
          this.receivedCorpUsersArr4 = this.corporateUsersArr4.corpUserData;
          console.log('received corp users 4: ', this.receivedCorpUsersArr4);
          console.log(this.corporateUsersArr4);
        }
      }
      else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getTranByAccNoAndCompIdAndTransIdUrl, res);
      }
    })
  }


  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  onCorpApproverTypeChange(event, index) {
    this.isDefaultWorkflowChecked = false;
    $("input:radio").attr("checked", false);
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

    console.log(this.corpApproverTypeValuesArr);
  }

  getCorporateApproverType(id) {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getCorpApproverTypeListUrl + id).subscribe((data) => {
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
        this.errorCallBack(this.appConstants.getCorpApproverTypeListUrl, res);
      }
      this.commonMethod.destroyDataTable();
    });
  }

  filterCorpApproverArray(index) {
    console.log('index: ', index);
    var tempArr = [];
    console.log(this.corporateApproverTypeArr);
    if (index == 0) {

      tempArr.push(this.corporateUsersArr);
      console.log('temp array: ', tempArr);
      console.log(tempArr[0].approverMasterId);
      console.log(tempArr.length);
      if (this.receivedCorpUsersArr.length == 1 || this.receivedCorpUsersArr.length == 2) {
        return this.corporateApproverTypeArr.filter(x => x.approverType == 'Any One')
      }
      else if (this.receivedCorpUsersArr.length == 3) {
        return this.corporateApproverTypeArr.filter(x => x.approverType == 'Any Two' || x.approverType == 'Any One')
      }
      else if (this.receivedCorpUsersArr.length == 4) {
        return this.corporateApproverTypeArr.filter(x => x.approverType == 'Any Three' || x.approverType == 'Any Two' || x.approverType == 'Any One')
      }
      else {
        return this.corporateApproverTypeArr;
      }
    }
    else if (index == 1) {

      tempArr.push(this.corporateUsersArr2);
      console.log('temp array: ', tempArr);
      console.log(tempArr.length);
      if (this.receivedCorpUsersArr2.length == 1 || this.receivedCorpUsersArr2.length == 2) {
        return this.corporateApproverTypeArr.filter(x => x.approverType == 'Any One')
      }
      else if (this.receivedCorpUsersArr2.length == 3) {
        return this.corporateApproverTypeArr.filter(x => x.approverType == 'Any Two' || x.approverType == 'Any One')
      }
      else if (this.receivedCorpUsersArr2.length == 4) {
        return this.corporateApproverTypeArr.filter(x => x.approverType == 'Any Three' || x.approverType == 'Any Two' || x.approverType == 'Any One')
      }
      else {
        return this.corporateApproverTypeArr;
      }
    }
    else if (index == 2) {

      tempArr.push(this.corporateUsersArr3);
      console.log('temp array: ', tempArr);
      console.log(tempArr.length);
      if (this.receivedCorpUsersArr3.length == 1 || this.receivedCorpUsersArr3.length == 2) {
        return this.corporateApproverTypeArr.filter(x => x.approverType == 'Any One')
      }
      else if (this.receivedCorpUsersArr3.length == 3) {
        return this.corporateApproverTypeArr.filter(x => x.approverType == 'Any Two' || x.approverType == 'Any One')
      }
      else if (this.receivedCorpUsersArr3.length == 4) {
        return this.corporateApproverTypeArr.filter(x => x.approverType == 'Any Three' || x.approverType == 'Any Two' || x.approverType == 'Any One')
      }
      else {
        return this.corporateApproverTypeArr;
      }
    }
    else if (index == 3) {

      tempArr.push(this.corporateUsersArr4);
      console.log('temp array: ', tempArr);
      console.log(tempArr.length);
      if (this.receivedCorpUsersArr4.length == 1 || this.receivedCorpUsersArr4.length == 2) {
        return this.corporateApproverTypeArr.filter(x => x.approverType == 'Any One')
      }
      else if (this.receivedCorpUsersArr4.length == 3) {
        return this.corporateApproverTypeArr.filter(x => x.approverType == 'Any Two' || x.approverType == 'Any One')
      }
      else if (this.receivedCorpUsersArr4.length == 4) {
        return this.corporateApproverTypeArr.filter(x => x.approverType == 'Any Three' || x.approverType == 'Any Two' || x.approverType == 'Any One')
      }
      else {
        return this.corporateApproverTypeArr;
      }
    }
    tempArr = [];
  }

  getArray(index) {
    console.log(index);
    if (index == 0) {
      return this.receivedCorpUsersArr;
    }
    else if (index == 1) {
      return this.receivedCorpUsersArr2;
    }
    else if (index == 2) {
      return this.receivedCorpUsersArr3;
    }
    else if (index == 3) {
      return this.receivedCorpUsersArr4;
    }
  }

  onUserRemoved(user, index) {
    this.isDefaultWorkflowChecked = false;
    $("input:radio").attr("checked", false);

    if (index == 0) {
      $("#sl_corpApprover_type").val('');
      var objIndex = this.receivedCorpUsersArr.findIndex((obj) => obj.userId == user.userId);
      this.receivedCorpUsersArr.splice(objIndex, 1);
      console.log(this.receivedCorpUsersArr);
    }
    else if (index == 1) {
      $("#sl_corpApprover_type").val('');
      var objIndex = this.receivedCorpUsersArr2.findIndex((obj) => obj.userId == user.userId);
      this.receivedCorpUsersArr2.splice(objIndex, 1);
    }
    else if (index == 2) {
      $("#sl_corpApprover_type").val('');
      var objIndex = this.receivedCorpUsersArr3.findIndex((obj) => obj.userId == user.userId);
      this.receivedCorpUsersArr3.splice(objIndex, 1);
    }
    else if (index == 3) {
      $("#sl_corpApprover_type").val('');
      var objIndex = this.receivedCorpUsersArr4.findIndex((obj) => obj.userId == user.userId);
      this.receivedCorpUsersArr4.splice(objIndex, 1);
    }
  }

  addUser(index) {
    this.isDefaultWorkflowChecked = false;
    $("input:radio").attr("checked", false);

    console.log(index);
    var temp1 = this.receivedCorpUsersArr;
    var temp2 = this.receivedCorpUsersArr2;
    var temp3 = this.receivedCorpUsersArr3;
    var temp4 = this.receivedCorpUsersArr4;
    openTinyModel();
    this.selModel = "viewdata"
    this.globalArrayIndex = index;
    // this.masterUser = [
    //   {id:1,user_disp_name: "Ravi", companyName: "InfraSoft"},
    //   {id:2,user_disp_name: "Vikrant", companyName: "InfraSoft"},
    //   {id:3,user_disp_name: "Shubham", companyName: "InfraSoft"},
    // ]
    this.commonServiceCall.getResponsePromise(this.appConstants.getCorpUsersByCompId + this.companyDetails.companyId).subscribe(data => {
      var res = data.resp;
      this.masterUser = [];
      if (res.responseCode == "200") {
        console.log(res.result);
        this.masterUser = res.result;
        console.log('master users: ', this.masterUser);
        this.masterUser.forEach((element) => {
          element.isChecked = false;
          element.isDisabled = false;
        });
        temp1.forEach((element) => {
          var objIndex = this.masterUser.findIndex((obj) => obj.id == element.userId);
          if (this.masterUser[objIndex].isDisabled == true) {
            this.masterUser[objIndex].isDisabled = false;
          } else {
            this.masterUser[objIndex].isDisabled = true;
          }
        });
        temp2.forEach((element) => {
          var objIndex = this.masterUser.findIndex((obj) => obj.id == element.userId);
          if (this.masterUser[objIndex].isDisabled == true) {
            this.masterUser[objIndex].isDisabled = false;
          } else {
            this.masterUser[objIndex].isDisabled = true;
          }
        });
        temp3.forEach((element) => {
          var objIndex = this.masterUser.findIndex((obj) => obj.id == element.userId);
          if (this.masterUser[objIndex].isDisabled == true) {
            this.masterUser[objIndex].isDisabled = false;
          } else {
            this.masterUser[objIndex].isDisabled = true;
          }
        });
        temp4.forEach((element) => {
          var objIndex = this.masterUser.findIndex((obj) => obj.id == element.userId);
          if (this.masterUser[objIndex].isDisabled == true) {
            this.masterUser[objIndex].isDisabled = false;
          } else {
            this.masterUser[objIndex].isDisabled = true;
          }
        });
        this.commonMethod.setDataTableWithoutEntries(this.commonServiceCall.pageName);
      } else {
        console.log('entered into error');
        this.commonMethod.errorMessage(data);
      }
    });
  }

  onChange(type, level, id) {
    this.isDefaultWorkflowChecked = false;
    $('input[name=radioboxdemo]').attr('checked', false);
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

      console.log(this.HierarchyArr);
      this.levelBlockArray.push(this.levelBlockArray.length);

    }
    else {
      showToastMessage('Yoh have added maximum levels');
    }
  }

  onDefaultWorkflowChange(type, level, id, formdata) {
    this.isDefaultWorkflowChecked = true;
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

    console.log(this.HierarchyArr);

    this.onDefaultFinishWorkflow(formdata);
  }

  onDefaultFinishWorkflow(formdata) {
    console.log(formdata);
    this.corpLimitData = [];
    var corpUserIds = [];
    console.log('Hierarchy Array: ', this.HierarchyArr);
    console.log('Level 1 Array: ', this.receivedCorpUsersArr);
    console.log('Level 2 Array: ', this.receivedCorpUsersArr2);
    console.log('Level 3 Array: ', this.receivedCorpUsersArr3);
    console.log('Level 4 Array: ', this.receivedCorpUsersArr4);
    console.log('Approver type Array: ', this.corpApproverTypeValuesArr);

    for (var i = 0; i < 4; i++) {
      if (i == 0) {
        if (this.receivedCorpUsersArr.length > 0) {
          this.receivedCorpUsersArr.forEach(element => {
            var inputdata = {
              "userId": element.userId
            }
            corpUserIds.push(inputdata)
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
            "minAmount": formdata.fromLimit,
            "maxAmount": formdata.toLimit,
            "transLimitId": this.transLimitId ? this.transLimitId : 0,
            "approverLevelId": i + 1, // block number
            "approverMasterId": corpApproverTypeVal, // any one any two
            "hierarchyMasterId": hierarchyid, // hierarchy ids
            "corpUserData": corpUserIds // user ids according to block level
          }
          this.corpLimitData.push(data);
        }
        corpUserIds = [];
      }
      if (i == 1) {
        if (this.receivedCorpUsersArr2.length > 0) {
          this.receivedCorpUsersArr2.forEach(element => {
            var inputdata = {
              "userId": element.userId
            }
            corpUserIds.push(inputdata)
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
            "minAmount": formdata.fromLimit,
            "maxAmount": formdata.toLimit,
            "transLimitId": this.transLimitId ? this.transLimitId : 0,
            "approverLevelId": i + 1, // block number
            "approverMasterId": corpApproverTypeVal, // any one any two
            "hierarchyMasterId": hierarchyid, // hierarchy ids
            "corpUserData": corpUserIds // user ids according to block level
          }
          this.corpLimitData.push(data);
        }
        corpUserIds = [];
      }
      if (i == 2) {
        if (this.receivedCorpUsersArr3.length > 0) {
          this.receivedCorpUsersArr3.forEach(element => {
            var inputdata = {
              "userId": element.userId
            }
            corpUserIds.push(inputdata)
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
            "minAmount": formdata.fromLimit,
            "maxAmount": formdata.toLimit,
            "transLimitId": this.transLimitId ? this.transLimitId : 0,
            "approverLevelId": i + 1, // block number
            "approverMasterId": corpApproverTypeVal, // any one any two
            "hierarchyMasterId": hierarchyid, // hierarchy ids
            "corpUserData": corpUserIds // user ids according to block level
          }
          this.corpLimitData.push(data);
        }
        corpUserIds = [];
      }
      if (i == 3) {
        if (this.receivedCorpUsersArr4.length > 0) {
          this.receivedCorpUsersArr4.forEach(element => {
            var inputdata = {
              "userId": element.userId
            }
            corpUserIds.push(inputdata)
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
            "minAmount": formdata.fromLimit,
            "maxAmount": formdata.toLimit,
            "transLimitId": this.transLimitId ? this.transLimitId : 0,
            "approverLevelId": i + 1, // block number
            "approverMasterId": corpApproverTypeVal, // any one any two
            "hierarchyMasterId": hierarchyid, // hierarchy ids
            "corpUserData": corpUserIds // user ids according to block level
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
    $("#sl_corpApprover_type").val('');
    var newarray = this.masterUser;
    var finalarray = newarray.filter((f) => f.isChecked == true && f.isDisabled == false);
    console.log('final array: ', finalarray);
    finalarray.forEach(element => {
      if (this.globalArrayIndex == 0) {
        console.log(element);
        var param = {
          "transLimitUserId": "",
          "userId": element.id,
          "corpUSerName": element.first_name
        };
        this.receivedCorpUsersArr.push(param);
      }
      else if (this.globalArrayIndex == 1) {
        param = {
          "transLimitUserId": "",
          "userId": element.id,
          "corpUSerName": element.first_name
        };
        this.receivedCorpUsersArr2.push(param);
      }
      else if (this.globalArrayIndex == 2) {
        param = {
          "transLimitUserId": "",
          "userId": element.id,
          "corpUSerName": element.first_name
        };
        this.receivedCorpUsersArr3.push(param);
      }
      else if (this.globalArrayIndex == 3) {
        param = {
          "transLimitUserId": "",
          "userId": element.id,
          "corpUSerName": element.first_name
        };
        this.receivedCorpUsersArr4.push(param);
      }
    });
    closeTinyModel();
  }

  closeActionModel() {
    this.selModel = "";
    closeTinyModel();
  }

  closeActionModel1() {
    this.selModel = "";
    this.corporateSetLimitEditForm.patchValue({
      fromLimit: this.corporateSetLimitFields.fromLimit,
      toLimit: this.corporateSetLimitFields.toLimit,
    });
    closeTinyModel();
  }

  cancel() {
    if (this.commonServiceCall.makerRequestEditUrl == "/corpSetLimitView") {
      this.router.navigateByUrl('/corpSetLimitView', { state: { id: this.companyDetails.accNum, companyId: this.companyDetails.companyId } });
    }
    else if (this.commonServiceCall.makerRequestEditUrl == "/corpMakerRequests") {
      this.router.navigateByUrl('/corpMakerRequests', { state: { id: this.companyDetails.accNum, companyId: this.companyDetails.companyId } });
    }
    else {
      this.router.navigateByUrl('/corpSetLimitView', { state: { id: this.companyDetails.accNum, companyId: this.companyDetails.companyId } });
    }
  }

  openActionModel(action, formdata) {
    if (this.corporateSetLimitEditForm.valid) {

      var fromAmount = Number(this.corporateSetLimitEditForm.get('fromLimit').value);
      var toAmount = Number(this.corporateSetLimitEditForm.get('toLimit').value);

      if (this.isDefaultWorkflowChecked) {
        if (fromAmount < toAmount) {
          openTinyModel();
          this.selModel = action;
          this.buildForm();
          console.log(formdata.calculatorType);
          this.corporateSetLimitFields.fromLimit = formdata.fromLimit;
          this.corporateSetLimitFields.toLimit = formdata.toLimit;
        }
        else {
          showToastMessage('Please Enter Valid Range Of Amounts');
        }
      }
      else {
        showToastMessage('Please Select Finish Workflow');
      }
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.corporateSetLimitEditForm, this.formErrors, false)
    }
  }

  updateCorpSetLimit() {
    this.formValidation.markFormGroupTouched(this.corporateSetLimitEditForm);
    if (this.corporateSetLimitEditForm.valid) {

      var fromAmount = Number(this.corporateSetLimitEditForm.get('fromLimit').value);
      var toAmount = Number(this.corporateSetLimitEditForm.get('toLimit').value);

      if (this.isDefaultWorkflowChecked) {
        if (fromAmount == 0 && toAmount == 0) {
          var param = this.corporateSetLimitEditService.updateCorpSetLimitCall(this.corpLimitData, this.companyDetails, this.createdBy);
          console.log(param);
          this.update(param);
        }
        else if (fromAmount < toAmount) {
          var param = this.corporateSetLimitEditService.updateCorpSetLimitCall(this.corpLimitData, this.companyDetails, this.createdBy);
          console.log(param);
          this.update(param);
        }
        else {
          showToastMessage('Please Enter Valid Range Of Amounts');
        }
      }
      else {
        showToastMessage('Please Select Finish Workflow');
      }
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.corporateSetLimitEditForm, this.formErrors, false)
    }
  }

  updateCorpSetLimitWithRemark() {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      console.log(this.corpLimitData);
      var formData = this.remarkForm.value;
      var param = this.corporateSetLimitEditService.updateCorpSetLimitWithRemarkCall(this.corpLimitData, this.companyDetails, this.createdBy, formData);
      this.update(param);
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  update(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateCorpTransactionsLimitUrl, param).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        showToastMessage(res.responseMessage);

        if (this.commonServiceCall.makerRequestEditUrl == "/corpSetLimitView") {
          this.router.navigateByUrl('/corpSetLimitView', { state: { id: this.companyDetails.accNum, companyId: this.companyDetails.companyId } });
        }
        else if (this.commonServiceCall.makerRequestEditUrl == "/corpMakerRequests") {
          this.router.navigateByUrl('/corpMakerRequests', { state: { id: this.companyDetails.accNum, companyId: this.companyDetails.companyId } });
        }
        else {
          this.router.navigateByUrl('/corpSetLimitView', { state: { id: this.companyDetails.accNum, companyId: this.companyDetails.companyId } });
        }
      }
      else {
        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
      }
      this.commonMethod.hideLoader();
    });
  }

}
