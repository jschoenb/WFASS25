import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {BookStoreService} from '../shared/book-store.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BookFactory} from '../shared/book-factory';

@Component({
  selector: 'bs-book-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './book-form.component.html',
  styles: ``
})
export class BookFormComponent implements OnInit {
  bookForm : FormGroup;
  isUpdatingBook : boolean = false;
  book = BookFactory.empty();
  images : FormArray

  constructor(private fb:FormBuilder,private bs:BookStoreService,
              private route:ActivatedRoute, private router:Router) {
    this.bookForm = this.fb.group({});
    this.images = this.fb.array([]);
  }

  ngOnInit() {
    const isbn = this.route.snapshot.params["isbn"];
    if(isbn){ // book update
      this.isUpdatingBook = true;
      this.bs.getSingle(isbn).subscribe(book =>{
          this.book = book;
          this.initBook();
      });
    }
    this.initBook();
  }

  initBook(){
    this.buildThumbnailArray();
    this.bookForm = this.fb.group({
      id: this.book.id,
      title: this.book.title,
      subtitle: this.book.subtitle,
      isbn: this.book.isbn,
      description: this.book.description,
      rating: this.book.rating,
      published : new Date(this.book.published).toISOString().split('T')[0],
      images: this.images,
    })
  }

  private buildThumbnailArray() {
    if(this.book.images){
      this.images = this.fb.array([]);
      for(let img of this.book.images){
        this.images.push(this.fb.group({
          url: img.url,
          title: img.title,
          id: img.id
        }));
      }
      //for new book
      if(this.book.images.length == 0){
        this.addThumbnailControl();
      }
    }
  }

  addThumbnailControl() {
    this.images.push(this.fb.group({url: '', title: '', id: 0}));
  }
}
