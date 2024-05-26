import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { User } from '../../interfaces/user.interface';

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

  // Mot de passe oublié vers le backend
  forgotUser(email: string): Observable<any> {
    return this.http.post<any>(this.uri + '/mdpoulbie', {
      email: email,
    });
  }

  // Réenvoye le code utilisateur vers le backend
  resendUser(email: string): Observable<any> {
    return this.http.post<any>(this.uri + '/resend', {
      email: email,
    });
  }

  // Verification via code vers le backend
  codeUser(email: string, code: number): Observable<any> {
    return this.http.post<any>(this.uri + '/mdpoulbieVerification', {
      email: email,
      code: code,
    });
  }

  // Reset mot de passe vers le backend
  resetUser(email: string, newPassword: string): Observable<any> {
    return this.http.post<any>(this.uri + '/resetpass', {
      email: email,
      newPassword: newPassword,
    });
  }

  // Inscription d'un utilisateur vers le backend
  registerUser(
    firstName: string,
    lastName: string,
    role: string,
    subject: string,
    email: string,
    password: string
  ): Observable<any> {
    return this.http.post<User>(this.uri + '/inscription', {
      firstName,
      lastName,
      role,
      subject,
      email,
      password,
    });
  }
}
