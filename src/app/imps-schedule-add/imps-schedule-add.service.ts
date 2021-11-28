import { Injectable } from '@angular/core';
import { CommonDataShareService } from '../common-data-share.service';
import { CommonMethods } from '../common-methods';
@Injectable({
  providedIn: 'root'
})
export class ImpsScheduleAddService {

  constructor(
    public commonDataService: CommonDataShareService,
    public commonMethod: CommonMethods
  ) { }

  addScheduleCall(formData) {

    if(formData.type == 'email') {
      var inputDataEmail = {
        "schedule_desc":formData.desc,
        "task_interval":formData.taskInterval,
        "interval_unit":formData.unit,
        "last_date":"1607430289000",
        "next_exec_datetime":formData.date,
        "execution_count":"4",
        "active":formData.status,
        "delivery_type":formData.type,
        "email_from": formData.emailFrom,
        "email_password":formData.emailPassword,
        "email_to":formData.emailTo,
        "email_cc":formData.emailcc,
        "email_content":formData.emailContent,
        "ftp_host": "",
        "ftp_port": "",
        "ftp_user": "",
        "ftp_password": "",
        "remote_dir": ""
      }
      return inputDataEmail;
    }
    else if(formData.type == 'ftp' || formData.type == 'sftp') {
      var inputDataFTP = {
        "schedule_desc":formData.desc,
        "task_interval":formData.taskInterval,
        "interval_unit":formData.unit,
        "last_date":"1607430289000",
        "next_exec_datetime":formData.date,
        "execution_count":"4",
        "active":formData.status,
        "delivery_type":formData.type,
        "email_from": "",
        "email_password": "",
        "email_to": "",
        "email_cc": "",
        "email_content": "",
        "ftp_host":formData.ftpHost,
        "ftp_port": formData.ftpPort,
        "ftp_user":formData.ftpUser,
        "ftp_password":formData.ftpPassword,
        "remote_dir":formData.ftpRemoteDir
      }
      return inputDataFTP;
    }

  }


  addAuditTrailAdaptorParams(URL,operation) {
        var inputData = {
            "ChannelName": "DESKTOP",
            "channelRequest": URL,
            "eventName":'Schedule',
            "category":"IMPS",
            "action":operation,
            "properties":URL,
            "IP":this.commonDataService.user_IP,
            "X-FORWARDEDIP":this.commonDataService.user_IP,
            "Lat":this.commonDataService.user_lat,
            "Lon":this.commonDataService.user_lon,
            "Browser":this.commonMethod.getBrowserName(),
            "Device":"",
            "OS":this.commonMethod.getOSName(),
            "CHANNELID":"4",
            "CREATEDBY":this.commonDataService.user_ID,
            "CREATEDBYNAME":this.commonDataService.user_Name,
             "UPDATEDBY":this.commonDataService.user_ID,
            "UPDATEDBYNAME":this.commonDataService.user_Name,
            "authorization":"0"

        }
        return inputData;
      }
}
