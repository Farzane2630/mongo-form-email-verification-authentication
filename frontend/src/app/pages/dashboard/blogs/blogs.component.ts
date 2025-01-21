import { Component } from "@angular/core";
import { BlogCardComponent } from "../../../components/dashboard/blogs/blog-card/blog-card.component";
import { SampleBtnComponent } from "../../../shared/components/btns/sample-btn/sample-btn.component";
import { AddBlogComponent } from "../../../components/dashboard/blogs/add-blog/add-blog.component";

@Component({
  selector: "app-blogs",
  imports: [BlogCardComponent, SampleBtnComponent, AddBlogComponent],
  templateUrl: "./blogs.component.html",
  styleUrl: "./blogs.component.scss",
})
export class BlogsComponent {
  addBlogModalStyle: string = "visibility: hidden";
  showModal() {
    this.addBlogModalStyle = "visibility: visible";
  }
  closeModal() {
    this.addBlogModalStyle = "visibility: hidden";
  }
}
