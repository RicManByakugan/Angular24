import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  uri = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // tslint:disable-next-line: no-any
  upload(files: File[]): Observable<any> {
    const formData = new FormData();

    for (const file of files) {
      file.name
        ? formData.append('file', file, `${file.name.split('.').pop()}`)
        : formData.append('paths', file);
    }
    return this.http.post(`${this.uri}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
      observe: 'events',
    });
  }

  delete(fileName: string): Observable<string> {
    return this.http
      .delete(`${this.uri}/upload/${fileName}`)
      .pipe(map((response) => response as string));
  }
}
