import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  uri = `${environment.apiBaseUrl}/utilisateur`;
  token = localStorage.getItem('user') + ' ' + localStorage.getItem('token');
  headers = new HttpHeaders({
    Authorization: this.token,
  });

  constructor(private http: HttpClient) {}

  // Recuperation de l'utilisateur actif
  getUserConnected(): Observable<any> {
    return this.http.get<any>(this.uri + '/actif', { headers: this.headers });
  }

  // Connexion de l'utilisateur vers le backend
  loginUser(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.uri + '/connexion', {
      email: email,
      password: password,
    });
  }

  // Inscription d'un utilisateur vers le backend
  registerUser(
    nom: string,
    prenom: string,
    role: string,
    subject: string,
    email: string,
    password: string
  ): Observable<any> {
    return this.http.post<any>(this.uri + '/inscription', {
      nom: nom,
      prenom: prenom,
      role: role,
      subject: subject,
      email: email,
      password: password,
    });
  }
}
