import { Component, OnInit } from "@angular/core";
import { SampleBtnComponent } from "../../../shared/components/btns/sample-btn/sample-btn.component";
import { BestStoryComponent } from "./best-story/best-story.component";
import { ArticleCardComponent } from "./article-card/article-card.component";
import { Article } from "../../../shared/Types";
import { ArticleService } from "../../../shared/services/article.service";
import { error } from "console";

@Component({
  selector: "app-stories-n-news",
  imports: [SampleBtnComponent, BestStoryComponent, ArticleCardComponent],
  templateUrl: "./stories-n-news.component.html",
  // styleUrl: './stories-n-news.component.scss'
})
export class StoriesNNewsComponent implements OnInit {
  articles!: Article[] 

  constructor(private articleService: ArticleService) {}

  getPosts() {
    this.articleService.getArticles(4).subscribe((res: any) => {
      this.articles = res.posts;
    })
  }
  ngOnInit(): void {
    
    this.getPosts();
  }
}
