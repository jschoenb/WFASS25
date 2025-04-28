import { Component } from '@angular/core';
import {BookListComponent} from './book-list/book-list.component';
import {Book} from './shared/book';
import {BookDetailsComponent} from './book-details/book-details.component';

@Component({
  selector: 'bs-root',
  imports: [
    BookListComponent,
    BookDetailsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  listOn = true;
  detailsOn = false;

  book: Book | undefined;

  showList() {
    this.listOn = true;
    this.detailsOn = false;
  }

  showDetails(book: Book) {
    this.book = book;
    this.listOn = false;
    this.detailsOn = true;
  }
}
