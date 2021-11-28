import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
declare var showToastMessage: any;
declare function openTinyModel(): any;
declare function closeTinyModel(): any;

@Component({
  selector: 'app-agent-pending-payment',
  templateUrl: './agent-pending-payment.component.html',
  styleUrls: ['./agent-pending-payment.component.css']
})
export class AgentPendingPaymentComponent implements OnInit {

  p: number = 1;
  pendingPayment:any =[];
  image:any;
  constructor(
    public commonServiceCall: HttpCommonServiceCallService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getPendingPayment();
  }

  getPendingPayment(){
    var url = 'transaction/getRemittanceBalance';
    this.commonServiceCall.getResponsePromise(url).subscribe(data => {
      if(data.status){
        console.log("on saved",data.resp);
        this.pendingPayment = data.resp;
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

  showIdImage(item){
    this.getImage(item.id);
  }

  getImage(id){
    var url = 'transaction/getNationalId/'+id;
    this.commonServiceCall.getResponsePromise(url).subscribe(data => {
      if(data.status){
        console.log("on saved",data.resp.result);
        this.image  = data.resp.result[0].nationalPic
        openTinyModel();
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

  closeActionModel(){
    closeTinyModel();
  }

  //https://infrabotsdev.infrasofttech.com/UploadOffer/transaction/getRemittanceBalance

  //https://infrabotsdev.infrasofttech.com/UploadOffer/transaction/getNationalId/1043
}
