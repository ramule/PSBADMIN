import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
declare var showToastMessage: any;

@Component({
  selector: 'app-agent-money-reconcilation',
  templateUrl: './agent-money-reconcilation.component.html',
  styleUrls: ['./agent-money-reconcilation.component.css']
})
export class AgentMoneyReconcilationComponent implements OnInit {

  p: number = 1;
  moneyReconcilation:any =[];
  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonData: CommonDataShareService,
  ) { }

  ngOnInit(): void {
    this.getAgentWiseBalance()
  }


  getAgentWiseBalance(){
    var url = 'transaction/getAgentMoneyReconcilation';
    this.commonServiceCall.postResponsePromise(url).subscribe(data => {
      if(data.status){
        console.log("on saved",data.resp);
        this.moneyReconcilation = data.resp;
      }
      else{
        if (data.code == 401) {
          showToastMessage("Your Session Has Been Expired");
          this.router.navigateByUrl("/login");
        }
        else{
          showToastMessage("Master Update Error");
        }
      }

    })
  }


  gotoTransDetail(item){
    console.log(item);
    this.commonData.agentMoneyReconsile.accNo = item.fromaccountno
    this.router.navigateByUrl("/agentTransactionDtl",{ state: { accNo: item.fromaccountno } });
  }



  //https://infrabotsdev.infrasofttech.com/UploadOffer/transaction/getAgentMoneyReconcilation ==post

}
