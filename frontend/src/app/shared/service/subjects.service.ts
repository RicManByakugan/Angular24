import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggingService } from './logging.service';
import { Observable } from 'rxjs';
import { Subject } from '../../interfaces/subject.interface';

@Injectable({ providedIn: 'root' })
export class SubjectService {
  token = localStorage.getItem('user') + ' ' + localStorage.getItem('token');
  headers = new HttpHeaders({
    Authorization: this.token,
  });

  constructor(private http: HttpClient) {}

  uri = 'http://localhost:3000/api';
  // uri = "https://angularmbdsmadagascar2024.onrender.com/api/assignments";

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.uri}/subjects`, {
      headers: this.headers,
    });
  }

  getSubject(id: string): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.uri}/subject/` + id, {
      headers: this.headers,
    });
  }
}
