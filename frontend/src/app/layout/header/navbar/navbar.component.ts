import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ResponsiveService } from '../../../shared/services/responsive.service';

@Component({
  selector: "app-navbar",
  imports: [RouterLink],
  templateUrl: "./navbar.component.html",
  // styleUrl: "./navbar.component.css",
})
export class NavbarComponent {

  responsiveService = inject(ResponsiveService);

  display = computed(() => {
    if (this.responsiveService.largeWidth()) {
      return "block";
    }

    return "none";
  });
}
