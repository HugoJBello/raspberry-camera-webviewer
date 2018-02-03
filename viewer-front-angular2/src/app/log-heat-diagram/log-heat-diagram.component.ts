import { Component, OnInit, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { HeatMapDTO } from '../DTO/heatMapDataDTO';
import { HeatMapDataService } from '../heat-map-data.service';
import { UtilsDateService } from '../utils-date.service';
import { Subscription } from 'rxjs/Subscription';
import { LogQueryDTO } from '../DTO/logQueryDTO';
import { LogDTO } from '../DTO/logDTO';

@Component({
  selector: 'app-log-heat-diagram',
  templateUrl: './log-heat-diagram.component.html',
  styleUrls: ['./log-heat-diagram.component.css']
})
export class LogHeatDiagramComponent implements OnInit {
  data: HeatMapDTO[];
  @Input() logQuery: LogQueryDTO;
  //@Input() logs: LogDTO[]; 

  color: string = "red";
  overview: string = "day";
  hourDataSub: Subscription;
  error: any;
  day: string;

  constructor(public hourDataService: HeatMapDataService, public utils: UtilsDateService) { }

  ngOnInit() {
    this.day = this.utils.formatDate(new Date());
    this.getData();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.day = this.utils.formatDate(this.logQuery.date);
    if (this.day == "NaN-aN-aN") this.day = this.utils.formatDate(new Date());
    console.log(":.................................")
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
