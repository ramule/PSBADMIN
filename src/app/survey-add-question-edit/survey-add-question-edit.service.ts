import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SurveyAddQuestionEditService {

  constructor() { }

  getUpdateParam(id,formdata,userID,ansDtl){
    var inputdata ={
      "surveyQueId": ansDtl.surveyQueId,
      "surveyAnsId": ansDtl.id,
      "surveyQue": formdata.question,
      "surveyId": id,
      "surveyAns1":formdata.answer1,
      "surveyAns2": formdata.answer2,
      "surveyAns3":formdata.answer3,
      "surveyAns4": formdata.answer4,
      "createdby": userID,
      "createdon": ansDtl.createdon,
      "statusId": formdata.statusId
    }
    return inputdata
  }


  getSurveyDtls(item){
    var inputdata = {
      "surveyId": item.surveyId,
      "surveyQueId": item.id
    }
    return inputdata;
  }
}
