import { Component } from '@angular/core';
import { CounterStateService } from '../counter-state-service.service';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styleUrls: ['./increment.component.css'],
})
export class IncrementComponent {
  constructor(private counterState: CounterStateService) {}

  onIncrement() {
    // state güncellemesi yapan aksiyon
    this.counterState.increment();
  }
}
