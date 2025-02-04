import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  private buttonNameSource = new BehaviorSubject<any>(''); 
  buttonName$ = this.buttonNameSource.asObservable(); 

  sendButtonName(name: any) {
    this.buttonNameSource.next(name); 
  }
}
