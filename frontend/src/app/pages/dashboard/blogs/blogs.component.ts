import { Component } from '@angular/core';
import { BlogCardComponent } from "../../../components/dashboard/blogs/blog-card/blog-card.component";

@Component({
  selector: 'app-blogs',
  imports: [BlogCardComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent {

}
