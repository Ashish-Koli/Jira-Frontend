import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class JiraService {
  constructor(private http: HttpClient) {}
}
