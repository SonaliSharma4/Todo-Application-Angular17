import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  searchSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor() {}
}
