import { Component } from '@angular/core';
import { LogoComponent } from "../../shared/components/logo/logo.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-forgot-password",
  imports: [LogoComponent, ReactiveFormsModule],
  templateUrl: "./forgot-password.component.html",
  styleUrl: "./forgot-password.component.scss",
})
export class ForgotPasswordComponent {
  passwordRecoveryForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
  })

  isLoading = false;

  constructor(private authService: AuthService) {}

  recoverPassword() {
    if (this.passwordRecoveryForm.valid) {
      // console.log(this.passwordRecoveryForm.value);
      this.isLoading = true;
      this.authService.recoverPassword(this.passwordRecoveryForm.value).subscribe({
        next: (res) => {
          alert(res.message);
          this.isLoading = false;
        },
        error: (err) => {
          alert(err.error.message);
          this.isLoading = false;
        }
      })
    }
  }
}
