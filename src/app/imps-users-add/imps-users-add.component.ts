import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { DatePipe } from '@angular/common';
import { ImpsUsersAddService } from './imps-users-add.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-imps-users-add',
  templateUrl: './imps-users-add.component.html',
  styleUrls: ['./imps-users-add.component.css']
})
export class ImpsUsersAddComponent implements OnInit {
  showForm: boolean = false;
  usersAddForm: FormGroup;
  remarkForm: FormGroup;
  formErrors = {
    nickname:'',
    name: '',
    email:'',
    roles:'',

  }
  dropdownList = [];
  selectedItems = [];
  dropdownSettings :IDropdownSettings;
  rolesArray = [];

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    public appConstant: AppConstants,
    public datePipe: DatePipe,
    private impsUsersAddService: ImpsUsersAddService
  ) { 
    this.rolesArray = [{
     id:'1',
     roleName:'AEPS Maker'
    },
    {
      id:'2',
      roleName:'AEPS Checker'
     },
     {
      id:'3',
      roleName:'AEPS Approver'
     }]
  }

  public buildForm() {
    this.usersAddForm = this.form.group({
      nickname: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      roles: new FormControl('', [Validators.required]),
    });
    this.usersAddForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.usersAddForm, this.formErrors, true)
    });
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Add Roles";
    this.buildForm();
    this.selectedItems = [
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'roleName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  addUsers()
  {
    this.formValidation.markFormGroupTouched(this.usersAddForm);
    if (this.usersAddForm.valid) {
      var formData = this.usersAddForm.value;
      //var param = this.adminWalletPointAddService.addAdminWalletPoint(formData);
      //this.saveWalletPoints(param)
    } else {
      this.formErrors = this.formValidation.validateForm(this.usersAddForm, this.formErrors, false)
    }
  }


  cancel() 
  {
      this.router.navigateByUrl("/impsUsers");
    }

    onItemSelect(event)
    {

    }

    onSelectAll(event)
    {

    }

}
