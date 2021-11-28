import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
declare var showToastMessage: any;

@Component({
  selector: 'app-agent-create-account',
  templateUrl: './agent-create-account.component.html',
  styleUrls: ['./agent-create-account.component.css']
})
export class AgentCreateAccountComponent implements OnInit {

  agentCreateAccountForm: FormGroup;
  formErrors = {
    firstName: '',
    lastName: '',
    mobNo: '',
    emailId: '',
    gender: '',
    currency: ''
  }

  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
  ) { }


  public buildForm() {
    this.agentCreateAccountForm = this.form.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      mobNo: new FormControl('', [Validators.required]),
      emailId: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      currency: new FormControl('', [Validators.required]),
    });
    this.agentCreateAccountForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formValidation.validateForm(this.agentCreateAccountForm, this.formErrors, true)
    });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  createAccount() {
    this.formValidation.markFormGroupTouched(this.agentCreateAccountForm);
    if (this.agentCreateAccountForm.valid) {
      var formData = this.agentCreateAccountForm.value;

      var param = {
        "firstName": formData.firstName,
        "lastName": formData.lastName,
        "mobileNo": formData.mobNo,
        "prefered_Language": "en",
        "email_id": formData.emailId,
        "currency": formData.currency,
        "gender": formData.gender,
        "dateOfBirth": "2015-01-28"
      }
      this.onAccountCreate(JSON.stringify(param));

    } else {
      this.formErrors = this.formValidation.validateForm(this.agentCreateAccountForm, this.formErrors, false)
    }
  }


  onAccountCreate(param) {
    var url = 'transaction/createAgentAccount';
    this.commonServiceCall.postResponsePromise(url, param).subscribe(data => {
      if (data.status) {
        console.log("on saved", data.resp);
        showToastMessage(data.resp.responseValue);
        this.agentCreateAccountForm.reset();
      }
      else {
        if (data.code == 401) {
          showToastMessage("Your Session Has Been Expired");
          this.router.navigateByUrl("/login");
        }
        else {
          showToastMessage("Create Account Error");
        }
      }

    })
  }

}
