import { Component } from '@angular/core';
import { ProfileComponent } from "./profile/profile.component";
import { DashboardMenuComponent } from "./dashboard-menu/dashboard-menu.component";

@Component({
  selector: 'app-sidebar',
  imports: [ProfileComponent, DashboardMenuComponent],
  templateUrl: './sidebar.component.html',
  // styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
