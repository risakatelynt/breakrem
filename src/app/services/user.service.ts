import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../interfaces/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  apiUrl = environment.apiUrl;

  username = '';
  token = '';
  loggedIn = false;
  private httpOptions: any;

  constructor(private http: HttpClient) {
  }

  setLoggedIn(message: boolean) {
    this.loggedIn = message;
    localStorage.setItem('loggedIn', JSON.stringify(this.loggedIn));
  }

  getLoggedIn() {
    const isLogged = localStorage.getItem('loggedIn');
    if (isLogged) {
      this.loggedIn = JSON.parse(isLogged);
    }
    return this.loggedIn;
  }

  setToken(message: string) {
    this.token = message;
    localStorage.setItem('token', this.token);
  }

  getToken() {
    let token = localStorage.getItem('token');
    if (token) {
      this.token = token;
    }
    return this.token;
  }

  deleteStorage(item) {
    localStorage.removeItem(item);
    this.loggedIn = false;
    this.token = '';
  }

  public login(user: IUser): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.apiUrl + 'login/', user, this.httpOptions).pipe(
      map((data) => {
        if (data && data['token']) {
          this.setToken(data['token']);
          this.setLoggedIn(true);
        }
        return data;
      })
    )
  }

  public signup(user: IUser): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.apiUrl + 'register/', user, this.httpOptions).pipe(
      map((data) => {
        if (data && data['token']) {
          this.setToken(data['token']);
          this.setLoggedIn(true);
        }
        return data;
      })
    )
  }

  setOptions() {
    let token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      this.token = token;
    }

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${this.token}`
      })
    };
  }

  setUserProfile(profile) {
    let token = localStorage.getItem('token');
    if (token) {
      this.token = token;
    }
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Token ${this.token}`
      })
    };
    return this.http.post(this.apiUrl + 'userprofile/add/', profile, this.httpOptions).pipe(
      map((data) => {
        return data;
      })
    )
  }

  getUserProfile() {
    let token = localStorage.getItem('token');
    if (token) {
      this.token = token;
    }
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Token ${this.token}`
      })
    };
    return this.http.get(this.apiUrl + 'userprofile/', this.httpOptions).pipe(
      map((data) => {
        return data;
      })
    )
  }

  logout() {
    this.setOptions();
    // Send a logout request to the Django backend
    const body = {};
    return this.http.post(this.apiUrl + 'logout/', body, this.httpOptions).pipe(
      map((data) => {
        return data;
      })
    )
  }
}

