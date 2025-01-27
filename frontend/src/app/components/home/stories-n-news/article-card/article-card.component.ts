import { DatePipe, NgOptimizedImage } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { Article } from "../../../../shared/Types";
import { AuthService } from "../../../../auth/services/auth.service";
import { Router, RouterLink } from "@angular/router";
import { ArticleService } from "../../../../shared/services/article.service";
import { LoadingComponent } from "../../../../shared/components/loading/loading.component";
import { environment } from "../../../../../environments/environment";

@Component({
  selector: "app-article-card",
  imports: [NgOptimizedImage, DatePipe, RouterLink, LoadingComponent],
  templateUrl: "./article-card.component.html",
  // styleUrl: './article-card.component.scss'
})
export class ArticleCardComponent implements OnInit {
  @Input() isSaved: boolean = false;
  isLoggedIn: boolean = false;
  @Input() article!: Article;
  savedPosts!: Article[];
  isLoading: boolean = false;
  env = environment.IMAGE_BASE_URL;
  imageUrl = "";

  constructor(
    private authService: AuthService,
    private articleService: ArticleService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.authService.getUser().subscribe((res) => {
      this.savedPosts = res.user.savedPosts;
      if (
        this.savedPosts.find((post: Article) => post._id === this.article._id)
      ) {
        this.isSaved = true;
      }
    });

    if (!this.article.image.includes("https")) {
      this.imageUrl = `${this.env}/${this.article.image}`;
    } else {
      this.imageUrl = this.article.image;
    }
  }
  saveBtnHandler(id: string | undefined) {
    this.isLoading = true;
    if (this.isLoggedIn) {
      this.articleService.saveArticle(id).subscribe({
        next: (res: any) => {
          if (res.isSaved) {
            this.isSaved = true;
          } else {
            this.isSaved = false;
          }
          this.isLoading = false;
        },
        error: (error: any) => alert(error.error.message),
      });
    } else {
      this.isLoading = false;
      alert("You are not loggedin. Please log in first.");
      this.router.navigate(["/auth/login"]);
    }
  }
}
