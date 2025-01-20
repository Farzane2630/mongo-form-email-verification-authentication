import { Component, computed, inject, OnInit } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { ResponsiveService } from "../../shared/services/responsive.service";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { NavbarComponent } from "./navbar/navbar.component";
import { AuthService } from "../../auth/services/auth.service";
@Component({
  selector: "app-header",
  imports: [NavbarComponent, RouterLink, FontAwesomeModule],
  templateUrl: "./header.component.html",
  // styleUrl: "./header.component.css",
})
export class HeaderComponent implements OnInit {
  menuIcon = faBars;
  isLoggedIn: boolean = false;
  responsiveService = inject(ResponsiveService);

  displayNav = computed(() => {
    if (this.responsiveService.largeWidth()) {
      return true;
    }
    return false;
  });

  hideActionTitles = computed(() => {
    if (this.responsiveService.smallWidth()) {
      return false;
    }
    return true;
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isUserLoggedIn();
  }

  saves(): void {
    if (!this.authService.isUserLoggedIn()) {
      alert("You must be logged in to view saved articles");
      this.router.navigate(["/auth/login"]);
    } else {
      this.router.navigate(["/dashboard/saves"]);
    }
  }
}
