import {Component, effect, output, resource, signal} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {BookStoreService} from '../shared/book-store.service';
import {Book} from '../shared/book';
import {NgClass} from '@angular/common';

@Component({
  selector: 'bs-search-new',
  imports: [
    NgClass
  ],
  templateUrl: './search-new.component.html',
  styles: ``
})
export class SearchNewComponent {
  private search = signal<string>('');
  bookSelected = output<Book>();

  constructor(private bs:BookStoreService) {
    effect(() => {
      console.log('search term changed: ', this.search());
    })
  }

  books = resource<Book[],{search:string}>({
    request: () => ({search: this.search()}),
    loader: async ({request, abortSignal}) => {
      //return await firstValueFrom(this.bs.getAllSearch(request.search));
      if(request.search && request.search.length>0){
        const response = await this.bs.getAllSearchViaFetch(request.search,abortSignal);
        if(response.ok){
          return await response.json();
        } else {
          return [];
        }
      }
    }
  });

  searchBooks(searchTerm:string) {
    this.search.set(searchTerm);
  }
}

