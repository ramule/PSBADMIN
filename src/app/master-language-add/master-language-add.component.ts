import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';

import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { MasterLanguageAddService } from './master-language-add.service';
import { Location } from '@angular/common';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-master-language-add',
  templateUrl: './master-language-add.component.html',
  styleUrls: ['./master-language-add.component.css']
})
export class MasterLanguageAddComponent implements OnInit {
  id= 14;
  menuLink = "masterLanguage";
  showForm:boolean = false;
  isAddButtonClicked = false;
  configLanguageForm: FormGroup;
  remarkForm:FormGroup
  languageArray:any=[]
  formErrors = {
    englishText:'',
    // languageCode: '',
    // languageText:'',
    // isActive:'',
    remark:''
  }

  masterLocationFields={
    englishText: '',
    // languageCode: '',
    // languageText: '',
    // isActive: '',
    credentials:''
  }

  roleId: any;
  selModel: any;

  //feild parameter
  menuLanguage:any =[];
  priviledgeDataArr: any = [];
  newMenuLanguage:any =[];
  productTypes = [];
  p: number = 1;
  selectedLanguage:any=""
  originalLangArray :any=[]
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonData : CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private masterLanguageService: MasterLanguageAddService,
    private location: Location
  ) { }


  public buildForm() {
    this.configLanguageForm = this.form.group({
      englishText: new FormControl('', [Validators.required, Validators.maxLength(80),  Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9_ ]+$/)]),
      // languageCode: new FormControl('', [Validators.required]),
      // languageText: new FormControl('', [Validators.required, Validators.maxLength(80)]),
      // isActive: new FormControl('', [Validators.required]),
      credentials: this.form.array([
        this.addLangFormGroup()
      ]),
    });
    this.configLanguageForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.configLanguageForm, this.formErrors, true)
    });

    if(this.selModel == 'remarkField') {
      this.remarkForm = this.form.group({
        remark: new FormControl('', [Validators.required])
      });
      this.remarkForm.valueChanges.subscribe((data) => {
        this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, true)
      });
    }
  }

  ngOnInit() {
    this.commonServiceCall.pageName = "Language Add";
    this.roleId = this.commonData.roleId;
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.buildForm();
    this.getAppMasterList();
    this.configLanguageForm.patchValue({
      isActive: 3
    });
    this.getLanguage()
  //  this.languageArray = [
  //    {
  //     languagecode:'en',
  //     languagecodedesc:'English',
  //     active:false
  //    },
  //    {
  //     languagecode:'hn',
  //     languagecodedesc:'Hindi',
  //     active:false
  //    },
  //    {
  //     languagecode:'mr',
  //     languagecodedesc:'Marathi',
  //     active:false
  //    },
  //    {
  //     languagecode:'lo',
  //     languagecodedesc:'Laosian',
  //     active:false
  //    }
  //  ]
  }

   //on load functions
   getAppMasterList(){
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.masterListUrl).subscribe((data) => {
      var res = data;
      console.log('response data: ', res);
      if (res.status) {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.productTypes = res.resp;
        console.log('response array: ', this.productTypes);
      } else {
        this.commonMethod.hideLoader();
        this.errorCallBack(this.appConstants.masterListUrl, res);
      }
    });
  }

  filterProduct()
  {
    return this.productTypes.filter(x => x.shortName == "WALLET" ||  x.shortName == "MOBILE"  || x.shortName == "DESKTOP"  || x.shortName == "TAB"  || x.shortName == "IVR"  || x.shortName == "ALEXA"  || x.shortName == "WHATSAPP");
  }

  addLangFormGroup() :FormGroup{
    return this.form.group({
      languageCode: ['',Validators.required],
      languageText: ['',Validators.required],
      // channelName: ['',Validators.required],
    })
  }

  trackByFn(index: any, item: any) {
    return index;
 }

   /* It brings dynamic languages*/
  getLanguage()
  {
    var url = this.appConstants.getDistinctLanguageJsonCode;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        this.languageArray = res.result

      } else {
        showToastMessage(res.responseMessage);
      }
    });
  }



     /* Insert tracking for user activities*/
    addAuditTrailAdaptor(URL,operation)
    {
        var param = this.masterLanguageService.addAuditTrailAdaptorParams(URL,operation);
        console.log(param)
        this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
        })
    }

  addMaster(){
    var newArray =[]
    this.formValidation.markFormGroupTouched(this.configLanguageForm);
    if (this.configLanguageForm.valid) {
      var formData = this.configLanguageForm.value;
      for(var i =0;i<this.configLanguageForm.value.credentials.length;i++)
      {
        var param = this.masterLanguageService.addMasterLanguage(this.configLanguageForm.value,this.configLanguageForm.value.credentials[i]);
        newArray.push(param)
      }

      this.addLanguageJson(newArray);
    } else {
      this.formErrors = this.formValidation.validateForm(this.configLanguageForm, this.formErrors, false)
    }
  }

  addLanguageJson(param){
    this.commonMethod.showLoader();
    for(var i = 0;i<param.length;i++)
    {
      var finalparam = param[i]
      this.commonServiceCall.postResponsePromise(this.appConstants.addLanguageJSONUrl, finalparam).subscribe(data => {
        var res = data.resp;
        if(res.responseCode == "200"){
          showToastMessage(res.responseMessage);
          this.cancel();
            this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.addLanguageJSONUrl+"\n"+"Params="+JSON.stringify(finalparam),'add')
        }
        else{
          if(this.commonData.roleType == this.commonData.makerRole) {
            this.configLanguageForm.patchValue({
              englishText : this.masterLocationFields.englishText,
            });
          }
          showToastMessage(res.responseMessage);
        }
      })
    }
    setTimeout(() => {
    this.commonMethod.hideLoader();
    }, 5000);
  }


  cancel(){
  this.router.navigateByUrl('masterLanguage')
  }

  errorCallBack(fld, res) {
    if (fld == this.appConstants.getLanguageJSONUrl) {
      this.commonMethod.errorMessage(res);
    }
    else if (fld == this.appConstants.addLanguageJSONUrl) {
      this.commonMethod.errorMessage(res);
    }
    else if (fld == this.appConstants.masterListUrl) {
      this.commonMethod.errorMessage(res);
    }
  }



  openActionModel(action, formdata) {
    console.log(formdata);
    if (this.configLanguageForm.valid) {
      openTinyModel();
      this.selModel = action;
      this.buildForm();
      this.masterLocationFields.englishText = formdata.englishText;
      this.masterLocationFields.credentials = formdata.credentials

      // this.masterLocationFields.languageCode = formdata.languageCode;
      // this.masterLocationFields.languageText = formdata.languageText;
      // this.masterLocationFields.isActive = formdata.isActive;
    }
    else {
      this.formErrors = this.formValidation.validateForm(this.configLanguageForm, this.formErrors, false)
    }
  }

  addMasterLocationWithRemark(formdata){
    var newArray =[]
    this.formValidation.markFormGroupTouched(this.remarkForm);
    if (this.remarkForm.valid) {
      closeTinyModel();
      var formData = this.remarkForm.value;
      for(var i =0;i<this.masterLocationFields.credentials.length;i++)
      {
        var param = this.masterLanguageService.addMasterLanguageWithRemark(this.masterLocationFields,formData,this.masterLocationFields.credentials[i]);
        newArray.push(param)
      }

     // var param = this.masterLanguageService.addMasterLanguageWithRemark(this.masterLocationFields, formData);
      this.addLanguageJson(newArray);
    } else {
      this.formErrors = this.formValidation.validateForm(this.remarkForm, this.formErrors, false);
    }
  }

  closeActionMoel() {
    console.log(this.masterLocationFields.credentials);
    this.configLanguageForm.patchValue({
      englishText : this.masterLocationFields.englishText,
      // languageCode : this.masterLocationFields.languageCode,
      // languageText : this.masterLocationFields.languageText,
      // isActive : this.masterLocationFields.isActive,
     // credentials: this.masterLocationFields.credentials
    });

    this.configLanguageForm.setControl('credentials',this.setExistingLang(this.masterLocationFields.credentials))

    closeTinyModel();
  }

  setExistingLang(langSet:any):FormArray{
    const formArray = new FormArray([]);
    langSet.forEach(element => {
      formArray.push(this.form.group({
        languageCode:element.languageCode,
        languageText:element.languageText
      }))
    });
    return formArray
}

  addCreds() {
    // const creds = this.configLanguageForm.controls.credentials as FormArray;
    // creds.push(this.form.group({
    //   languageCode: '',
    //   languageText: '',
    // }));

    (<FormArray>this.configLanguageForm.get('credentials')).push(this.addLangFormGroup())
  };

  selectLang(event,indexValue)
  {
    // var data = event.target.value.split('-')[0]
    // if(data)
    // this.selectedLanguage = data
    // var obj = this.languageArray.findIndex(x=>x.languagecode == this.selectedLanguage)
    // this.languageArray[obj].active = true

    this.originalLangArray = []
    this.originalLangArray = <FormArray>this.configLanguageForm.get('credentials').value
    var data = event.target.value

    let counter = 0;
    for (let i = 0; i < this.originalLangArray.length; i++)
    {
        if (this.originalLangArray[i].languageCode === data)
        counter++;
    }
    if(counter>1)
    {
      showToastMessage("Please Select Different Language");
      (<FormArray>this.configLanguageForm.get('credentials')).at(indexValue).patchValue({
        languageCode : ''
      })
      console.log(<FormArray>this.configLanguageForm.get('credentials').value)
    }

  }

  removeElement(indexElement)
  {
    console.log('indexElement: ', indexElement);
    console.log((<FormArray>this.configLanguageForm.get('credentials')).removeAt(indexElement));
    // console.log(this.configLanguageForm.get('credentials').value);
    // (<FormArray>this.configLanguageForm.get('credentials')).removeAt(indexElement)
  }

}
