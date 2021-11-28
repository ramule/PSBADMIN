import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormValidationsService } from '../form-validations.service';
import { CommonDataShareService } from '../common-data-share.service';
import { HttpCommonServiceCallService } from '../http-common-service-call.service';
import { Router } from '@angular/router';
import { CommonMethods } from '../common-methods';
import { AppConstants } from '../app-constants';
import { Location } from '@angular/common';
import { MasterSortModuleService } from './master-sort-module.service';
declare function openTinyModel(): any;
declare function closeTinyModel(): any;
declare var showToastMessage: any;
declare var $: any;

@Component({
  selector: 'app-master-sort-module',
  templateUrl: './master-sort-module.component.html',
  styleUrls: ['./master-sort-module.component.css']
})
export class MasterSortModuleComponent implements OnInit {
  id= 1400;
  menuLink = "securityQuestion";
  priviledgeDataArr:any =[]
  menuMaster: any=[];
  constructor(
    private form: FormBuilder,
    private formValidation: FormValidationsService,
    public commonServiceCall: HttpCommonServiceCallService,
    public commonData: CommonDataShareService,
    public router: Router,
    public commonMethod: CommonMethods,
    private appConstants: AppConstants,
    public location:Location,
    private serviceSort: MasterSortModuleService
  ) { }



  ngOnInit() {
    var self=this
    this.commonServiceCall.pageName = "Master Sort Module";
  //  this.getLeftMenuId();
    this.menuMaster = JSON.parse(localStorage.getItem("menuArray"))
    for(var i=0;i<this.menuMaster.length;i++)
    {
      this.menuMaster[i].roleId = this.commonData.roleTypeId
    }
    setTimeout(function(){
      $("#accordion").accordion({
        header: "> div > h3",
        event: "click",
        active: false,
        collapsible: true
      }).sortable({
        items: "> div",
        handle: "h3",
        revert: false,
        stop: function(e, ui) {
          var sectionList = $(this).sortable("toArray", { attribute: "data-section-id" });
          var sectionId = ui.item.context.dataset.sectionId;
          var index = ui.item.index();
          ui.item.children("h3").triggerHandler("focusout");
          $(this).accordion("refresh");
          self.updateDataMenu({sectionId, index, sectionList});
        }
      });

      $(".sortable").sortable({
        items: "> li",
        handle: ".draggable",
        revert: true,
        revertDuration: 50,
        placeholder: "ui-sortable-placeholder",
        sort: function(event, ui){ ui.item.addClass("selected"); },
        stop: function(event, ui){ ui.item.removeClass("selected"); },
        update: function(e, ui) {
          var questionList = $(this).sortable("toArray", { attribute: "data-item-id" });
          var sectionId = e.target.dataset.listId;
          var questionId = ui.item.context.dataset.itemId;
          var index = ui.item.index();
          self.updateDataSubmenu({sectionId, questionId, questionList});
        }
      });





    }, 0);


  }

   updateDataMenu(obj) {
    var data = JSON.stringify(obj, null, 2);
    var finalarray = JSON.parse(data)

    for(var i = 0;i<finalarray.sectionList.length;i++)
    {
      var fromIndex = this.menuMaster.findIndex((obj) => obj.menuId == finalarray.sectionList[i]);
      var toIndex = i

      this.moveItem(fromIndex,i)
    }
  }

  updateDataSubmenu(obj) {
    var data = JSON.stringify(obj, null, 2);
    var finalarray = JSON.parse(data)

    for(var i = 0;i<finalarray.questionList.length;i++)
    {
      var objIndex = this.menuMaster.findIndex((obj) => obj.menuId == finalarray.sectionId)
      var newarray = this.menuMaster[objIndex].subMenuList
      var fromIndex = newarray.findIndex((obj) => obj.id == finalarray.questionList[i]);
      var toIndex = i

      this.moveSubItem(fromIndex,i,objIndex)
    }
  }

   moveItem(from, to) {
    var self = this
    // remove `from` item and store it
    var f = this.menuMaster.splice(from, 1)[0];
    // insert stored item into position `to`
    self.menuMaster.splice(to, 0, f);
    console.log(this.menuMaster)
  }

  moveSubItem(from, to,atpos) {
    var self = this
    // remove `from` item and store it
    var f = this.menuMaster[atpos].subMenuList.splice(from, 1)[0];
    // insert stored item into position `to`
    self.menuMaster[atpos].subMenuList.splice(to, 0, f);
    console.log(this.menuMaster)
  }

  /* It brings id of selected submenu and pass it to  getPriviledgeData(id) function*/
  getLeftMenuId() {
    var id = "";
    var url = this.appConstants.getLeftMenuByMenuLinkUrl + this.menuLink;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == "200") {
        console.log('response data: ', res);
        id = res.result[0].id;
        this.commonData.submenuId = res.result[0].id;
        this.commonData.submenuname = res.result[0].menuLink;
        this.getPriviledgeData(id);
        console.log('Left Menu Id: ', id);
      } else {
        showToastMessage('Cannot get Id');
      }
    });
  }

  getPriviledgeData(id) {
    var url = this.appConstants.getPriviledgeDataUrl + id+"/"+this.commonData.roleTypeId;
    this.commonServiceCall.getResponsePromise(url).subscribe((data) => {
      var res = data.resp;
      if (res.responseCode == 200) {
        console.log('response data: ', res);
        this.priviledgeDataArr = res.result;
        console.log('response array: ', this.priviledgeDataArr);
        if(this.priviledgeDataArr.viewChecked) {
          this.getAllMenus();
        }
        else {
          showToastMessage('You Dont Have Priviledge To View The Data');
        }
      } else {
        showToastMessage('You Dont Have Priviledge To View The Data');
      }
    });
  }

     /* Insert tracking for user activities*/
    addAuditTrailAdaptor(URL,operation)
    {
       // var param = this.masterSecurityQuestionService.addAuditTrailAdaptorParams(URL,operation);
       // console.log(param)
      //  this.commonServiceCall.postResponseAuditTracking(this.appConstants.insertAudit, param).subscribe(data => {
       // })
    }


  getAllMenus() {
    console.log(localStorage.getItem("menuArray"))



  }

  onMenuSubmit()
  {
    var param = this.menuMaster
    this.saveMenuSequence(param);
  }

  saveMenuSequence(param)
  {
    this.commonMethod.showLoader();
    this.commonServiceCall.postResponsePromise(this.appConstants.saveMenuSubMenuSequence, param).subscribe(data => {
      var res = data.resp;
      if(res.responseCode == "200"){
        this.cancel();
        showToastMessage(res.responseMessage);
      }
      else{
        showToastMessage(res.responseMessage);
      }
      this.commonMethod.hideLoader();
    });
  }

  cancel()
  {
    this.commonMethod.cancel();
  }


}
