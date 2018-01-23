import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Image } from '../image';
import { ImageQuery } from '../imageQuery';
import { ParametersImageQuery } from '../parametersImageQuery';
import { ImagesService } from '../images.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../auth/auth.service';
import {MatTableDataSource} from '@angular/material';

//import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { NgxImageGalleryComponent, GALLERY_IMAGE, GALLERY_CONF } from "ngx-image-gallery";


@Component({
  selector: 'app-image-displayer', 
  templateUrl: 'image-displayer.component.html',
  styleUrls: ['image-displayer.component.css']
})
export class ImageDisplayerComponent implements OnInit {
  @Input() images: Image[]; 
  @Input() imageQuery: ImageQuery;
  @Input() parametersImageQuery: ParametersImageQuery;
  @Output() onImagesSearch = new EventEmitter<Image[]>();
  
  error: any;
  imagesSub: Subscription;

  //urlBackend : string = "http://hjbello.hopto.org:3333/image_recorded/"
  urlBackend : string = "http://localhost.org:3333/image_recorded/"
  
  // gallery configuration
  ngxImageGallery: NgxImageGalleryComponent;
  conf: GALLERY_CONF = { 
    imageOffset: '0px',
    showDeleteControl: false,
    showImageTitle: false,
    inline :true
  };
  // gallery images
  imagesF: GALLERY_IMAGE[] = [ ];
  
  // table configuration
  dataSource = new MatTableDataSource<Image>(this.images);
  displayedColumns = ['filename', 'path', 'date_taken',];

  constructor(public imagesService: ImagesService){
  }
 
  ngOnInit(){

  }
  ngOnChanges() {
    this.loadImagesFormated();
    this.dataSource = new MatTableDataSource<Image>(this.images);

  }
  loadImagesFormated(){
    this.imagesF = [];
    if (this.images){
    if (this.images.length>0){
     this.images.forEach(element => {
        var url = this.urlBackend+element.filename;
        element.url= url;
        var record ={url:url,
                    altText:element.filename}
        this.imagesF.push(record);
      });
    }}
  }

  pageChanged(page){
    this.imageQuery.page = page;
    if (this.imageQuery.date == null) {
      this.imagesSub = this.imagesService
        .getImagesPaged(this.imageQuery.page)
        .subscribe(
        images => this.images = images,
        err => error => this.error = err,
        () => {this.onImagesSearch.emit(this.images); this.loadImagesFormated();}
        );
    } else {
      this.imagesSub = this.imagesService
        .getImagesDatePaged(this.formatDate(this.imageQuery.date), this.imageQuery.page)
        .subscribe(
        images => this.images = images,
        err => error => this.error = err,
        () => {this.onImagesSearch.emit(this.images);this.loadImagesFormated(); }
        );
    }
  }

  formatDate(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2);
  }
    
  // METHODS
  // open gallery
  openGallery(index: number = 0) {
    this.ngxImageGallery.open(index);
  }
    
  // close gallery
  closeGallery() {
    this.ngxImageGallery.close();
  }
    
  // set new active(visible) image in gallery
  newImage(index: number = 0) {
    this.ngxImageGallery.setActiveImage(index);
  }
    

    
  /**************************************************/
    
  // EVENTS
  // callback on gallery opened
  galleryOpened(index) {
    console.info('Gallery opened at index ', index);
  }
 
  // callback on gallery closed
  galleryClosed() {
    console.info('Gallery closed.');
  }
 
  // callback on gallery image clicked
  galleryImageClicked(index) {
    console.info('Gallery image clicked with index ', index);
  }
  
  // callback on gallery image changed
  galleryImageChanged(index) {
    console.info('Gallery image changed to index ', index);
  }
 
  // callback on user clicked delete button
  deleteImage(index) {
    console.info('Delete image at index ', index);
  }
}

