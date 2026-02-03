import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppStorageService } from 'src/app/core/services/app-storage.service';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = 'http://localhost:5000/v2/api';

  constructor(
    private http: HttpClient,
    private storageService: AppStorageService
  ) {}

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
    )
  }

  async handleLoginSuccess(res: any) {
    if (!res?.user?.authToken) return;

    // Secure storage (tokens & sensitive data)
    await this.storageService.setSecure(
      'loggedInUser',
      JSON.stringify(res.user.user)
    );

    await this.storageService.setSecure(
      'token',
      res.user.authToken
    );

    await this.storageService.setSecure(
      'authToken',
      res.user.authToken
    );
  
    await this.storageService.setSecure(
      'refreshToken',
      res.user.refreshToken
    );
  
    await this.storageService.setSecure(
      'userId',
      res.user.user._id
    );
  
    // Non-sensitive data
    await this.storageService.set(
      'selectedDC',
      res.user.user.dcName
    );
  }

  async isLoggedIn() {
    const token = await this.storageService.getSecure('authToken');
    return !!token;
  }

  async logout() {
    await this.storageService.clearAll();
  }
  
}
