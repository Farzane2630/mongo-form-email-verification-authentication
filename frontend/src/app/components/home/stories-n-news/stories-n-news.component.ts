import { Component } from "@angular/core";
import { SampleBtnComponent } from "../../../shared/components/btns/sample-btn/sample-btn.component";
import { BestStoryComponent } from "./best-story/best-story.component";
import { ArticleCardComponent } from "./article-card/article-card.component";
import { Article } from "../../../shared/Types";

@Component({
  selector: "app-stories-n-news",
  imports: [SampleBtnComponent, BestStoryComponent, ArticleCardComponent],
  templateUrl: "./stories-n-news.component.html",
  // styleUrl: './stories-n-news.component.scss'
})
export class StoriesNNewsComponent {
  articles: Article[] = [
    {
      id: 1,
      category: "Travel guide",
      title: " A first-time guide to Mallorca",
      publish_date: new Date(),
      reading_time: 10,
      img_src: "images/article-1.jpg",
    },
    {
      id: 2,
      category: "Travel guide",
      title: " A first-time guide to Mallorca",
      publish_date: new Date(),
      reading_time: 10,
      img_src: "images/article-1.jpg",
    },
    {
      id: 3,
      category: "Travel guide",
      title: " A first-time guide to Mallorca",
      publish_date: new Date(),
      reading_time: 10,
      img_src: "images/article-1.jpg",
    },
    {
      id: 4,
      category: "Travel guide",
      title: " A first-time guide to Mallorca",
      publish_date: new Date(),
      reading_time: 10,
      img_src: "images/article-1.jpg",
    }
  ];
}
