import {Component, EventEmitter, OnInit, output} from '@angular/core';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs';
import {BookStoreService} from '../shared/book-store.service';
import {Book} from '../shared/book';
import {NgClass} from '@angular/common';

@Component({
  selector: 'bs-search',
  imports: [
    NgClass
  ],
  templateUrl: './search.component.html',
  styles: ``
})
export class SearchComponent implements OnInit{
  keyup = new EventEmitter<string>();
  foundBooks: Book[] = [];
  isLoading = false;
  bookSelected = output<Book>();
  constructor(private bs: BookStoreService) {
  }
  ngOnInit() {
    this.keyup.pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .pipe(tap(()=> this.isLoading = true))
      .pipe(switchMap(searchTerm => this.bs.getAllSearch(searchTerm)))
      .pipe(tap(()=> this.isLoading = false))
      .subscribe(books => {
        console.log(books);
        this.foundBooks = books;
      })
  }
}
