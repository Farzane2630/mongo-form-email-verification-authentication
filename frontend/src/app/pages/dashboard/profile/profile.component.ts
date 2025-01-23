import { Component } from "@angular/core";
import { ProfileComponent } from "../../../components/dashboard/profile/profile.component";

@Component({
  selector: "app-profile-page",
  imports: [ProfileComponent],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.scss",
})
export class ProfilePageComponent {}
