import { Component } from "@angular/core";
import { LogoComponent } from "../../shared/components/logo/logo.component";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-reset-password",
  imports: [LogoComponent, ReactiveFormsModule],
  templateUrl: "./reset-password.component.html",
  styleUrl: "./reset-password.component.scss",
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      this.strongPassword
    ]),
    repeatPassword: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      this.strongPassword
    ]),
  });

  strongPassword(control: FormControl): { [key: string]: boolean } | null {
    const hasUpperCase = /[A-Z]/.test(control.value);
    const hasLowerCase = /[a-z]/.test(control.value);
    const hasNumber = /\d/.test(control.value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);
    const isValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    return isValid ? null : { weakPassword: true };
  }

  isLoading = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  resetPassword() {
    this.isLoading = true;
    if (
      this.resetPasswordForm.value.newPassword ===
      this.resetPasswordForm.value.repeatPassword
    ) {
      if (this.resetPasswordForm.valid) {
        // get token from url params
        const token = this.route.snapshot.params["token"];
        if (token) {
          this.authService
            .resetPassword({
              password: this.resetPasswordForm.value.newPassword,
              token,
            })
            .subscribe({
              next: (res) => {
                alert(res.message);
                this.isLoading = false;
                this.router.navigate(["/auth/login"]);
              },
              error: (err) => {
                alert(err.error.message);
                this.isLoading = false;
              },
            });
        }
      }
    } else {
      alert("Passwords do not match");
    }
  }
}
