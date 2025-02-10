import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor() {}

  updateEvent:EventEmitter<string> = new EventEmitter();

  update(){
    this.updateEvent.emit("Updated");
  }

}
