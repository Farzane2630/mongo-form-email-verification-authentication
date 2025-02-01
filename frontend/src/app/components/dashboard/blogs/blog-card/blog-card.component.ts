import { Component, Input } from "@angular/core";
import { BadgeComponent } from "../../../../shared/components/badge/badge.component";
import { DatePipe, NgOptimizedImage } from "@angular/common";
import { Article } from "../../../../shared/Types";
import { ArticleService } from "../../../../shared/services/article.service";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-blog-card",
  imports: [BadgeComponent, NgOptimizedImage, DatePipe, RouterLink],
  templateUrl: "./blog-card.component.html",
  styleUrl: "./blog-card.component.scss",
})
export class BlogCardComponent {
  @Input() blog!: Article;

  constructor(private articleService: ArticleService) {}

  edit(id: string | undefined) {}

  delete(id: string | undefined) {
    this.articleService.deleteArticle(id).subscribe({
      next: (res: any) => {
        alert(res.message);
        // that is not optimised!!!!
        window.location.reload()
      },
      error: (err) => console.log(err.error.message)
      ,
    });
  }
}
