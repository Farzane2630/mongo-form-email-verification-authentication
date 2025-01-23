import { Component, OnInit } from "@angular/core";
import { BlogCardComponent } from "../../../components/dashboard/blogs/blog-card/blog-card.component";
import { SampleBtnComponent } from "../../../shared/components/btns/sample-btn/sample-btn.component";
import { AddBlogComponent } from "../../../components/dashboard/blogs/add-blog/add-blog.component";
import { AuthService } from "../../../auth/services/auth.service";
import { Article } from "../../../shared/Types";

@Component({
  selector: "app-blogs",
  imports: [BlogCardComponent, SampleBtnComponent, AddBlogComponent],
  templateUrl: "./blogs.component.html",
  styleUrl: "./blogs.component.scss",
})
export class BlogsComponent implements OnInit {
  blogs: Article[] | [] = [];
  addBlogModalStyle: string = "visibility: hidden";
  showModal() {
    this.addBlogModalStyle = "visibility: visible";
  }
  closeModal() {
    this.addBlogModalStyle = "visibility: hidden";
  }

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((res: any) => {
      // console.log(res.user.posts);

      this.blogs = res.user.posts;
    });
  }
}
