import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CounterStateService {
  // state güncel değerini alabileceğimiz
  // state sürecini yönetebileceğimiz service

  public counterSubject!: BehaviorSubject<number>;

  constructor() {
    this.counterSubject = new BehaviorSubject<number>(0);
  }

  increment() {
    // counter değerini 1 artırdık
    this.counterSubject.next(this.counterSubject.value + 1);
  }

  decrement() {
    // counter değerini 1 azalttık
    this.counterSubject.next(this.counterSubject.value - 1);
  }
}
