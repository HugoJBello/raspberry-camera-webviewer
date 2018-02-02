import { Component, OnInit, OnDestroy } from '@angular/core';
import { ImagesService } from '../images.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { ImageDTO } from '../DTO/imageDTO';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {


  constructor(public imagesService: ImagesService) { }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

}
