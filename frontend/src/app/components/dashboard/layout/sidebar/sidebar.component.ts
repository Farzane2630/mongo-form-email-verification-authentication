import { Component } from "@angular/core";
import { ProfileCardComponent } from "./profile/profile.component";
import { DashboardMenuComponent } from "./dashboard-menu/dashboard-menu.component";

@Component({
  selector: "app-sidebar",
  imports: [DashboardMenuComponent, ProfileCardComponent],
  templateUrl: "./sidebar.component.html",
  // styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {}
