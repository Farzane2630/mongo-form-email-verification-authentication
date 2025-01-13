import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./pages/home/home.component").then(
        (mod) => mod.HomePageComponent
      ),
  },
  {
    path: "auth/register",
    loadComponent: () =>
      import("./auth/register/register.component").then(
        (mod) => mod.RegisterComponent
      ),
  },
  {
    path: "auth/login",
    loadComponent: () =>
      import("./auth/login/login.component").then((mod) => mod.LoginComponent),
  },
  {
    path: "auth/verify-email",
    loadComponent: () =>
      import("./auth/verify-email/verify-email.component").then(
        (mod) => mod.VerifyEmailComponent
      ),
  },
  {
    path: "auth/logout",
    loadComponent: () =>
      import("./auth/logout/logout.component").then(
        (mod) => mod.LogoutComponent
      ),
  },
  {
    path: "auth/forgot-password",
    loadComponent:()=> import("./auth/forgot-password/forgot-password.component").then(mod => mod.ForgotPasswordComponent)
  },
  {
    path: "auth/reset-password/:token",
    loadComponent:()=> import("./auth/reset-password/reset-password.component").then(mod => mod.ResetPasswordComponent)
  },
];
