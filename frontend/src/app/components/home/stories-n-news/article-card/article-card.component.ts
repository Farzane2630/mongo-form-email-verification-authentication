import { DatePipe, NgOptimizedImage } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { Article } from "../../../../shared/Types";
import { AuthService } from "../../../../auth/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-article-card",
  imports: [NgOptimizedImage, DatePipe],
  templateUrl: "./article-card.component.html",
  // styleUrl: './article-card.component.scss'
})
export class ArticleCardComponent implements OnInit {
  isPicked: boolean = false;
  isLoggedIn: boolean = false;
  @Input() article!: Article;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isUserLoggedIn();
  }
  saveBtnHandler(id: number) {
    if (this.isLoggedIn) {
      if (!this.isPicked) {
        this.isPicked = true;
      } else {
        this.isPicked = false;
      }
    } else {
      alert("You are not loggedin. Please log in first.");
      this.router.navigate(["/auth/login"]);
    }
  }
}
