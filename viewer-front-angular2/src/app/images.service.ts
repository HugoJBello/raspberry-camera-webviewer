import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { Image } from './image';
import { CONFIG } from './config/config';

@Injectable()
export class ImagesService {
  // Define the routes we are going to interact with
 // private urlImagesPagedFiles = 'http://localhost:3333/images_base64_date_paged_files';
  
  private baseUrl = 'http://' + CONFIG.URL_BASE + ':3333';
 // private baseUrl = 'http://hjbello.hopto.org:3333';
  private urlImagesPagedDateFiles = this.baseUrl + '/images_base64_date_paged_files';
  private urlImagesPagedFiles = this.baseUrl + '/images_base64_paged_files';
  private urlLastImagesLimit = this.baseUrl + '/get_list_images';
  private urlLastImagesLimitDate = this.baseUrl + '/images_base64_date'; // limit=:limit/skip=:skip/day=:day/';
  private urlImagesPagedDateParameters = this.baseUrl + "/images_base64_parameters_date"
  private urlImagesPagedParameters = this.baseUrl + "/images_base64_parameters"
  private urlActiveCameras = this.baseUrl + "/active_cameras"


  private images: Image[];

  constructor(private http: HttpClient) { }

  // Implement a method to get the private deals
  getImagesDatePaged(day,page) {
    return this.http
      .get(this.urlImagesPagedDateFiles + "/day=" + day + "/page=" + page, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`)
      })
      .pipe(
        catchError(this.handleError)
      );
  }
  getImagesPaged(page) {
    return this.http
      .get(this.urlImagesPagedFiles + "/page=" + page, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`)
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  getLastImagesLimit(limit) {
    console.log(this.baseUrl);
    return this.http
      .get(this.urlLastImagesLimit + "/" + limit, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`)
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  getLastImagesLimitDate(limit,date) {
    return this.http
      .get(this.urlLastImagesLimitDate + "/limit=" + limit + "/skip=0/day=" + date, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`)
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  getParametersDate(date) {
    return this.http
      .get(this.urlImagesPagedDateParameters + "/day=" + date, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`)
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  getParameters() {
    return this.http
      .get(this.urlImagesPagedParameters, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`)
      })
      .pipe(
        catchError(this.handleError)
      )
  }

  getActiveCameras() {
    return this.http
      .get(this.urlActiveCameras, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`)
      })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Implement a method to handle errors if any
  private handleError(err: HttpErrorResponse | any) {
    console.error('An error occurred', err);
    return Observable.throw(err.message || err);
  }

}
