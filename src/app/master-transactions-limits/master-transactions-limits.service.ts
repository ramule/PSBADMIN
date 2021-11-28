import { Injectable } from '@angular/core';
import { CommonDataShareService } from 'src/app/common-data-share.service';

@Injectable({
  providedIn: 'root'
})
export class MasterTransactionsLimitsService {

  constructor(
    private commonDataService: CommonDataShareService

  ) { }
}
