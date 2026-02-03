import { Component, Input } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  selector: 'app-otp-modal',
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './otp-modal.component.html'
})
export class OtpModalComponent {

  @Input() userId!: string;
  @Input() dcName!: string;

  otp = '';
  error = '';
  loading = false;

  constructor(
    private modalCtrl: ModalController,
    private auth: AuthService
  ) {}

  verify() {
    if (!this.otp || this.otp.length < 4) {
      this.error = 'Enter valid OTP';
      return;
    }

    this.loading = true;

    this.auth.verifyOtp({
      userId: this.userId,
      dcName: this.dcName,
      otp: this.otp
    }).subscribe({
      next: async (res) => {
        this.loading = false;
        //ADD: store auth data securely
        await this.auth.handleLoginSuccess(res);
        this.modalCtrl.dismiss({ verified: true });
      },
      error: () => {
        this.loading = false;
        this.error = 'Invalid OTP';
      }
    });
  }

  close() {
    this.modalCtrl.dismiss({ verified: false });
  }
}
