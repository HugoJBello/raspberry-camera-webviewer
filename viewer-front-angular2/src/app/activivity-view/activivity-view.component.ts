import { Component, OnInit} from '@angular/core';
import { LogQueryDTO } from '../DTO/logQueryDTO';

@Component({
  selector: 'app-activivity-view',
  templateUrl: './activivity-view.component.html',
  styleUrls: ['./activivity-view.component.css']
})
export class ActivivityViewComponent implements OnInit {
  logQuery: LogQueryDTO = new LogQueryDTO(new Date());
  constructor() { }

  ngOnInit() {
  }
  onChangeLogQuery(logQuery){
    this.logQuery = logQuery;
    console.log(this.logQuery);
  }
  onSubmmitLogsQuery(logQuery){
    this.logQuery = logQuery;
    console.log(this.logQuery);
  }

}
