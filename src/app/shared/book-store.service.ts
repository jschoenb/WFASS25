import { Injectable } from '@angular/core';
import {Author, Book, Image} from './book';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, retry, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
  private api = "http://bookstore25.putz.kwmhgb.at/api"

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Array<Book>> {
    return this.http.get<Array<Book>>(`${this.api}/books`).
      pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingle(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.api}/books/${isbn}`).
    pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove(isbn: string): Observable<Book> {
    return this.http.delete<any>(`${this.api}/books/${isbn}`).
    pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
