import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environment/environment';

@Pipe({
  name: 'filePath',
  standalone: true,
})
export class FilePathPipe implements PipeTransform {
  uri = environment.imageHost;
  // uri = 'http://localhost:3000/';
  // uri = "https://angularmbdsmadagascar2024.onrender.com/";

  transform(value: string | undefined): unknown {
    return value
      ? (this.uri ? this.uri.replace('/api', '') + '/' : '') +
          value.replace(/\\/g, '/')
      : '';
  }
}
