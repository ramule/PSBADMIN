import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { Location } from '@angular/common';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CorporateSetLimitAddService } from './corporate-set-limit-add.service';
import { browserRefresh } from '../app.component';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-corporate-set-limit-add',
  templateUrl: './corporate-set-limit-add.component.html',
  styleUrls: ['./corporate-set-limit-add.component.css']
})
export class CorporateSetLimitAddComponent implements OnInit {

  id = 1;
  roleId: any;
  containers = [];
  corporateSetLimitAddForm: FormGroup;
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

  corporateLevelsArr: any = [];
  corpApproverTypeValuesArr: any = [];
  corporateApproverTypeArr: any = [];
  corporateApproverTypeBackupArr: any = [];
  corporateUsersArr: any = [];
  corporateUsersArr2: any = [];
  corporateUsersArr3: any = [];
  corporateUsersArr4: any = [];
  levelBlockArray: any = [];
  corpLimitData: any = [];
  limitCounter: any = 0;
  globalArrayIndex: any;
  navigationFromUrl: any;
  defaultTransFlag: boolean;
  levelBlockCounter: any = 0;
  selModel: any;
  isDefaultWorkflowChecked: boolean = false;
  HierarchyArr: any = [];
  masterUser: any = [];
  companyId: any = ""
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public location: Location,
    private corpSetLimitAddService: CorporateSetLimitAddService
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

