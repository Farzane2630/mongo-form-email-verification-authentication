import { NgOptimizedImage } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { User } from "../../../../../shared/Types";
import { AuthService } from "../../../../../auth/services/auth.service";
import { environment } from "../../../../../../environments/environment";

@Component({
  selector: "app-profile-card",
  imports: [NgOptimizedImage],
  templateUrl: "./profile.component.html",
  // styleUrl: './profile.component.scss'
})
export class ProfileCardComponent implements OnInit {
  user!: User;
  avatarApi: string = environment.IMAGE_BASE_URL;
  avatarUrl!: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.authService.getUser().subscribe({
        next: (res: any) => {
          this.user = res.user;
          this.avatarUrl = res.user.avatar
            ? `${this.avatarApi}/${res.user.avatar}` // Use absolute URL
            : "";
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
