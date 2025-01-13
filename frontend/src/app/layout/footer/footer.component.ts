import { Component, computed, inject } from "@angular/core";
import { FollowUsComponent } from "./follow-us/follow-us.component";
import { PolicyComponent } from "./policy/policy.component";
import { NewsletterComponent } from "./newsletter/newsletter.component";
import { LogoComponent } from "../../shared/components/logo/logo.component";
import { TopDestinationsComponent } from "./top-destinations/top-destinations.component";
import { TravelInterestsComponent } from "./travel-interests/travel-interests.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { ShopLinksComponent } from "./shop/shop.component";
import { ResponsiveService } from "../../shared/services/responsive.service";

@Component({
  selector: "app-footer",
  imports: [
    FollowUsComponent,
    PolicyComponent,
    NewsletterComponent,
    LogoComponent,
    TopDestinationsComponent,
    TravelInterestsComponent,
    AboutUsComponent,
    ShopLinksComponent,
  ],
  templateUrl: "./footer.component.html",
  // styleUrl: './footer.component.scss'
})
export class FooterComponent {
  responsiveService = inject(ResponsiveService);
  isMobile = computed(() => {
    if (this.responsiveService.smallWidth()) {
      return true;
    }
    return false;
  });
}
