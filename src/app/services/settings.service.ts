import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  apiUrl = environment.apiUrl;
  private httpOptions: any;
  private token = '';
  constructor(private http: HttpClient, private userService: UserService) {
  }

  setOptions() {
    this.token = this.userService.getToken();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Token ${this.token}`
      })
    };
  }

  setSettings(settings): Observable<any> {
    this.setOptions();
    return this.http.post(this.apiUrl + 'settings/set/', settings, this.httpOptions).pipe(
      map((data) => {
        return data;
      })
    )
  }

  getSettings(): Observable<any> {
    this.setOptions();
    return this.http.get(this.apiUrl + 'settings/', this.httpOptions).pipe(
      map((data) => {
        return data;
      })
    )
  }

}
