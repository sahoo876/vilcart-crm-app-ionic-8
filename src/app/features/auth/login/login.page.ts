import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { OtpModalComponent } from '../otp/otp-modal.component';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  loading = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  async submit() {
    if (this.form.invalid) {
      this.errorMsg = 'Enter valid email and password';
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    const { email, password } = this.form.value;

    this.auth.checkEmail(email!, password!).subscribe({
      next: async (res) => {

        this.loading = false;

        if (!res || !res._id) {
          this.errorMsg = 'Invalid credentials';
          return;
        }

        // Send OTP
        this.auth.sendOtp(email!, password!).subscribe(async () => {

          // Open OTP popup
          const modal = await this.modalCtrl.create({
            component: OtpModalComponent,
            componentProps: {
              userId: res._id,
              dcName: res.dcName
            }
          });

          await modal.present();

          const { data } = await modal.onWillDismiss();

          if (data?.verified) {
            this.router.navigate(['/customers']);
          }

        });
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'Login failed';
      }
    });
  }
}
