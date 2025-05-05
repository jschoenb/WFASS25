import {Component, resource, signal} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {BookStoreService} from '../shared/book-store.service';
import {Book} from '../shared/book';

@Component({
  selector: 'bs-search-new',
  imports: [],
  templateUrl: './search-new.component.html',
  styles: ``
})
export class SearchNewComponent {
  private search = signal<string>('');

  constructor(private bs:BookStoreService) {
  }

  books = resource<Book[],{search:string}>({
    request: () => ({search: this.search()}),
    loader: async ({request, abortSignal}) => {
      return await firstValueFrom(this.bs.getAllSearch(request.search));
    }
  });

  searchBooks(searchTerm:string) {
    this.search.set(searchTerm);
  }
}

