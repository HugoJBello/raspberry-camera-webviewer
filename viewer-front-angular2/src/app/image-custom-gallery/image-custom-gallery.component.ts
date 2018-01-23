import { Component, OnChanges, OnInit, Input } from '@angular/core';
import { Image } from '../image';

@Component({
  selector: 'app-image-custom-gallery',
  templateUrl: './image-custom-gallery.component.html',
  styleUrls: ['./image-custom-gallery.component.css']
})
export class ImageCustomGalleryComponent implements OnChanges {
  @Input() images: Image[];
  currentPage: number = 0;
  numberOfPages: number =0;

  constructor() {
    if(this.images){
      this.numberOfPages=this.images.length;
    }
   }

  showPrevious(event) { 
    if (this.currentPage>=1){
    this.currentPage = (this.currentPage - 1);
    } else {
      if(this.images) this.currentPage=this.images.length-1;
    }
  }
  showNext(event) {
    this.currentPage = (this.currentPage + 1) % this.images.length;
  }
  ngOnChanges() {
    if(this.images){
      this.numberOfPages=this.images.length;
    }
  }

}
