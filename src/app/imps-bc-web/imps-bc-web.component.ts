import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { FormValidationsService } from '../form-validations.service';
import { ImpsBcWebService } from './imps-bc-web.service';


declare var showToastMessage: any;

@Component({
  selector: 'app-imps-bc-web',
  templateUrl: './imps-bc-web.component.html',
  styleUrls: ['./imps-bc-web.component.css']
})
export class ImpsBcWebComponent implements OnInit {
  impsWebMaster:any=[]
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    private impsBCWebService: ImpsBcWebService
  ) { }

  
  ngOnInit(): void {
    this.commonServiceCall.pageName = "BC Web Server Details";
    this.impsWebMaster = [
      {
        name:'IMPS-BC',
        host:'192.168.0.1',
        ftphost:'10.128.0.1',
        ftpport:'22',
        ftpuser:'IMPS',
        remotedir:'user/folder/imps'
      },
      {
        name:'IMPS-BC',
        host:'192.168.0.1',
        ftphost:'10.128.0.1',
        ftpport:'22',
        ftpuser:'IMPS',
        remotedir:'user/folder/imps'
      },
      {
        name:'IMPS-BC',
        host:'192.168.0.1',
        ftphost:'10.128.0.1',
        ftpport:'22',
        ftpuser:'IMPS',
        remotedir:'user/folder/imps'
      },
      {
        name:'IMPS-BC',
        host:'192.168.0.1',
        ftphost:'10.128.0.1',
        ftpport:'22',
        ftpuser:'IMPS',
        remotedir:'user/folder/imps'
        },
    ]
    this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
  }

  addBCWeb()
  {
    this.router.navigateByUrl('/impsBCWebAdd')
  }

  gotoEdit()
  {
    this.router.navigateByUrl('/impsBCWebEdit')
  }
}
