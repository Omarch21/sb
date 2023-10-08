import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  authState,
  createUserWithEmailAndPassword,
  updateProfile,
  UserInfo,
  UserCredential,
} from '@angular/fire/auth';
import { concatMap, from, map, Observable, of, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) {}

  signUp(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout(): Observable<any> {
    return from(this.auth.signOut());
  }

  getUserRole(user: any): Observable<string> {
    // Here, you can add your logic to get the user's role based on their uid or any other attribute.
    // For now, let's assume that all users are not admin except for one with email "admin@example.com".
    const isAdmin = user.email === "carlos@gmail.com";
    return of(isAdmin ? "admin" : "user");
  }
}