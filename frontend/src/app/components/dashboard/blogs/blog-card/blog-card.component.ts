import { Component } from '@angular/core';
import { BadgeComponent } from "../../../../shared/components/badge/badge.component";
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-blog-card',
  imports: [BadgeComponent, NgOptimizedImage],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss'
})
export class BlogCardComponent {

}
