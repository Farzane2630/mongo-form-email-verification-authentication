import { Component, OnInit } from "@angular/core";
import { ArticleService } from "../../../shared/services/article.service";
import { Article } from "../../../shared/Types";
import { ArticleCardComponent } from "../../../components/home/stories-n-news/article-card/article-card.component";

@Component({
  selector: "app-all-articles",
  imports: [ArticleCardComponent],
  templateUrl: "./all-articles.component.html",
  // styleUrl: "./all-articles.component.scss",
})
export class AllArticlesComponent implements OnInit {
  articles!: Article[];
  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.articleService.getArticles(10).subscribe((res: any) => {
      this.articles = res.posts;
    });
  }
}
