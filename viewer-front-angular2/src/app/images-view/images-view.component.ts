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
  imageQuery: ImageQuery = new ImageQuery(10, null, false, false, null,null);
  parametersImageQuery: ParametersImageQuery;
  imagesMapByCamera: Map<string,Image[]> = new Map;

  imagesByCamera : any[];
  error:any;
  constructor() { }

  ngOnInit() {
   }
 
   loadMapImagesByCamera (){
    this.imagesMapByCamera = new Map;
    this.imagesByCamera =[];
    if(this.images){
      this.images.forEach((image) => {
        if (this.imagesMapByCamera.has(image.camera_id)){
          var imagesInCam = this.imagesMapByCamera.get(image.camera_id);
          imagesInCam.push(image);
          this.imagesMapByCamera.set(image.camera_id, imagesInCam);
        } else {
          this.imagesMapByCamera.set(image.camera_id, [image]);
        }
      });  
    }
    this.imagesByCamera = Array.from(this.imagesMapByCamera.values());
  }
  onImagesSearch(images){
    this.images=images;
    this.loadMapImagesByCamera ()
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
