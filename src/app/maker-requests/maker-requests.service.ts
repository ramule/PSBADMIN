import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MakerRequestsService {

  constructor() { }

  closeRequestCall(item, formData) {
    var inputData = {
      "id": item.id,
      "remark": formData.remark,
      "statusId": 0,
      "activityRefNo": item.activityRefNo
    }
    return inputData;
  }
}
