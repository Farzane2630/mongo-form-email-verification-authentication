import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { User } from "../../shared/Types";
import { LogoComponent } from "../../shared/components/logo/logo.component";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-login",
  imports: [RouterLink, ReactiveFormsModule, LogoComponent],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    if (!this.authService.isUserLoggedIn()) {
      this.isLoading = true;
    }
    if (this.loginForm.valid) {
      const user: User = this.loginForm.value;
      this.authService.loginUser(user).subscribe({
        next: (result: any) => {
          alert(`Welcome back dear ${result.user.name}`);
          this.isLoading = false;
          this.router.navigate(["/"]);
        },
        error: (err) => {
          this.isLoading = false;
          alert(err.error);
        },
      });
    }
  }
}
