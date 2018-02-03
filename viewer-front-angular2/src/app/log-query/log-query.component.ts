import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LogQueryDTO } from '../DTO/logQueryDTO';
import { LogDTO } from '../DTO/logDTO';
import { HeatMapDTO } from '../DTO/heatMapDataDTO';
 
import { HeatMapDataService } from '../heat-map-data.service';
import { UtilsDateService } from '../utils-date.service';

import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-log-query',
  templateUrl: './log-query.component.html',
  styleUrls: ['./log-query.component.css']
})
export class LogQueryComponent implements OnInit {
  logQuery: LogQueryDTO=new LogQueryDTO(new Date());
  data: HeatMapDTO[];
  //@Input() logs: LogDTO[]; 

  color: string = "red";
  overview: string = "day";
  hourDataSub: Subscription;
  error: any;
  day: string;

  constructor(public hourDataService: HeatMapDataService, public utils: UtilsDateService) { 
  }

  public onClickButton(): void {  // event will give you full breif of action
    this.day = this.utils.formatDate(this.logQuery.date);
    if (this.day == "NaN-aN-aN") this.day = this.utils.formatDate(new Date());
    console.log(":.................................")
    this.getData();
    }
  
    ngOnInit() {
      this.day = this.utils.formatDate(new Date());
      this.getData();
    }

  getData() {
    this.hourDataSub = this.hourDataService.getHeatMapLogs(this.day)
      .subscribe(
      data => this.data = data,
      err => error => this.error = err,
      () => { console.log(this.data) }
      );
  }


}
