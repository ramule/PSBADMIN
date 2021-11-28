import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { FormValidationsService } from '../form-validations.service';
import { ImpsBusinessCorrService } from './imps-business-corr.service';


declare var showToastMessage: any;

@Component({
  selector: 'app-imps-business-corr',
  templateUrl: './imps-business-corr.component.html',
  styleUrls: ['./imps-business-corr.component.css']
})
export class ImpsBusinessCorrComponent implements OnInit {

  impsbcCorrMaster:any=[]
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    private impsBCCorrService: ImpsBusinessCorrService
  ) { }

  
  ngOnInit(): void {
    this.commonServiceCall.pageName = "Business Correspondents";
    this.impsbcCorrMaster = [
      {
        name:'Vikrant',
        address:'XYZ',
        bcid:'bc12',
        mobile:'123456789',
        mmid:'234',
        add1:'abc',
        add2:'xyz',
        state:'Maharashtra',
        city:'Mumbai',
        zip:'400056',
        country:'India',
        contact:'9876543210',
        email:'abc@gmail.com',       
      },
      {
        name:'Vikrant',
        address:'XYZ',
        bcid:'bc12',
        mobile:'123456789',
        mmid:'234',
        add1:'abc',
        add2:'xyz',
        state:'Maharashtra',
        city:'Mumbai',
        zip:'400056',
        country:'India',
        contact:'9876543210',
        email:'abc@gmail.com',   
      },
      {
        name:'Vikrant',
        address:'XYZ',
        bcid:'bc12',
        mobile:'123456789',
        mmid:'234',
        add1:'abc',
        add2:'xyz',
        state:'Maharashtra',
        city:'Mumbai',
        zip:'400056',
        country:'India',
        contact:'9876543210',
        email:'abc@gmail.com',   
      },
      {
        name:'Vikrant',
        address:'XYZ',
        bcid:'bc12',
        mobile:'123456789',
        mmid:'234',
        add1:'abc',
        add2:'xyz',
        state:'Maharashtra',
        city:'Mumbai',
        zip:'400056',
        country:'India',
        contact:'9876543210',
        email:'abc@gmail.com',   
        },
    ]
    this.commonMethod.setDataTable(this.commonServiceCall.pageName);
  }

  addBCCorr()
  {
    this.router.navigateByUrl('/impsBCCorrAdd')
  }

  gotoEdit()
  {
    this.router.navigateByUrl('/impsBCCorrEdit')
  }

}
