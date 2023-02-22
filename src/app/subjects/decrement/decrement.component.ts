import { Component } from '@angular/core';
import { CounterStateService } from '../counter-state-service.service';

@Component({
  selector: 'app-decrement',
  templateUrl: './decrement.component.html',
  styleUrls: ['./decrement.component.css'],
})
export class DecrementComponent {
  constructor(private counterState: CounterStateService) {}

  onDecrement() {
    // counter state decrement aksiyonun tetiklendim
    this.counterState.decrement();
  }
}
