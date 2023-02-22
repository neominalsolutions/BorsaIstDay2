import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CounterStateService } from '../counter-state-service.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
})
export class CounterComponent implements OnInit, OnDestroy {
  constructor(private counterState: CounterStateService) {
    // counter içerisinde dinleme yapabilirz fakat tavsiye edilmez
  }

  counter!: number;
  stateSub!: Subscription;

  ngOnInit(): void {
    // component ilk doma yüklenecek zaman tetiklenen yer.
    // her bir subscription işleminde buradaki subscription kodu tekrar tekrar tetiklenir.

    this.stateSub = this.counterState.counterSubject.subscribe({
      next: (counter: number) => {
        // next ile gönderilen değeri dinledim
        this.counter = counter;
      },
    });
  }

  ngOnDestroy(): void {
    this.stateSub.unsubscribe();
  }
}
