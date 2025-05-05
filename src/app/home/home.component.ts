import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {SearchComponent} from '../search/search.component';
import {Book} from '../shared/book';
import {SearchNewComponent} from '../search-new/search-new.component';

@Component({
  selector: 'bs-home',
  imports: [
    RouterLink,
    SearchComponent,
    SearchNewComponent
  ],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {

  constructor(private router : Router, private route:ActivatedRoute) {
  }

  bookSelected(book: Book) {
    this.router.navigate(['../books', book.isbn],
      {relativeTo: this.route}).then();
  }
}
