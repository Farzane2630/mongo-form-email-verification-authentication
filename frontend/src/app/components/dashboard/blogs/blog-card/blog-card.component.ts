import { Component, Input } from "@angular/core";
import { BadgeComponent } from "../../../../shared/components/badge/badge.component";
import { DatePipe, NgOptimizedImage } from "@angular/common";
import { Article } from "../../../../shared/Types";

@Component({
  selector: "app-blog-card",
  imports: [BadgeComponent, NgOptimizedImage, DatePipe],
  templateUrl: "./blog-card.component.html",
  styleUrl: "./blog-card.component.scss",
})
export class BlogCardComponent {
  @Input() blog!: Article;
}
