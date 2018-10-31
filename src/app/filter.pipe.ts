import { Pipe, PipeTransform } from '@angular/core';
import { Post } from './post';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(arr: Post[], filter: number): Post[] {

    if (arr && arr.length && filter && filter !== 0) {
      return arr.filter( post => post.userId === filter);
    } else {
      return arr;
    }
  }
}
