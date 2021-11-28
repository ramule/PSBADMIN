import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { CommonDataShareService } from '../common-data-share.service';
import { Location } from '@angular/common';
declare var showToastMessage: any;

@Component({
  selector: 'app-agent-transactions-details',
  templateUrl: './agent-transactions-details.component.html',
  styleUrls: ['./agent-transactions-details.component.css']
})
export class AgentTransactionsDetailsComponent implements OnInit {

  p: number = 1;
  transactionDtl:any =[];
  agentMoneyReconsile:any;
  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
    public commonData: CommonDataShareService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.agentMoneyReconsile = this.location.getState(); 
    this.getAgentWiseBalance(this.agentMoneyReconsile.accNo);
  }

  getAgentWiseBalance(acctNo){
    var url = 'transaction/getReconcilationDetail/'+acctNo;
    this.commonServiceCall.postResponsePromise(url).subscribe(data => {
      if(data.status){
        console.log("on saved",data.resp);
        this.transactionDtl = data.resp;
      }
      else{
        if (data.code == 401) {
          showToastMessage("Your Session Has Been Expired");
          this.router.navigateByUrl("/login");
        }
        else{
          showToastMessage("Master Load Error");
        }
      }

    })
  }


  //https://infrabotsdev.infrasofttech.com/UploadOffer/transaction/getReconcilationDetail/938900500010
}
