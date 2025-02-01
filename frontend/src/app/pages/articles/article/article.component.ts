import { Component, OnInit } from "@angular/core";
import { ArticleService } from "../../../shared/services/article.service";
import { ActivatedRoute } from "@angular/router";
import { Article } from "../../../shared/Types";

@Component({
  selector: "app-article",
  imports: [],
  templateUrl: "./article.component.html",
  // styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit {
  blog!: Article;
  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.params["_id"];

    this.articleService
      .getArticle(id)
      .subscribe((res: any) => (this.blog = res.post));
  }
}
