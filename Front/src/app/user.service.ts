// src/app/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3001/api/user';
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  isLoggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getSingleUser(identifier: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/me`);
}


  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, userData);
  }

  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        // Assuming your server sends a token upon successful login
        // @ts-ignore
        const token = response.token;

        localStorage.setItem('token', token);
        this.loggedIn.next(true);
      })
    );
  }


  logoutUser(): void {
    // Clear the stored token
    localStorage.removeItem('token');

    // Update the loggedIn subject to notify subscribers
    this.loggedIn.next(false);
  }
}
