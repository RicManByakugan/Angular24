import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  uri = 'http://localhost:3000/api';
  token = localStorage.getItem('user') + ' ' + localStorage.getItem('token');
  headers = new HttpHeaders({
    Authorization: this.token,
  });

  constructor(private http: HttpClient) {}

  // tslint:disable-next-line: no-any
  upload(files: File[]): Observable<any> {
    const formData = new FormData();

    for (const file of files) {
      formData.append('files', file, `${file.name}`);
    }
    return this.http.post(`${this.uri}/upload`, formData, {
      headers: this.headers,
      reportProgress: true,
      responseType: 'json',
      observe: 'events',
    });
  }

  delete(fileName: string): Observable<string> {
    return this.http
      .delete(`${this.uri}/upload/${fileName}`, { headers: this.headers })
      .pipe(map((response) => response as string));
  }
}
