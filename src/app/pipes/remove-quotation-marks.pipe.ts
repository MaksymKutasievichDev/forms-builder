import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeQuotationMarks'
})
export class RemoveQuotationMarksPipe implements PipeTransform {

  transform(value: string): string {
    if(value && value.length > 2) {
        return value.slice(1, -1);
    }
    return value
  }

}
