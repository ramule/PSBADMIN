import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { Location, TitleCasePipe, DatePipe } from '@angular/common';
import { AppConstants } from '../app-constants';
import { CommonMethods } from '../common-methods';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ImpsUsersEditService } from './imps-users-edit.service';



declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-imps-users-edit',
  templateUrl: './imps-users-edit.component.html',
  styleUrls: ['./imps-users-edit.component.css']
})
export class ImpsUsersEditComponent implements OnInit {

  dropdownList = [];
  selectedItems = [];
  dropdownSettings :IDropdownSettings;
  rolesArray = [];
  usersEditForm: FormGroup;
  formErrors = {
    nickname:'',
    name: '',
    email:'',
    roles:'',

  }
  userId: any;
  remarkHistoryArr :any=[];


  roleId: any;
  selModel: any;
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    private location: Location,
    public appConstant : AppConstants,
    private commonMethod : CommonMethods,
    public titlecasePipe : TitleCasePipe,
    public datePipe: DatePipe,
    private impsUsersEditService: ImpsUsersEditService
  ) { }

 
  public buildForm() {
    this.usersEditForm = this.form.group({
      nickname: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      roles: new FormControl('', [Validators.required]),
    });
    this.usersEditForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.usersEditForm, this.formErrors, true)
    });
  }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Edit Stations";
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
    this.getRolesById()
    this.usersEditForm.patchValue({
        name:'MEM Maker',
    })
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

  getRolesById()
  {
    // this.commonMethod.showLoader();
    // this.commonServiceCall.getResponsePromise(this.appConstant.getRewardPointsById + param).subscribe((result) => {

    // })

    this.selectedItems =[{
      id:'1',
      roleName:'AEPS Approver'
     }]
  }

  update(){
    this.formValidation.markFormGroupTouched(this.usersEditForm);
    if (this.usersEditForm.valid) {
      var formData = this.usersEditForm.value;
     // var param = this.adminWalletPointsEditService.adminWalletPointUpdateCall(formData, this.userId.id) ;
      //this.updateWalletPoint(param);
    } else {
      this.formErrors = this.formValidation.validateForm(this.usersEditForm, this.formErrors, false)
    }
  }

  cancel() {
    this.router.navigateByUrl('/impsUsers')
  }

  onItemSelect(event)
  {

  }

  onSelectAll(event)
  {

  }

}


