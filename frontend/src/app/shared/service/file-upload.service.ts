import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  uri = environment.apiBaseUrl;
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

  downloadFile(filename: string): void {
    this.http
      .get(`${this.uri}/upload/download/${filename}`, {
        headers: this.headers,
        responseType: 'blob',
      })
      .subscribe(
        (blob: Blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        },
        (error) => {
          console.error('Error downloading file:', error);
        }
      );
  }
}
