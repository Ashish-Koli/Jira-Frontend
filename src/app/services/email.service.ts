import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Email } from '../dto/project';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient) {}

  sendEmail(email:Email): Observable<void> {
    return this.http.post<void>(`http://localhost:8080/email`, email);
  }

 
}
