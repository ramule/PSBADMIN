import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';


import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { Router } from '@angular/router';


declare var showToastMessage: any;
@Component({
  selector: 'app-admin-administration-edit-corp-user',
  templateUrl: './admin-administration-edit-corp-user.component.html',
  styleUrls: ['./admin-administration-edit-corp-user.component.css']
})
export class AdminAdministrationEditCorpUserComponent implements OnInit {

  addCorporateUserForm: FormGroup;
  formErrors = {
    userId: '',
    name: '',
    emailId: '',
    phoneNo: '',
    role: '',
    institute: '',
    status: '',
  }

  institutes: any = [];
  roles: any = [];
  status: any = [];
  selectedCorpUser: any;

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
  ) { }

  public buildForm() {
    this.addCorporateUserForm = this.form.group({
      userId: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      phoneNo: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]),
      emailId: new FormControl('', [Validators.email, Validators.minLength(6), Validators.maxLength(40), Validators.pattern(/^[a-z]+[a-z0-9._]+@[a-z0-9]+\.[a-z.]{2,6}$/)]),
      role: new FormControl('', [Validators.required]),
      institute: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
    this.addCorporateUserForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.addCorporateUserForm, this.formErrors, true)
    });
  }

  ngOnInit(): void {
    this.buildForm();
    this.getStatus();
    this.getRoles();
    this.getInstitute();
  }


  update() {
    this.formValidation.markFormGroupTouched(this.addCorporateUserForm);
    if (this.addCorporateUserForm.valid) {
      var formData = this.addCorporateUserForm.value;
      var userDetails = JSON.parse(this.commonServiceCall.userCredential);
      var param = {
        "id": this.commonData.adminEditData.corpUserId,
        "userid": formData.userId,
        "updateby": userDetails.userid,
        "roleid": formData.role,
        "name": formData.name,
        "email": formData.emailId,
        "phonenumber": formData.phoneNo,
        "status": formData.status,
        "custid": formData.institute
      }

      this.updateCorporateMaster(JSON.stringify(param));
    } else {
      this.formErrors = this.formValidation.validateForm(this.addCorporateUserForm, this.formErrors, false)
    }
  }

  cancel() {
    this.router.navigateByUrl("/adminstration");
  }

  //onloadFunction
  getStatus() {
    var req = 'message/getStatus';
    this.commonServiceCall.getResponsePromise(req).subscribe(data => {
      if (data.status) {
        this.status = data.resp;
      }
      else {

      }

    })
  }
  getRoles() {
    var req = 'roles/getAllRolesForUser/0/0';
    this.commonServiceCall.getResponsePromise(req).subscribe(data => {
      if (data.status) {
        this.roles = data.resp;
      }
      else {

      }

    })
  }
  getInstitute() {
    var req = 'corporateUser/getAllCustomers';
    this.commonServiceCall.getResponsePromise(req).subscribe(data => {
      if (data.status) {
        this.institutes = data.resp;
        this.getCorporateUser(this.commonData.adminEditData.corpUserId);
      }
      else {

      }

    })
  }
  getCorporateUser(userId) {
    var req = 'corporateUser/getAllCustomersByid/' + userId;
    this.commonServiceCall.getResponsePromise(req).subscribe(data => {
      if (data.status) {
        this.selectedCorpUser = data.resp[0];
        console.log(this.selectedCorpUser);
        this.addCorporateUserForm.patchValue({
          userId: data.resp[0].userid,
          name: data.resp[0].name,
          phoneNo: data.resp[0].phonenumber,
          emailId: data.resp[0].email,
          role: data.resp[0].roleid,
          institute: data.resp[0].custid,
          status: data.resp[0].status,
        })
      }
      else {

      }

    })
  }



  updateCorporateMaster(param) {
    var req = 'corporateUser/updateCorporateUsers';
    this.commonServiceCall.postResponsePromise(req, param).subscribe(data => {
      console.log(data);
      if (data.status) {
        showToastMessage("User Updated Successfully");
        this.router.navigateByUrl("/adminstration");
      }
      else {
        showToastMessage("Error");
      }

    })
  }

}
