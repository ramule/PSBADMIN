import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
declare var showToastMessage: any;

@Component({
  selector: 'app-agent-wise-balance',
  templateUrl: './agent-wise-balance.component.html',
  styleUrls: ['./agent-wise-balance.component.css']
})
export class AgentWiseBalanceComponent implements OnInit {

  p: number = 1;
  agentBalance:any =[];
  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getAgentWiseBalance();
  }

  getAgentWiseBalance(){
    var url = 'transaction/getAgentwiseBalance';
    this.commonServiceCall.postResponsePromise(url).subscribe(data => {
      if(data.status){
        console.log("on saved",data.resp);
        this.agentBalance = data.resp;
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


  //https://infrabotsdev.infrasofttech.com/UploadOffer/transaction/getAgentwiseBalance == post
}
