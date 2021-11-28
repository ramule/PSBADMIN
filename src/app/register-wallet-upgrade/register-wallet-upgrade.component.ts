import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonMethods } from '../common-methods';
declare var showToastMessage: any;

@Component({
  selector: 'app-register-wallet-upgrade',
  templateUrl: './register-wallet-upgrade.component.html',
  styleUrls: ['./register-wallet-upgrade.component.css']
})
export class RegisterWalletUpgradeComponent implements OnInit {

  p: number = 1;
  walletUpgradeReq: any = []

  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonMethod : CommonMethods
  ) { }

  ngOnInit() { 
    this.getTicketUpgrade()
  }

  cancel(){
    this.commonMethod.cancel();
  }


  getTicketUpgrade(){
    //var req = 'wallet/getTicketUpgrades/4/superadmin';
    var userDetails = JSON.parse(this.commonServiceCall.userCredential);
    var req = 'wallet/getTicketUpgrades/'+userDetails.role_ID+'/'+userDetails.name;
    this.commonServiceCall.getResponsePromise(req).subscribe(data => {
      console.log(data);
      if (data.status) {
        console.log(data.resp);
        this.walletUpgradeReq = data.resp;
      }
      else {
        showToastMessage("Master Load Error");
      }

    })
  }

  editTicketDtl(item){
    console.log(item);
    this.router.navigateByUrl("/regWalletUpgradeEdit",{ state: { id: item.id } });
  }


  //https://infrabotsdev.infrasofttech.com/UploadOffer/wallet/getTicketUpgrades/4/superadmin

}
