import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environment/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'filePath',
  standalone: true,
})
export class FilePathPipe implements PipeTransform {
  uri = environment.apiBaseUrl;

  constructor(protected _sanitizer: DomSanitizer) {}

  transform(value: string | undefined): unknown {
    const res = value
      ? this.uri.replace('/api', '') + '/' + value.replace(/\\/g, '/')
      : '';

    /** https://stackoverflow.com/questions/37927657/img-unsafe-value-used-in-a-resource-url-context */
    return this._sanitizer.bypassSecurityTrustUrl(res);
  }
}
