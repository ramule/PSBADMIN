import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service'
import { CommonMethods } from '../common-methods';

declare var showToastMessage: any;

@Component({
  selector: 'app-admin-charges-commission',
  templateUrl: './admin-charges-commission.component.html',
  styleUrls: ['./admin-charges-commission.component.css']
})
export class AdminChargesCommissionComponent implements OnInit {


  chargeMaster:any =[];
  showTable:boolean = false;
  statusError:boolean = false;


  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData : CommonDataShareService,
    public commonMethod :CommonMethods
  ) { }

  ngOnInit(){
  }



  cancel(){
    this.commonMethod.cancel();
  }
  
  selectedType(roleId){
    if(roleId == ''){
      this.showTable = false;
      return;
    }

    this.showTable = true;
    var url = 'corporateUser/getAllChargesMaster/'+roleId
    this.commonServiceCall.getResponsePromise(url).subscribe(data => {
      if(data.status){
        this.chargeMaster = data.resp;
      }
      else{

      }

    })
  }

  gotoChargeDtl(item){
    console.log(item);
    this.router.navigateByUrl("/adminChargesComminsionEdit",{ state: { id: item.id } });
  }


  addCharges(){
    this.router.navigateByUrl("/adminChargesComminsionAdd");
  }

}
