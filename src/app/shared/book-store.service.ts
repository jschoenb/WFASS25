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

  getAllSearch(searchTerm: string): Observable<Array<Book>> {
    return this.http.get<Array<Book>>(`${this.api}/books/search/${searchTerm}`).
    pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(book: Book): Observable<any> {
    return this.http.post<Book>(`${this.api}/books`, book).
    pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  update(book: Book): Observable<any> {
    return this.http.put<Book>(`${this.api}/books/${book.isbn}`, book).
    pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  check(isbn: string): Observable<Boolean> {
    return this.http.get<Boolean>(`${this.api}/books/checkisbn/${isbn}`).
    pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllSearchViaFetch(searchTerm: string,abortSignal: AbortSignal): Promise<Response> {
    return fetch(`${this.api}/books/search/${searchTerm}`,{signal:abortSignal});
  }

  remove(isbn: string): Observable<Book> {
    return this.http.delete<any>(`${this.api}/books/${isbn}`).
    pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
