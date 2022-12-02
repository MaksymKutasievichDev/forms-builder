import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeQuotationMarks'
})
export class RemoveQuotationMarksPipe implements PipeTransform {

  transform(value: string): unknown {
    return value.slice(1, -1);
  }

}
