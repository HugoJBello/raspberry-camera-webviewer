import { Component, OnInit, Input,SimpleChanges, SimpleChange } from '@angular/core';
import { HeatMapDTO } from '../DTO/heatMapDataDTO';
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
  data: HeatMapDTO[];
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
    this.getData();
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

  ngOnChanges(changes: SimpleChanges){
    if(this.images){
      this.day = this.utils.formatDate(this.images[0].date_taken);
      if (this.day == "NaN-aN-aN") this.day = this.utils.formatDate(null);
      console.log(":::" + this.day)
      this.getData();
    }
    
  }

  getData() {
    this.hourDataSub = this.hourDataService.getHeatMapData(this.day)
      .subscribe(
      data => this.data = data,
      err => error => this.error = err,
      () => { console.log(this.day);console.log(this.data) }
      );
  }

}
