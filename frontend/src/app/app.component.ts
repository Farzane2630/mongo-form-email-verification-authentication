import { Component } from "@angular/core";
import { NavigationStart, Router, RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: "./app.component.html",
  // styleUrl: './app.component.scss'
})
export class AppComponent {
  title = "travelhub";
  isAuthRoute: boolean = false;

  constructor(private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event["url"].includes("/auth")) {
          this.isAuthRoute = true;
        } else {
          this.isAuthRoute = false;
        }
      }
    });
  }
}
