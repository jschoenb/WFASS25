import {Component, inject, signal} from '@angular/core';
import {Book} from '../shared/book';
import {BookListItemComponent} from '../book-list-item/book-list-item.component';
import {BookContainerComponent} from '../book-container/book-container.component';
import {BookStoreService} from '../shared/book-store.service';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'bs-book-list',
  imports: [
    BookListItemComponent,
    BookContainerComponent,
    RouterLink
  ],
  providers: [{provide: BookStoreService, useClass:BookStoreService}],
  templateUrl: './book-list.component.html',
  styles: ``
})
export class BookListComponent {
  books = signal<Book[]>([]);

  bs = inject(BookStoreService);

  ngOnInit() {
    this.bs.getAll().subscribe(res => this.books.set(res));
  }

}

