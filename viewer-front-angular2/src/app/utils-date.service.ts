import { Injectable } from '@angular/core';

@Injectable()
export class UtilsDateService {

  constructor() { }
  
  formatDate(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2);
  }
}