    this.commonServiceCall.pageName = "Corporate Set Limit Add";
    this.roleId = this.commonDataShareService.roleId;
    this.buildForm();
    this.getCorporateLevels(this.id);
    this.getCorporateApproverType(this.id);
    this.getCorporateUsers(this.id);
    this.companyId = this.location.getState();
    console.log(this.companyId);
    console.log('navigation from: ', this.companyId.url);
    this.navigationFromUrl = this.companyId.url;
    if (this.navigationFromUrl == '/corpSetLimit') {
      this.defaultTransFlag = true;
    }
    else if (this.navigationFromUrl == '/corpSetLimitView') {
      this.defaultTransFlag = false;
    }
    console.log(this.defaultTransFlag);
    this.levelBlockArray.push(this.levelBlockArray.length + 1);
  }

  public buildForm() {
    this.corporateSetLimitAddForm = this.form.group({
      fromLimit: new FormControl('', [Validators.required]),
      toLimit: new FormControl('', [Validators.required]),
    });
    this.corporateSetLimitAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.corporateSetLimitAddForm, this.formErrors, true)
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

  getCorporateLevels(id) {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getCorpLevelsUrl + id).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.corporateLevelsArr = res.result;
        console.log('corporate levels array: ', this.corporateLevelsArr);
      } else {
        $('table.display').DataTable({
          "language": {
            "emptyTable": "No Data found"
          }
        });
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCorpLevelsUrl, res);
      }
      this.commonMethod.destroyDataTable();
    });
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

  getCorporateUsers(id) {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getCorpUsersByCompIdUrl + id).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);

      } else {
        $('table.display').DataTable({
          "language": {
            "emptyTable": "No Data found"
          }
        });
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.getCorpUsersByCompIdUrl, res);
      }
      this.commonMethod.destroyDataTable();
    });
  }

  onAmountChange(event) {
    this.isDefaultWorkflowChecked = false;
    $("input:radio").attr("checked", false);
  }

  onNewLimitclicked() {
    this.limitCounter++;
    this.containers.push(this.containers.length);
  }

  cancel() {
    console.log(this.defaultTransFlag);
    if (this.defaultTransFlag == true) {
      this.router.navigateByUrl('/corpSetLimit');
    }
    else {
      this.router.navigateByUrl('/corpSetLimitView', { state: { id: this.companyId.id, companyId: this.companyId.companyId } });
    }
  }

  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
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

  onCorpApproverTypeChange(event, index) {
    this.isDefaultWorkflowChecked = false;
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

  getArray(index) {
    // console.log(index);
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

  addUser(index) {
    this.commonMethod.destroyDataTable();
    this.isDefaultWorkflowChecked = false;
    $("input:radio").attr("checked", false);
    console.log(index);
    var temp1 = this.corporateUsersArr;
    var temp2 = this.corporateUsersArr2;
    var temp3 = this.corporateUsersArr3;
    var temp4 = this.corporateUsersArr4;
    openTinyModel();
    this.selModel = "viewdata"
    this.globalArrayIndex = index;
    this.commonServiceCall.getResponsePromise(this.appConstants.getCorpUsersByCompId + this.companyId.companyId).subscribe(data => {
      var res = data.resp;
      this.masterUser = [];
      if (res.responseCode == "200") {
        console.log(res.result);
        this.masterUser = res.result;
        this.masterUser.forEach((element) => {
          element.isChecked = false;
          element.isDisabled = false;
        });
        temp1.forEach((element) => {
          var objIndex = this.masterUser.findIndex((obj) => obj.id == element.id);
          if (this.masterUser[objIndex].isDisabled == true) {
            this.masterUser[objIndex].isDisabled = false;
          } else {
            this.masterUser[objIndex].isDisabled = true;
          }
        });
        temp2.forEach((element) => {
          var objIndex = this.masterUser.findIndex((obj) => obj.id == element.id);
          if (this.masterUser[objIndex].isDisabled == true) {
            this.masterUser[objIndex].isDisabled = false;
          } else {
            this.masterUser[objIndex].isDisabled = true;
          }
        });
        temp3.forEach((element) => {
          var objIndex = this.masterUser.findIndex((obj) => obj.id == element.id);
          if (this.masterUser[objIndex].isDisabled == true) {
            this.masterUser[objIndex].isDisabled = false;
          } else {
            this.masterUser[objIndex].isDisabled = true;
          }
        });
        temp4.forEach((element) => {
          var objIndex = this.masterUser.findIndex((obj) => obj.id == element.id);
          if (this.masterUser[objIndex].isDisabled == true) {
            this.masterUser[objIndex].isDisabled = false;
          } else {
            this.masterUser[objIndex].isDisabled = true;
          }
        });
        this.commonMethod.setDataTableWithoutEntries(this.commonServiceCall.pageName);
      } else {
        this.commonMethod.errorMessage(data);
      }
    });
  }

  onDefaultFinishWorkflow(formdata) {
    console.log(formdata);
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
            "minAmount": formdata.fromLimit == "" || formdata.fromLimit == null ? 0 : formdata.fromLimit,
            "maxAmount": formdata.toLimit == "" || formdata.toLimit == null ? 0 : formdata.toLimit,
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
            "minAmount": formdata.fromLimit == "" || formdata.fromLimit == null ? 0 : formdata.fromLimit,
            "maxAmount": formdata.toLimit == "" || formdata.toLimit == null ? 0 : formdata.toLimit,
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
            "minAmount": formdata.fromLimit == "" || formdata.fromLimit == null ? 0 : formdata.fromLimit,
            "maxAmount": formdata.toLimit == "" || formdata.toLimit == null ? 0 : formdata.toLimit,
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
            "minAmount": formdata.fromLimit == "" || formdata.fromLimit == null ? 0 : formdata.fromLimit,
            "maxAmount": formdata.toLimit == "" || formdata.toLimit == null ? 0 : formdata.toLimit,
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

  saveCorpSetLimit() {
    this.formValidation.markFormGroupTouched(this.corporateSetLimitAddForm);
    if (this.defaultTransFlag == false) {
      if (this.corporateSetLimitAddForm.valid) {
        var fromAmount = Number(this.corporateSetLimitAddForm.get('fromLimit').value);
        var toAmount = Number(this.corporateSetLimitAddForm.get('toLimit').value);

        if (this.isDefaultWorkflowChecked) {
          if (fromAmount < toAmount) {
            if(this.corpLimitData.length > 0) {
              var param = this.corpSetLimitAddService.saveCorpSetLimitCall(this.corpLimitData, this.companyId);
              console.log(param);
              this.save(param);
            }
            else {
              showToastMessage('Please Add Atleast One User');
            }
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
        this.formErrors = this.formValidation.validateForm(this.corporateSetLimitAddForm, this.formErrors, false)
      }
    }
    else {
      if (this.isDefaultWorkflowChecked) {
        var param = this.corpSetLimitAddService.saveCorpSetLimitCall(this.corpLimitData, this.companyId);
        console.log(param);
        this.save(param);
      }
      else {
        showToastMessage('Please Select Finish Workflow');
      }
    }
  }

  saveCorpSetLimitWithRemark() {
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      console.log(this.corpLimitData);
      var formData = this.remarkForm.value;
      if(this.corpLimitData.length > 0) {
        var param = this.corpSetLimitAddService.saveCorpSetLimitWithRemarkCall(this.corpLimitData, this.companyId, formData);
        this.save(param);
      }
      else {
        showToastMessage('Please Add Atleast One User');
      }
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  openActionModel(action, formdata) {
    if (this.defaultTransFlag == false) {
      if (this.corporateSetLimitAddForm.valid) {

        var fromAmount = Number(this.corporateSetLimitAddForm.get('fromLimit').value);
        var toAmount = Number(this.corporateSetLimitAddForm.get('toLimit').value);

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
        this.formErrors = this.formValidation.validateForm(this.corporateSetLimitAddForm, this.formErrors, false)
      }
    }
    else {
      if (this.isDefaultWorkflowChecked) {
        openTinyModel();
        this.selModel = action;
        this.buildForm();
        console.log(formdata.calculatorType);
        this.corporateSetLimitFields.fromLimit = formdata.fromLimit;
        this.corporateSetLimitFields.toLimit = formdata.toLimit;
      }
      else {
        showToastMessage('Please Select Finish Workflow');
      }
    }
  }

  save(param) {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.setCorpTransactionsLimitUrl, param).subscribe(data => {
      var res = data.resp;
      if (res.responseCode == "200") {
        showToastMessage(res.responseMessage);
        this.router.navigateByUrl('/corpSetLimitView', { state: { id: this.companyId.id, companyId: this.companyId.companyId } });
      }
      else {
        this.commonMethod.hideLoader();
        showToastMessage(res.responseMessage);
      }
      this.commonMethod.hideLoader();
    });
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

  onUserRemoved(user, index) {
    this.isDefaultWorkflowChecked = false;
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

    this.onDefaultFinishWorkflow(formdata);
  }

  closeActionModel() {
    this.selModel = "";
    closeTinyModel();
  }

  closeActionModel1() {
    this.selModel = "";
    this.corporateSetLimitAddForm.patchValue({
      fromLimit: this.corporateSetLimitFields.fromLimit,
      toLimit: this.corporateSetLimitFields.toLimit,
    });
    closeTinyModel();
  }

}
