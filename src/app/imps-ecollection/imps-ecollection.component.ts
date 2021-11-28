import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { FormValidationsService } from '../form-validations.service';
import { ImpsEcollectionService } from './imps-ecollection.service';



declare var showToastMessage: any;

@Component({
  selector: 'app-imps-ecollection',
  templateUrl: './imps-ecollection.component.html',
  styleUrls: ['./imps-ecollection.component.css']
})
export class ImpsEcollectionComponent implements OnInit {
  impsEcollectionMaster:any=[]
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    private impsEcollectionService: ImpsEcollectionService
  ) { }

  
  ngOnInit(): void {
    this.commonServiceCall.pageName = "ECollection Configuration";
    this.impsEcollectionMaster = [
      {
         providerid:'CC',
         name:'Credit Card Paytm',
         nbin:'9926',
         ifsc:'ICIC00009226',
         date:'2020-01-02 15:09:01 PM',

      },
      {
        providerid:'CC',
         name:'Credit Card Paytm',
         nbin:'9926',
         ifsc:'ICIC00009226',
         date:'2020-01-02 15:09:01 PM',
      },
      {
        providerid:'CC',
         name:'Credit Card Paytm',
         nbin:'9926',
         ifsc:'ICIC00009226',
         date:'2020-01-02 15:09:01 PM',
      },
      {
        providerid:'CC',
         name:'Credit Card Paytm',
         nbin:'9926',
         ifsc:'ICIC00009226',
         date:'2020-01-02 15:09:01 PM',
        },
    ]
    this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
  }

  addReports()
  {
    this.router.navigateByUrl('/impsEcollectionAdd')
  }



}
