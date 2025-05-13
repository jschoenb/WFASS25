import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private api = "http://bookstore25.putz.kwmhgb.at/api/auth";
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
      return this.http.post(`${this.api}/login`, {email, password})
  }

  logout() {

  }

  public isLoggedIn(): boolean {
    return false;
  }
}
