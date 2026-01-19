import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = 'https://beta.vilcartapp.com/v2/api';

  constructor(private http: HttpClient) {}

  checkEmail(email: string, password: string) {
    return this.http.get<any>(
      `${this.baseUrl}/user/checkemail/${email}/${password}`
    );
  }

  sendOtp(email: string, password: string) {
    return this.http.post<any>(
      `${this.baseUrl}/userOtpCred/produceOtp`,
      { email, password }
    );
  }

  verifyOtp(payload: {
    userId: string;
    dcName: string;
    otp: string;
  }) {
    return this.http.post<any>(
      `${this.baseUrl}/userOtpCred/verifyOtpFunc`,
      payload
    ).pipe(
      tap((res: any) => {
        if (res?.user?.token) {
          localStorage.setItem('token', res.user.authToken);
          localStorage.setItem('user', JSON.stringify(res.user.user));
        }
      })
    );
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
