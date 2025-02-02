import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { User } from "../../shared/Types";
import { LogoComponent } from "../../shared/components/logo/logo.component";

import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-register",
  imports: [RouterLink, ReactiveFormsModule, LogoComponent],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(4)]),
    email: new FormControl("", [
      Validators.required,
      Validators.email,
      Validators.pattern("[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+"),
    ]),
    mobile: new FormControl("", [
      Validators.required,
      Validators.pattern(
        "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
      ),
    ]),
    password: new FormControl("", [
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
    private router: Router
  ) {}

  register() {
    this.isLoading = true;
    if (this.registerForm.valid) {
      const userInfo: User = this.registerForm.value;

      this.authService.registerUser(userInfo).subscribe({
        next: (res) => {
          // console.log(res.user);

          alert(res.message);
          this.router.navigate(["/auth/verify-email"]);
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          alert(err.error.message);
        },
      });
    }
  }
}
