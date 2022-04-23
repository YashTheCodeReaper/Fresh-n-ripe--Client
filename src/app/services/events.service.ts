import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  public eventSubject: Subject<any> = new Subject();
  constructor() {}
}
