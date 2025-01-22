import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ArticleService } from "../../../../shared/services/article.service";
import { Article } from "../../../../shared/Types";
import { error } from "console";

@Component({
  selector: "app-add-blog",
  imports: [ReactiveFormsModule],
  templateUrl: "./add-blog.component.html",
  styleUrl: "./add-blog.component.scss",
})
export class AddBlogComponent {
  @Input() style: string = "visibility: hidden";
  @Output() clickHandler = new EventEmitter();

  blogForm: FormGroup = new FormGroup({
    title: new FormControl("", [Validators.required, Validators.minLength(4)]),
    category: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
    ]),
    content: new FormControl("", [
      Validators.required,
      Validators.minLength(50),
    ]),
    image: new FormControl("", [Validators.required]),
    readingTime: new FormControl("", [Validators.required]),
  });

  constructor(private articleService: ArticleService) {}

  publish() {
    const post: Article = {
      title: this.blogForm.value.title,
      category: this.blogForm.value.category,
      body: this.blogForm.value.content,
      image: this.blogForm.value.image,
      readingTime: this.blogForm.value.readingTime,
    };
    this.articleService.postArticle(post).subscribe({
      next: (res: any) => console.log(res),
      error: (error: any) => console.error(error),
    });
  }

  closeModal() {
    this.clickHandler.emit();
  }
}
