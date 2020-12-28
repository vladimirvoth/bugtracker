import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectValue'
})
export class SelectValuePipe implements PipeTransform {
  transform(value: string, selectItems: Array<any>): unknown {
    const item = selectItems.find((item) => item.key === value);

    if (item && item.value) {
      return item.value;
    } else {
      return value;
    }
  }
}
