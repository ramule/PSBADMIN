import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SurveyAnnouncementQuestionService {

  constructor() { }


  getUpdateParam(surveyId,formData,userId){
    var inputData = {
      "surveyQue": formData.question,
      "surveyId": surveyId,
      "surveyAns1": formData.answer1,
      "surveyAns2": formData.answer2,
      "surveyAns3": formData.answer3,
      "surveyAns4": formData.answer4,
      "createdby": userId,
      "statusId": formData.statusId
    }
    return inputData
  }
}
