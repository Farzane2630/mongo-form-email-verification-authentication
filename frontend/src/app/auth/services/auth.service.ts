import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../../shared/Types";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  api_url = environment.API_AUTH_URL;

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<any> {
    return this.http.post(`${this.api_url}/register`, user);
  }
  verifyEmail(code: string): Observable<any> {
    return this.http.post(`${this.api_url}/verify-email`, { code });
  }
  loginUser(user: User): Observable<any> {
    return this.http.post(`${this.api_url}/login`, user).pipe(
      tap((response: any) => {
        if (response.user) {
          // to saty logged in after refresh
          localStorage.setItem("token", response.user.token);
        }
      })
    );
  }

  recoverPassword(email: string): Observable<any> {
    return this.http.post(`${this.api_url}/forgot-password`, email);
  }

  resetPassword({
    password,
    token,
  }: {
    password: string;
    token: string;
  }): Observable<any> {
    return this.http.post(`${this.api_url}/reset-password/${token}`, {
      password,
    });
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.api_url}/check-auth`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  }

  logoutUser(): void {
    localStorage.removeItem("token");
  }

  isUserLoggedIn() {
    const token = localStorage.getItem("token");

    return !!token;
  }

  editProfile(formData: FormData): Observable<any> {
    return this.http.post(`${this.api_url}/edit-profile`, formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  }
}
