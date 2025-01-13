import { NgOptimizedImage } from "@angular/common";
import { Component, computed, inject } from "@angular/core";
import { ResponsiveService } from "../../../../shared/services/responsive.service";

@Component({
  selector: "app-best-story",
  imports: [NgOptimizedImage],
  templateUrl: "./best-story.component.html",
  // styleUrl: './best-story.component.scss'
})
export class BestStoryComponent {
  responsiveService = inject(ResponsiveService);

  isMobile = computed(() => {
    if (this.responsiveService.smallWidth()) {
      return false;
    }
    return true;
  });
}
