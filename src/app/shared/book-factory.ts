import {Book} from './book';

export class BookFactory {
  static empty() : Book {
    return new Book(0, '', '', [], new Date(), 0, '', 0, [], '');
  }
}
