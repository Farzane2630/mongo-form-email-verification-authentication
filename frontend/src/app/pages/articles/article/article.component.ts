import { Component, OnInit } from "@angular/core";
import { ArticleService } from "../../../shared/services/article.service";
import { ActivatedRoute } from "@angular/router";
import { Article, User } from "../../../shared/Types";
import { DatePipe, NgOptimizedImage } from "@angular/common";
import { environment } from "../../../../environments/environment";
import { AuthService } from "../../../auth/services/auth.service";

@Component({
  selector: "app-article",
  imports: [NgOptimizedImage, DatePipe],
  templateUrl: "./article.component.html",
  // styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit {
  blog!: Article;
  env: string = environment.IMAGE_BASE_URL;
  imageUrl: string = "";
  user!: User;
  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.params["_id"];

    this.articleService.getArticle(id).subscribe((res: any) => {
      this.blog = res.post;
      this.imageUrl = `${this.env}/${res.post.image}`;
    });
    this.authService.getUser().subscribe((res: any) => (this.user = res.user));
  }
}
