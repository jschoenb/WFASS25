import {Component, EventEmitter, input, Input, OnInit, output, Output, signal} from '@angular/core';
import {Book} from '../shared/book';
import {BookStoreService} from '../shared/book-store.service';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {DatePipe} from '@angular/common';
import {IsbnPipe} from '../shared/isbn.pipe';
import {AuthenticationService} from '../shared/authentication.service';

@Component({
  selector: 'bs-book-details',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    DatePipe,
    IsbnPipe
  ],
  templateUrl: './book-details.component.html',
  styles: ``
})
export class BookDetailsComponent implements OnInit{
    book = signal<Book|undefined>(undefined);
    constructor(private bs:BookStoreService,
                private route:ActivatedRoute,
                private router: Router,
                private toastr: ToastrService,
                public authService: AuthenticationService,
                ) {
    }

  removeBook() {
    if(this.book()){
      if(confirm('Buch wirklich löschen?')){
        this.bs.remove(this.book()!.isbn).subscribe(
          () => {
            this.toastr.success('Buch gelöscht',"KWM Bookstore");
            this.router.navigate(['../'],{relativeTo: this.route});
          },()=>{
            this.toastr.error('Buch konnte nicht gelöscht werden',"KWM Bookstore");
          }
        );
      }
    }
  }

   ngOnInit() {
      const params = this.route.snapshot.params;
      this.bs.getSingle(params['isbn']).subscribe(
        (b:Book) =>this.book.set(b)
      );
   }

  getRating(num:number){
    let a =[];
    for(let i=0; i<num; i++){
      a.push(i);
    }
    return a;
  }


}
