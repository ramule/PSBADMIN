import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { FormValidationsService } from '../form-validations.service';
import { ImpsUsersService } from './imps-users.service';


declare var showToastMessage: any;

@Component({
  selector: 'app-imps-users',
  templateUrl: './imps-users.component.html',
  styleUrls: ['./imps-users.component.css']
})
export class ImpsUsersComponent implements OnInit {

  impsUsersMaster:any=[]
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    private impsUsersService: ImpsUsersService
  ) { }

  
  ngOnInit(): void {
    this.commonServiceCall.pageName = "Roles";
    this.impsUsersMaster = [
      {
         nick: 'System 1',
         name:'System Administartion',
         email:'abc@gmail.com',
      },
      {
        nick: 'System 2',
        name:'System Administartion',
        email:'xyz@gmail.com',
      },
      {
        nick: 'System 3',
         name:'System Administartion',
         email:'ert@gmail.com',
      },
      {
        nick: 'System 4',
         name:'System Administartion',
         email:'opf@gmail.com',
        },
    ]
    this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
  }

  addUsers()
  {
    this.router.navigateByUrl('/impsUsersAdd')
  }

  gotoEdit()
  {
    this.router.navigateByUrl('/impsUsersEdit')
  }
  

}
