import {BookStoreService} from './book-store.service';
import {map, Observable} from 'rxjs';
import {FormControl} from '@angular/forms';

export class BookValidators {

  static isbnFormat(control: FormControl): any {
    if(!control.value){ return null;}
    const isolatedDigits = control.value.replace(/-/g,'');
    const isbnPattern = /(^\d{10}$)|(^\d{13}$)/;
    return isbnPattern.test(isolatedDigits) ? null : {isbnFormat: {valid:false}};
  }
  static isbnExists(bs:BookStoreService){
    return function(control : FormControl): Observable<any>{
      return bs.check(control.value).pipe(map(exists=>!exists ? null : {isbnExists: {valid:false}}));
    }
  }
}
