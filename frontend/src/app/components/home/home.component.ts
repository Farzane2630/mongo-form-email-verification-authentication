import { Component } from '@angular/core';
import { HeroComponent } from "./hero/hero.component";
import { PlanComponent } from "./plan/plan.component";
import { StoriesNNewsComponent } from "./stories-n-news/stories-n-news.component";

@Component({
  selector: 'app-home',
  imports: [HeroComponent, PlanComponent, StoriesNNewsComponent],
  templateUrl: './home.component.html',
  // styleUrl: './home.component.scss'
})
export class HomeComponent {

}
