import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  catchError,
  concat,
  concatMap,
  delay,
  filter,
  forkJoin,
  from,
  fromEvent,
  interval,
  map,
  merge,
  Observable,
  of,
  Subscription,
  switchMap,
  take,
  takeUntil,
  tap,
  timer,
} from 'rxjs';

import { ajax } from 'rxjs/ajax';
import {
  ITodo,
  TodoServiceService,
} from 'src/app/services/todo-service.service';

@Component({
  selector: 'app-reactive-programlama',
  templateUrl: './reactive-programlama.component.html',
  styleUrls: ['./reactive-programlama.component.css'],
  // providers: [TodoServiceService], // transient bir service instance, component bazlı service instance yöntemi
})
export class ReactiveProgramlamaComponent implements OnInit, OnDestroy {
  apiSubs!: Subscription;
  data$!: Observable<ITodo[]>; // Observable olan tipleri ayırmak için değişken sonuna $ ifadesi konulması kabul görmüş bir yöntemdir.

  constructor(private todoService: TodoServiceService) {}

  ngOnInit(): void {
    // reactive programlama senkron hemde asenkron durumlar içinde çalışır.
    // promise sadece async operasyonlar için çalışır.
    // rxjs uygulama için nesnenin, array olabilir obserbale formatına dönüşmesi lazım
    const arrObs = from([1, 2, 3]); // abone olunacak nesne

    this.apiSubs = arrObs.subscribe((res) => {
      // nesneye abone olma işlemi
      console.log('res', res);
    });

    // belirli bir sıra dahilinde observable olan işlemleri uygulabiliriz.
    concat(from([1, 2, 3, 4, 5]), from([6, 7, 8])).subscribe((res) => {
      console.log('res-concat', res);
    });

    // merge burada sıralı bir işlem söz konusu değildir.
    // iki farklı observable operasyonu birleştirmeye yarar
    // 100ms bir bekleme yap
    merge(from([1, 2, 3, 4, 5]).pipe(delay(100)), from([6, 7, 8])).subscribe(
      (res) => {
        console.log('res-merge', res);
      }
    );

    // işlemleri belirli bir ms bekleterek yapıyor işlemi keser
    const source = timer(1000);

    source.subscribe((res) => {
      console.log('val', res);
    });

    // işlemin belirli aralıklara tekrar tekrar yapılması için ise interval operatörü kullanabiliriz.

    interval(1000).subscribe((res) => {
      // 1000ms bir ardışık değer üretip gönderiyor
      console.log('interval', res);
    });

    // pipe ile data stream akışında birden fazla operatör ile veri üzerinde işlem yapılabilir.
    from(fetch('https://jsonplaceholder.typicode.com/todos'))
      .pipe(
        take(1), // unsunbscription da yapıyor.
        map((val) => {
          // veri üzerinde bir maniplasyon işlemi varsa
          console.log('val', val);
          return val.json();
        }),
        tap(async (val) => {
          console.log('data-stream-log', val);
          // tap ile araya girip localstorage veri basma

          const data = await val;
          localStorage.setItem('data', JSON.stringify(data));
          return val;
        }),
        catchError((err) => {
          // eğer istek sırasında bir hata meydana gelirse hata response değiştirmemize yarayan kısım.
          console.log('err', err);

          const error = {
            message: 'server-eror',
            statusCode: 500,
          };
          // of operatörü kullaranarak ilgli nesneyi observable tipinde döndürebiliriz.
          return of(error);
        })
      )
      .subscribe({
        next: (data) => {
          console.log('data', data);
        },
        error: (err) => {
          console.log('promise catch kısmı', err);
        },
        complete() {
          console.log('işlem bitti');
        },
      });

    // 5 den büyük değerleri filtrele
    // ilk 3 tanesini al

    from([3, 4, 10, 15, 18, 2, 34])
      .pipe(
        filter((val) => val > 5),
        take(3)
      )
      .subscribe((res) => {
        console.log('filtered result', res);
      });

    // subscribe artık data tranform edildikten sonraki hali.
    // api call yapıp oradan gelen bir parametreye göre başka bir api call yaparak gerçek response bulduğumuz durumlarda kullanılan bir operatör
    // api/users/ali
    // email
    // api/user-info/me/{email} // account Info
    // switchmap ile bağladığımız response bir önceki observable operasyonu kesip kendi sonucu döndürmemiz sağlıyor. performanslı bir yöntem
    fromEvent(document, 'click')
      .pipe(switchMap(() => interval(1000)))
      .subscribe((val) => {
        console.log('switchMap-val', val);
      });

    // concatMap işlemi kesmez
    fromEvent(document, 'click')
      .pipe(concatMap(() => interval(1000)))
      .subscribe((val) => {
        console.log('concatmap-val', val);
      });

    forkJoin(
      // as of RxJS 6.5+ we can use a dictionary of sources
      {
        google: ajax.getJSON('https://api.github.com/users/google'),
        microsoft: ajax.getJSON('https://api.github.com/users/microsoft'),
        users: ajax.getJSON('https://api.github.com/users'),
      }
    )
      // { google: object, microsoft: object, users: array }
      .subscribe((data) => {
        console.log('forkjoin', data);
      });

    // buda farkı apidan gelen responseları tek bir api üzeride birleştirip göstermemiz sağlayan bir yöntem
  }

  onLoadTodos() {
    this.data$ = this.todoService.getTodos();
    // subscribe yapmaya gerek kalmayan yöntem.

    this.todoService.getTodos().subscribe({
      next: (data) => {
        // eğer ki data üzerinde bir veri çektikten sonra bir işlem olabilir.
        // notification atma, alert verme, bir kayıt güncelleme
        // subscribe böyle yazılabilir.
        // eğer ki direkt olarak veriyi arayüzde kullanacak isek bu durumda observabletipte tanımlayı arayüzden | async operatör ile çağırabiliriz.
        console.log('load-data-from-service', data);
      },
      error: (err) => {},
      complete: () => {},
    });
  }

  ngOnDestroy(): void {
    this.apiSubs.unsubscribe();
  }
}
