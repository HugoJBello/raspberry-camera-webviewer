import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImageQuery } from '../imageQuery';
import { Image } from '../image';

import { ImagesService } from '../images.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../auth/auth.service';

import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ParametersImageQuery } from '../parametersImageQuery';

@Component({
  selector: 'app-query-images',
  templateUrl: './query-images.component.html',
  styleUrls: ['./query-images.component.css']
})
export class QueryImagesComponent implements OnInit, OnDestroy {
  @Input() imageQuery: ImageQuery;
  @Input() parametersImageQuery: ParametersImageQuery;
  images: Image[];
  imagesSub: Subscription;
  error: any;

  @Output() onChangeImagesQuery = new EventEmitter<ImageQuery>();
  @Output() onChangeParameters = new EventEmitter<ParametersImageQuery>();

  @Output() onImagesSearch = new EventEmitter<Image[]>();

  options = [
    { id: 1, name: "1" },
    { id: 10, name: "10" },
    { id: 30, name: "30" },
    { id: "all", name: "all" }
  ];
  selectedValue = this.options[1];


  constructor(public imagesService: ImagesService) { }

  public onClickButton(): void {  // event will give you full breif of action
    this.imageQuery.page = 1;
   // if (this.imageQuery.date != null) {
   //   if (this.imageQuery.date.getMonth === NaN) {
   //     this.imageQuery.date = null;
   //   }
   // }
 
    if (this.imageQuery.numberOfImages == 'all') {
      if (this.imageQuery.date == null || this.imageQuery.date =="") {
        this.imagesSub = this.imagesService
          .getImagesPaged(this.imageQuery.page)
          .subscribe(
          images => this.images = images,
          err => error => this.error = err,
          () => { this.onImagesSearch.emit(this.images); this.onChangeImagesQuery.emit(this.imageQuery); }
          );

          this.imagesSub = this.imagesService
          .getParameters()
          .subscribe(
          parametersImageQuery => this.parametersImageQuery = parametersImageQuery,
          err => error => this.error = err,
          () => { this.onChangeParameters.emit(this.parametersImageQuery); }
          );
      } else {
        this.imagesSub = this.imagesService
          .getImagesDatePaged(this.formatDate(this.imageQuery.date), this.imageQuery.page)
          .subscribe(
          images => this.images = images,
          err => error => this.error = err,
          () => { this.onImagesSearch.emit(this.images); this.onChangeImagesQuery.emit(this.imageQuery); }
          );

        this.imagesSub = this.imagesService
          .getParametersDate(this.formatDate(this.imageQuery.date))
          .subscribe(
          parametersImageQuery => this.parametersImageQuery = parametersImageQuery,
          err => error => this.error = err,
          () => { this.onChangeParameters.emit(this.parametersImageQuery); }
          );
      }
    } else {
      if (this.imageQuery.date == null || this.imageQuery.date =="") {
        this.imagesSub = this.imagesService
          .getLastImagesLimit(this.imageQuery.numberOfImages)
          .subscribe(
          images => this.images = images,
          err => error => this.error = err,
          () => { this.onImagesSearch.emit(this.images); this.onChangeImagesQuery.emit(this.imageQuery); }
          );
      } else {
        this.imagesSub = this.imagesService
          .getLastImagesLimitDate(this.imageQuery.numberOfImages, this.formatDate(this.imageQuery.date))
          .subscribe(
          images => this.images = images,
          err => error => this.error = err,
          () => { this.onImagesSearch.emit(this.images); this.onChangeImagesQuery.emit(this.imageQuery); }
          );
      }
    }
  }

  formatDate(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2);
  }

  ngOnInit() {

  }
  ngOnDestroy() {
    this.imagesSub.unsubscribe();
  }

}
