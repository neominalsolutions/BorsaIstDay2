import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// service yapıları componentlere constructor vasıtası ile inject ediliyorlar.
// providedIn: 'root' root module seviyesinde tek bir instance ile ayağa kalk.
// providedIn: 'root' kaldırınca artık instance geçişkenli transient oluyor

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoServiceService {
  constructor(private httpClient: HttpClient) {}

  getTodos(): Observable<ITodo[]> {
    return this.httpClient.get<ITodo[]>(
      'https://jsonplaceholder.typicode.com/todos'
    );
  }
}
