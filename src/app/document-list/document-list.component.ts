import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { FormValidationsService } from '../form-validations.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { DocumentListService } from './document-List.service';
import { Location } from '@angular/common';
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  documentTypeArr: any =[];
  priviledgeDataArr: any =[];
  menuLink="documentList"
  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    public dynamicService:DocumentListService
  ) { }

  ngOnInit(): void {
    this.commonServiceCall.pageName = "Document List";
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.getDocumentListDetails();
  }
       /* Insert tracking for user activities*/
    addAuditTrailAdaptor(URL,operation)
    {
        var param = this.dynamicService.addAuditTrailAdaptorParams(URL,operation);
        console.log(param)
        this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
        })
    }


getDocumentListDetails()
  {
    this.commonMethod.showLoader();
    this.commonServiceCall.getResponsePromise(this.appConstants.getDocumentListUrl).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        this.commonMethod.hideLoader();
        console.log('response data: ', res);
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.documentTypeArr = res.result;
        console.log('Corporate Menu Master array: ', this.documentTypeArr);
          this.addAuditTrailAdaptor("Request:"+this.appConstants.apiURL.serviceURL_ESB+this.appConstants.getDocumentListUrl+"\n"+"Params={}",'view')
      } else {
        this.commonMethod.hideLoader();
       // this.errorCallBack(this.appConstants.getAllCorpMenus, res);
      }
      $('#dt-sample').DataTable().clear().destroy();
    });
  }

  gotoAddDocumentList(){
    this.router.navigateByUrl("/documentListAdd");
    this.commonDataShareService.submenuname = "documentListAdd";
  }

  gotoEditDocumentList(item) {
    console.log(item);
    this.commonDataShareService.dynamicReports.createdOn = item.createdon;
    this.commonDataShareService.submenuname = "documentListEdit";
    this.commonServiceCall.makerRequestEditUrl = this.router.url;
    this.router.navigateByUrl("/documentListEdit",{ state: { id: item.id} });
  }

  cancelClick() {
    this.router.navigateByUrl('/documentTypeAdd');
  }

}
