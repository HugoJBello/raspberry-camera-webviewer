import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CONFIG } from './config/config';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HeatMapDataService {
  private baseUrl = 'http://' + CONFIG.URL_BASE + ':3333';
  private urlHeatData = this.baseUrl + "/images/heat_map_data_date"

  constructor(private http: HttpClient) { }  // Implement a method to get the private deals

  getHeatMapData(day) {
    return this.http
      .get(this.urlHeatData + "/day=" + day, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`)
      })
      .pipe(
        catchError(this.handleError)
      );
  }
  // Implement a method to handle errors if any
  private handleError(err: HttpErrorResponse | any) {
    console.error('An error occurred', err);
    return Observable.throw(err.message || err);
  }

}
