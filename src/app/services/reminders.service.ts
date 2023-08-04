import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { IReminder } from '../interfaces/reminder';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RemindersService {
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

  createReminders(reminder: IReminder): Observable<any> {
    this.setOptions();
    return this.http.post(this.apiUrl + 'reminders/create/', reminder, this.httpOptions).pipe(
      map((data) => {
        return data;
      })
    )
  }

  getRemindersList(): Observable<any> {
    this.setOptions();
    return this.http.get(this.apiUrl + 'reminders/', this.httpOptions).pipe(
      map((data) => {
        return data;
      })
    )
  }

  updateReminder(reminder: IReminder, id: number): Observable<any> {
    this.setOptions();
    return this.http.put(this.apiUrl + `reminders/${id}/update/`, reminder, this.httpOptions).pipe(
      map((data) => {
        return data;
      })
    )
  }

  deleteReminder(id: number): Observable<any> {
    this.setOptions();
    return this.http.delete(this.apiUrl + `reminders/${id}/delete/`, this.httpOptions).pipe(
      map((data) => {
        return data;
      })
    )
  }

  deleteReminders(reminderIds): Observable<any> {
    this.setOptions();
    return this.http.post(this.apiUrl + 'reminders/delete/', { reminder_ids: reminderIds }, this.httpOptions).pipe(
      map((data) => {
        return data;
      })
    )
  }

}
