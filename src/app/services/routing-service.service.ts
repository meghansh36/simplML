import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  navTitleEmitter = new Subject();
  showSideBarEmitter = new Subject();
  constructor() { }
}
