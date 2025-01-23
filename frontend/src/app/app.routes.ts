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
    loadComponent: () =>
      import("./auth/forgot-password/forgot-password.component").then(
        (mod) => mod.ForgotPasswordComponent
      ),
  },
  {
    path: "auth/reset-password/:token",
    loadComponent: () =>
      import("./auth/reset-password/reset-password.component").then(
        (mod) => mod.ResetPasswordComponent
      ),
  },
  {
    path: "articles",
    loadComponent: () =>
      import("./pages/articles/articles/articles.component").then(
        (mod) => mod.ArticlesComponent
      ),
  },
  {
    path: "articles/:_id",
    loadComponent: () =>
      import("./pages/articles/article/article.component").then(
        (mod) => mod.ArticleComponent
      ),
  },
  {
    path: "dashboard",
    loadComponent: () =>
      import("./pages/dashboard/dashboard.component").then(
        (mod) => mod.DashboardPageComponent
      ),
    children: [
      {
        path: "",
        redirectTo: "blogs",
        pathMatch: "full",
      },
      {
        path: "blogs",
        loadComponent: () =>
          import("./pages/dashboard/blogs/blogs.component").then(
            (mod) => mod.BlogsComponent
          ),
      },
      {
        path: "me",
        loadComponent: () =>
          import("./pages/dashboard/profile/profile.component").then(
            (mod) => mod.ProfilePageComponent
          ),
      },
      {
        path: "saves",
        loadComponent: () =>
          import("./pages/dashboard/saves/saves.component").then(
            (mod) => mod.SavesComponent
          ),
      },
    ],
  },
];
