import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
import { CalculatorFormulaService } from './calculator-formula.service';
declare var showToastMessage: any;
declare var $: any;
@Component({
  selector: 'app-calculator-formula',
  templateUrl: './calculator-formula.component.html',
  styleUrls: ['./calculator-formula.component.css']
})
export class CalculatorFormulaComponent implements OnInit {

  calculatorFormula: any = [];
  priviledgeDataArr: any = [];
  id = "71"
  menuLink = "calculatorFormula"

  constructor(
    public router: Router,
    public commonServiceCall: HttpCommonServiceCallService,
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonDataShareService: CommonDataShareService,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    private location: Location,
    public calculatorFormulaService: CalculatorFormulaService

  ) { }

  ngOnInit(): void {
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.commonServiceCall.pageName = "Calculator Formula";
    this.getLeftMenuId()
  }

  /* Insert tracking for user activities*/
  addAuditTrailAdaptor(URL, operation) {
    var param = this.calculatorFormulaService.addAuditTrailAdaptorParams(URL, operation);
    console.log(param)
    this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
    })
  }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstants.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        this.commonDataShareService.submenuId = res.result[0].id;
        id = res.result[0].id;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

  getPriviledgeData(id) {
    var url = this.appConstants.getPriviledgeDataUrl + id + "/" + this.commonDataShareService.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if (this.priviledgeDataArr.viewChecked) {
          this.getCalculatorFormula();
        }
        else {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

  getCalculatorFormula() {
    this.commonMethod.showLoader();
    this.commonMethod.destroyDataTable();
    this.commonServiceCall.getResponsePromise(this.appConstants.getCalculatorFormula).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log(res);
        this.calculatorFormula = res.result;
        if (this.calculatorFormula.length < 1) {
          showToastMessage("No Record Available");
        }
        //initiallize datatable
        this.commonMethod.setDataTable1(this.commonServiceCall.pageName);
        this.addAuditTrailAdaptor("Request:" + this.appConstants.apiURL.serviceURL_ESB + this.appConstants.getCalculatorFormula + "\n" + "Params={}", 'view')
      } else if (res.responseCode == "202") {
        setTimeout(function () {
          $('table.display').DataTable({
            "language": {
              "emptyTable": "No Data found"
            }
          })
        });
      } else {
        this.errorCallBack(this.appConstants.getCalculatorFormula, res);
      }
      this.commonMethod.hideLoader();
      this.commonMethod.destroyDataTable();
    });
  }


  errorCallBack(fld, res) {
    this.commonMethod.errorMessage(res);
  }

  editCalculatorFormula(item) {
    console.log(item);
    if (item.statusName === 'ADMIN APPROVER PENDING' && this.commonDataShareService.roleType == this.commonDataShareService.makerRole) {
      showToastMessage('You Cannot Perform This Action');
    }
    else {
      this.commonDataShareService.submenuname = "calculatorFormulaEdit";
      this.commonServiceCall.makerRequestEditUrl = this.router.url;
      this.router.navigateByUrl("/calculatorFormulaEdit", { state: { id: item.id } });
    }
  }


  gotoAddCalulator() {
    this.commonDataShareService.submenuname = "calculatorFormulaAdd";
    this.router.navigateByUrl("/calculatorFormulaAdd");
  }
  cancelClick() {
    this.commonMethod.cancel();
  }
}
