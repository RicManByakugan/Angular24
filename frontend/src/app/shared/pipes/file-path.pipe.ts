import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filePath',
  standalone: true,
})
export class FilePathPipe implements PipeTransform {
  uri = 'http://localhost:3000/';
  // uri = "https://angularmbdsmadagascar2024.onrender.com/";

  transform(value: string | undefined): unknown {
    return value ? this.uri + value.replace(/\\/g, '/') : '';
  }
}
