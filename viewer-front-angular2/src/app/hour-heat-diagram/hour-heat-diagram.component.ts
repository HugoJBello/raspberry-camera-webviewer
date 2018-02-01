import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hour-heat-diagram',
  templateUrl: './hour-heat-diagram.component.html',
  styleUrls: ['./hour-heat-diagram.component.css']
})
export class HourHeatDiagramComponent implements OnInit {
  data:any;
  color:string="red";
  overview:string="day";
  constructor() { }

  ngOnInit() {
    this.data = [{
      date: "2018-02-01",
      total: 17164,
      details: [{
        name: "Project 1",
        date: "2018-02-01 12:30:45",
        value: 9192
      }, {
        name: "Project 2",
        date: "2018-02-01 13:37:00",
        value: 6753
      },
      {
        name: "Project N",
        date: "2018-02-01 17:52:41",
        value: 1219
      }]
    }]
  }

}
