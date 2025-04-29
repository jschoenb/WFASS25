import { Injectable } from '@angular/core';
import {Author, Book, Image} from './book';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
  private api = "http://bookstore25.putz.kwmhgb.at/api"

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Array<Book>> {
    return this.http.get<Array<Book>>(`${this.api}/books`);
  }

  getSingle(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.api}/books/${isbn}`);
  }
}
