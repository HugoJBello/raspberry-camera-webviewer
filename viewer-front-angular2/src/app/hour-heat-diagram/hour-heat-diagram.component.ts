import { Component, OnInit, Input } from '@angular/core';
import { HeatMapDataDTO } from '../DTO/heatMapDataDTO';
import { HeatMapDataService } from '../heat-map-data.service';
import { UtilsDateService } from '../utils-date.service';
import { Subscription } from 'rxjs/Subscription';
import { ImageQueryDTO } from '../DTO/imageQueryDTO';
import { ImageDTO } from '../DTO/imageDTO';

@Component({
  selector: 'app-hour-heat-diagram',
  templateUrl: './hour-heat-diagram.component.html',
  styleUrls: ['./hour-heat-diagram.component.css']
})
export class HourHeatDiagramComponent implements OnInit {
  data: HeatMapDataDTO[];
  @Input() imageQuery: ImageQueryDTO;
  @Input() images: ImageDTO[]; 

  color: string = "red";
  overview: string = "day";
  hourDataSub: Subscription;
  error: any;
  day: string;

  constructor(public hourDataService: HeatMapDataService, public utils: UtilsDateService) { }

  ngOnInit() {

    this.day = this.utils.formatDate(new Date());

    this.hourDataSub = this.hourDataService.getHeatMapData(this.day)
      .subscribe(
      data => this.data = data,
      err => error => this.error = err,
      () => { console.log(this.data) }
      );
    /*
    this.data = [{
      date: new Date("2018-02-01"),
      total: 17164,
      details: [{
        name: "Project 1",
        date: new Date("2018-02-01 12:30:45"),
        value: 9192
      }, {
        name: "Project 2",
        date: new Date("2018-02-01 13:37:00"),
        value: 6753
      },
      {
        name: "Project N",
        date: new Date("2018-02-01 17:52:41"),
        value: 1219
      }]
    }]
    */

  }

  ngOnChanges() {
    this.day = this.utils.formatDate(new Date());

    this.hourDataSub = this.hourDataService.getHeatMapData(this.day)
      .subscribe(
      data => this.data = data,
      err => error => this.error = err,
      () => { console.log(this.data) }
      );
  }

}
