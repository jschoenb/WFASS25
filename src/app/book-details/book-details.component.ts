import {Component, EventEmitter, input, Input, output, Output} from '@angular/core';
import {Book} from '../shared/book';

@Component({
  selector: 'bs-book-details',
  imports: [],
  templateUrl: './book-details.component.html',
  styles: ``
})
export class BookDetailsComponent {
  //@Input() book: Book | undefined;
  book = input.required<Book>();
  //@Output() showListEvent = new EventEmitter<any>();
  showListEvent = output<void>();

  showBookList() {
    this.showListEvent.emit();
  }

  getRating(num:number){
    let a =[];
    for(let i=0; i<num; i++){
      a.push(i);
    }
    return a;
  }

}
