import { Component } from "@angular/core";
import { AuthService } from "../../../../../auth/services/auth.service";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-dashboard-menu",
  imports: [RouterLink, RouterLinkActive],
  templateUrl: "./dashboard-menu.component.html",
  styleUrl: "./dashboard-menu.component.scss",
})
export class DashboardMenuComponent {
  activeRoute: string = "blogs";
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.logoutUser();
    alert("You have been logged out");
    this.router.navigate(["/auth/login"]);
  }
}
