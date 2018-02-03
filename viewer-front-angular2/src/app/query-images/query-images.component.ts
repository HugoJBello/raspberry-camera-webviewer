import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImageQueryDTO } from '../DTO/imageQueryDTO';
import { ImageDTO } from '../DTO/imageDTO';

import { ImagesService } from '../images.service';
import { UtilsDateService } from '../utils-date.service';

import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../auth/auth.service';

import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ParametersImageQuery } from '../DTO/parametersImageQueryDTO';

@Component({
  selector: 'app-query-images',
  templateUrl: './query-images.component.html',
  styleUrls: ['./query-images.component.css']
})
export class QueryImagesComponent implements OnInit, OnDestroy {
  @Input() imageQuery: ImageQueryDTO;
  @Input() parametersImageQuery: ParametersImageQuery;
  images: ImageDTO[];
  imagesSub: Subscription;
  error: any;

  @Output() onChangeImagesQuery = new EventEmitter<ImageQueryDTO>();
  @Output() onChangeParameters = new EventEmitter<ParametersImageQuery>();

  @Output() onImagesSearch = new EventEmitter<ImageDTO[]>();

  options = [
    { id: 1, name: "1" },
    { id: 10, name: "10" },
    { id: 30, name: "30" },
    { id: "all", name: "all" }
  ];
  selectedValue = this.options[1];


  constructor(public imagesService: ImagesService, public utils: UtilsDateService) { }

  public onClickButton(): void {  // event will give you full breif of action
    this.imageQuery.page = 1;
 
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
          .getImagesDatePaged(this.utils.formatDate(this.imageQuery.date), this.imageQuery.page)
          .subscribe(
          images => this.images = images,
          err => error => this.error = err,
          () => { this.onImagesSearch.emit(this.images); this.onChangeImagesQuery.emit(this.imageQuery); }
          );

        this.imagesSub = this.imagesService
          .getParametersDate(this.utils.formatDate(this.imageQuery.date))
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
          () => {this.onImagesSearch.emit(this.images); this.onChangeImagesQuery.emit(this.imageQuery); }
          );
      } else {
        this.imagesSub = this.imagesService
          .getLastImagesLimitDate(this.imageQuery.numberOfImages, this.utils.formatDate(this.imageQuery.date))
          .subscribe(
          images => this.images = images,
          err => error => this.error = err,
          () => { this.onImagesSearch.emit(this.images); this.onChangeImagesQuery.emit(this.imageQuery); }
          );
      }
    }
  }

  ngOnInit() {

  }
  ngOnDestroy() {
   // this.imagesSub.unsubscribe();
  }

}
