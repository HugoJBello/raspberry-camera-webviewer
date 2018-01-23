import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Image } from '../image';
import { ImageQuery } from '../imageQuery';
import { ParametersImageQuery } from '../parametersImageQuery';

@Component({
  selector: 'images-view-deals',
  templateUrl: './images-view.component.html',
  styleUrls: ['./images-view.component.css']
})
export class ImagesViewComponent implements OnInit {
  images: Image[];
  imageQuery: ImageQuery = new ImageQuery(10, null, false, false, null);
  parametersImageQuery: ParametersImageQuery;
  error:any;
  constructor() { }

  ngOnInit() {
   }
 

  onImagesSearch(images){
    this.images=images;
  }

  onChangeImagesQuery(imageQuery){
    this.imageQuery = imageQuery;
    console.log(imageQuery);
  }
  onChangeParameters(parametersImageQuery){
    this.parametersImageQuery = parametersImageQuery;
    console.log(parametersImageQuery);
  }

}
