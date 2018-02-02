import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ImageDTO } from '../DTO/imageDTO';
import { ImageQueryDTO } from '../DTO/imageQueryDTO';
import { ParametersImageQuery } from '../DTO/parametersImageQueryDTO';

@Component({
  selector: 'images-view-deals',
  templateUrl: './images-view.component.html',
  styleUrls: ['./images-view.component.css']
})
export class ImagesViewComponent implements OnInit {
  images: ImageDTO[];
  imageQuery: ImageQueryDTO = new ImageQueryDTO(10, null, false, false, null,null);
  parametersImageQuery: ParametersImageQuery;
  imagesMapByCamera: Map<string,ImageDTO[]> = new Map;

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
  }
  onChangeParameters(parametersImageQuery){
    this.parametersImageQuery = parametersImageQuery;
  }

}
