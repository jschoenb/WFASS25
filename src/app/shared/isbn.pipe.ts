import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isbn'
})
export class IsbnPipe implements PipeTransform {

  transform(value: string, addPrefix:boolean, ...args: unknown[]): string | unknown {
    if(!value || value.length !== 10 && value.length !== 13){
      return null;
    }
    let prefix = '';
    if(addPrefix){
      prefix = value.length === 10 ? 'ISBN-10: ' : 'ISBN-13: ';
    }
    if(value.length==10){
      return prefix + value;
    } else {
      return `${prefix}${value.substring(0,3)}-${value.substring(3)}`
    }
  }

}
