import { Injectable } from '@angular/core';
import {Author, Book, Image} from './book';

@Injectable({
  providedIn: 'root'
})
export class BookStoreMockService {
  books:Book[] = [];
  constructor() {
    this.books = [
      new Book(1,
        '9783864903571',
        'Angular',
        [new Author(1,'Johannes', 'Hoppe'), new Author(2,'Danny','Koppenhagen'),
          new Author(3,'Ferdinand','Malcher'), new Author(4,'Gregor', 'Woiwode')],
        new Date(2017, 3, 1),
        1,
        'Grundlagen, fortgeschrittene Techniken und Best Practices mit TypeScript - ab Angular 4, inklusive NativeScript und Redux',
        5,
        [new Image(1,'https://ng-buch.de/cover2.jpg', 'Buchcover')],
        'Mit Angular setzen Sie auf ein modernes und modulares...'
      )
    ];
  }

  getAll(): Book[] {
    return this.books;
  }
}
