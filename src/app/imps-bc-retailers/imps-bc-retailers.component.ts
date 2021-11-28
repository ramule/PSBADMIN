import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { FormValidationsService } from '../form-validations.service';
import { ImpsBcRetailersService } from './imps-bc-retailers.service';


declare var showToastMessage: any;

@Component({
  selector: 'app-imps-bc-retailers',
  templateUrl: './imps-bc-retailers.component.html',
  styleUrls: ['./imps-bc-retailers.component.css']
})
export class ImpsBcRetailersComponent implements OnInit {

  impsRetailersMaster:any=[]
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    private impsRetailersService: ImpsBcRetailersService
  ) { }

  
  ngOnInit(): void {
    this.commonServiceCall.pageName = "BC Retailers";
    this.impsRetailersMaster = [
      {
         bc:'test 1',
         name:'PBT test2',
         code:'Mango',
         account:'3456789'
      },
      {
        bc:'test 1',
        name:'PBT test2',
        code:'Mango',
        account:'3456789'
      },
      {
        bc:'test 1',
        name:'PBT test2',
        code:'Mango',
        account:'3456789'
      },
      {
        bc:'test 1',
        name:'PBT test2',
        code:'Mango',
        account:'3456789'
        },
    ]
    this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
  }

  addRetailers()
  {
    this.router.navigateByUrl('/impsBCRetailerAdd')
  }

  gotoEdit()
  {
    this.router.navigateByUrl('/impsBCRetailerEdit')
  }

}
