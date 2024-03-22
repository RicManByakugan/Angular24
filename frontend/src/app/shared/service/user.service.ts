import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uri = 'http://localhost:8010/api/utilisateur';

  constructor(private http: HttpClient) { }

  // Recuperation de l'utilisateur actif
  getUserConnected(token: string): Observable<any> { 
    const headers = new HttpHeaders({
      'Authorization': token
    });
    return this.http.get<any>(this.uri + "/actif", { headers: headers });
  }

  // Connexion de l'utilisateur vers le backend
  loginUser(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.uri + "/connexion", {email: email, password: password});
  }



}
