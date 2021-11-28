import { Component, OnInit } from "@angular/core";

import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from "@angular/forms";
import { FormValidationsService } from "../form-validations.service";
import { CommonDataShareService } from "../common-data-share.service";

import { HttpCommonServiceCallService } from "../http-common-service-call.service";
import { Router } from "@angular/router";
import { CommonMethods } from "../common-methods";
import { AppConstants } from "../app-constants";
import { Location } from "@angular/common";
import { MasterLanguageKeyService } from './master-language-key.service';
import { EncryptDecryptService } from "../encrypt-decrypt.service";
import { browserRefresh } from "../app.component";


declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-master-language-key',
  templateUrl: './master-language-key.component.html',
  styleUrls: ['./master-language-key.component.css']
})
export class MasterLanguageKeyComponent implements OnInit {
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
  originalLangArray :any=[];

  removedObjArry: any = [];

  masterKey:any
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonData: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private masterKeyLanguageService: MasterLanguageKeyService,
    private location: Location,
    private encryptDecryptService: EncryptDecryptService
  ) {}

  public buildForm() {
    this.configLanguageForm = this.form.group({
      englishText: new FormControl('', [Validators.required, Validators.maxLength(80),  Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9_ ]+$/)]),
      // languageCode: new FormControl('', [Validators.required]),
      // languageText: new FormControl('', [Validators.required, Validators.maxLength(80)]),
      // isActive: new FormControl('', [Validators.required]),
      credentials: this.form.array([
       // this.addLangFormGroup("","","")
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

    this.commonData.browserRefresh = false;
    this.commonData.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);

    if(this.commonData.browserRefresh) {
      this.buildForm();
      this.router.navigateByUrl('/masterLanguage');
      return;
    }

    this.commonServiceCall.pageName = "Language Key";
    this.masterKey = this.location.getState();
    this.roleId = this.commonData.roleId;
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.buildForm();
    this.getLanguage();
    console.log( this.masterKey.text)
    this.configLanguageForm.patchValue({
      englishText: this.masterKey.text,
    })

    this.getLanguageKey(this.masterKey.text)
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

  addLangFormGroup(code,text,id,createdon,createdby,createdByName,shcode) :FormGroup{
    return this.form.group({
      languageCode: [code,Validators.required],
      languageText: [text,Validators.required],
      id: [id,],
      createdon:[createdon,],
      createdby:[createdby,],
      createdByName:[createdByName,],
      code:[shcode,],
    })
  }

  trackByFn(index: any, item: any) {
    return index;
 }

   /* It brings dynamic languages for key*/
  getLanguageKey(key){
    this.removedObjArry = [];
    this.commonMethod.showLoader();
    var params = {
      "englishtext":key
    }
    var url = this.appConstants.getLanguageJsonByLangText;
    this.commonServiceCall.postResponsePromise(url,params).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        var langArray = [];

        res.result.forEach(element => {
          if(element.statusId == 3) {
            langArray.push(element);
          }
        });
        console.log('langArray: ', langArray);
        var finalLangArry = [];

        langArray.forEach(element => {
          // var decryptedLangText = this.encryptDecryptService.decryptText(element.languagetext, this.appConstants.languageKey);
          // console.log('decryptedLangText: ', decryptedLangText);

          var param = {
            "id": element.id,
            "englishtext": element.englishtext,
            "languagecode": element.languagecode,
            "languagetext": element.languagetext,
            "createdon": element.createdon,
            "createdby": element.createdby,
            "languagecodedesc": element.languagecodedesc,
            "statusId": element.statusId,
            "createdByName": element.createdByName,
            "statusName": element.statusName,
          };

          finalLangArry.push(param);
          this.removedObjArry.push(param);
        });
        finalLangArry.forEach(e => {
          (<FormArray>this.configLanguageForm.get('credentials')).push(this.addLangFormGroup(e.languagecode,e.languagetext,e.id,e.createdon,e.createdby,e.createdByName,e.languagecode));
        });
        console.log('removedObjArry: ', this.removedObjArry);

      } else {
        showToastMessage(res.responseMessage);
      }
      this.commonMethod.hideLoader();
    });


  }



     /* Insert tracking for user activities*/
    addAuditTrailAdaptor(URL,operation)
    {
        var param = this.masterKeyLanguageService.addAuditTrailAdaptorParams(URL,operation);
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
        var param = this.masterKeyLanguageService.addMasterLanguage(this.configLanguageForm.value,this.configLanguageForm.value.credentials[i], this.languageArray);
        newArray.push(param);
      }

      this.removedObjArry.forEach(element => {
        if(element.statusId == 0) {
          newArray.push(element);
        }
      });
      console.log('newArray: ', newArray);
      this.editLanguageJson(newArray);
    } else {
      this.formErrors = this.formValidation.validateForm(this.configLanguageForm, this.formErrors, false)
    }
  }

  editLanguageJson(param){

    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.updateLanguageJsonList, param).subscribe(data => {
      var res = data.resp;
      if(res.responseCode == "200"){
        showToastMessage(res.responseMessage);
        this.cancel();
         // this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.addLanguageJSONUrl+"\n"+"Params="+JSON.stringify(finalparam),'add')
      }
      else{
        if(this.commonData.roleType == this.commonData.makerRole) {
          this.configLanguageForm.patchValue({
            englishText : this.masterLocationFields.englishText,
          });
        }
        showToastMessage(res.responseMessage);
      }
      this.commonMethod.hideLoader();
    })
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
        var param = this.masterKeyLanguageService.addMasterLanguageWithRemark(this.masterLocationFields,formData,this.masterLocationFields.credentials[i], this.languageArray);
        newArray.push(param);
      }

      this.removedObjArry.forEach(element => {
        if(element.statusId == 0) {
          newArray.push(element);
        }
      });

      console.log('newArray: ', newArray);
     // var param = this.masterKeyLanguageService.addMasterLanguageWithRemark(this.masterLocationFields, formData);
      this.editLanguageJson(newArray);
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
   (<FormArray>this.configLanguageForm.get('credentials')).push(this.addLangFormGroup('','','','','','',''))
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

  get getCredentials(): FormArray {
    return this.configLanguageForm.get('credentials') as FormArray;
  }

  removeElement(indexElement, item)
  {
    console.log(item);
    this.getCredentials.removeAt(indexElement);

    this.removedObjArry.forEach(element => {
      if(item.value.languageCode == element.languagecode) {
        console.log('item: ', item);
        console.log('element: ', element);
        var encryptedLangText = this.encryptDecryptService.encryptText(this.appConstants.languageKey, item.value.languageText);
        console.log('encryptedLangText: ', encryptedLangText);

        var decryptedLangText = this.encryptDecryptService.decryptText(this.appConstants.languageKey, encryptedLangText);
        console.log('decryptedLangText: ', decryptedLangText);

        element.statusId = 0;
        element.languagetext = encryptedLangText;
      }
    });
    console.log('removedObjArry: ', this.removedObjArry);
  }
}
