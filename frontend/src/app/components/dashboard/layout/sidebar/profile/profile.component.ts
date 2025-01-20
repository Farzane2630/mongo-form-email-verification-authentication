import { NgOptimizedImage } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { User } from "../../../../../shared/Types";
import { AuthService } from "../../../../../auth/services/auth.service";

@Component({
  selector: "app-profile",
  imports: [NgOptimizedImage],
  templateUrl: "./profile.component.html",
  // styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user!: User;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.authService.getUser().subscribe({
        next: (res: any) => {
          this.user = res.user;
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
