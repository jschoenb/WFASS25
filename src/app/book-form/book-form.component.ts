import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {BookStoreService} from '../shared/book-store.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BookFactory} from '../shared/book-factory';
import {BookFormErrorMessages} from './book-form-error-messages';

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
  images : FormArray;
  errors:{[key:string]:string} ={};

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
      title: [this.book.title,Validators.required],
      subtitle: this.book.subtitle,
      isbn: [this.book.isbn,[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13)
      ]],
      description: this.book.description,
      rating: [this.book.rating,[
        Validators.min(0),
        Validators.max(10)
      ]],
      published : [new Date(this.book.published).toISOString().split('T')[0],Validators.required],
      images: this.images,
    })
    this.bookForm.statusChanges.subscribe(()=>{
      this.updateErrorMessages();
    })
  }

  private buildThumbnailArray() {
    if(this.book.images){
      this.images = this.fb.array([]);
      for(let img of this.book.images){
        this.images.push(this.fb.group({
          url: [img.url,Validators.required],
          title: [img.title,Validators.required],
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

  updateErrorMessages(){
    this.errors = {};
    for(const message of BookFormErrorMessages){
      const control = this.bookForm.get(message.forControl);
      if(control && control.dirty && control.invalid && control.errors &&
      control.errors[message.forValidator] && !control.errors[message.forControl]){
        this.errors[message.forControl] = message.text;
      }
    }
  }
}
