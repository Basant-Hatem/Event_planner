import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: User | null = null;

  login(email: string, password: string): Observable<User> {
    this.currentUser = { email, token: 'dummy-token' };
    return of(this.currentUser);
  }

  register(user: User): Observable<User> {
    this.currentUser = user;
    return of(this.currentUser);
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  logout(): void {
    this.currentUser = null;
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }
}
