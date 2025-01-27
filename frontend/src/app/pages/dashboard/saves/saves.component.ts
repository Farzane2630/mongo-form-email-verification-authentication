import { Component, OnInit } from "@angular/core";
import { ArticleService } from "../../../shared/services/article.service";
import { Article } from "../../../shared/Types";
import { AuthService } from "../../../auth/services/auth.service";
import { ArticleCardComponent } from "../../../components/home/stories-n-news/article-card/article-card.component";

@Component({
  selector: "app-saves",
  imports: [ArticleCardComponent],
  templateUrl: "./saves.component.html",
  styleUrl: "./saves.component.scss",
})
export class SavesComponent implements OnInit {
  savedPosts!: Article[];
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService
      .getUser()
      .subscribe((res: any) => (this.savedPosts = res.user.savedPosts));
  }
}
