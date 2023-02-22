import { Component, OnInit } from '@angular/core';
import { CounterStateService } from './subjects/counter-state-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'HttpClientApps';

  constructor(public counterState: CounterStateService) {}

  // await için async function ile çalışmamız lazım
  async ngOnInit() {
    const promise = new Promise((resolve, reject) => {
      return resolve(5);
    });

    // ES6
    promise
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err);
      })
      .finally(() => {
        console.log('işlem tamam');
      });

    // ES7
    try {
      let response = await promise;
      console.log('async-await', response);
    } catch (error) {
      console.log('async-await-err', error);
    } finally {
      console.log('async-await-bitti');
    }
  }
}
