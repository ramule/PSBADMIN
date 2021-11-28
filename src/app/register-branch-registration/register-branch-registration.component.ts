import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonMethods } from '../common-methods';
declare var showToastMessage: any;

@Component({
  selector: 'app-register-branch-registration',
  templateUrl: './register-branch-registration.component.html',
  styleUrls: ['./register-branch-registration.component.css']
})
export class RegisterBranchRegistrationComponent implements OnInit {

  p: number = 1;
  branchRegMaster: any = []

  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonMethod : CommonMethods
  ) { }

  ngOnInit() {
    this.getBranchReg()
  }

  cancel(){
    this.commonMethod.cancel();
  }


  getBranchReg(){
    // var req = 'wallet/getBranchRegistrations/4/superadmin';
    var userDetails = JSON.parse(this.commonServiceCall.userCredential);
    var req = 'wallet/getBranchRegistrations/'+userDetails.role_ID+'/'+userDetails.name;
    this.commonServiceCall.getResponsePromise(req).subscribe(data => {
      console.log(data);
      if (data.status) {
        console.log(data.resp);
        this.branchRegMaster = data.resp;
      }
      else {
        showToastMessage("Master Load Error");
      }

    })
  }

  editBranchReg(item){
    console.log(item);
    this.router.navigateByUrl("/regBranchRegEdit",{ state: { id: item.ID } });
  }

  //https://infrabotsdev.infrasofttech.com/UploadOffer/wallet/getBranchRegistrations/4/superadmin

}
