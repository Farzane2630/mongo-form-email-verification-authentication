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
    // image: new FormControl(null, [Validators.required]),
    readingTime: new FormControl("", [Validators.required]),
  });

  selectedFile: any = null;

  constructor(private articleService: ArticleService) {}

  onFileChange(event: Event) {
    
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
    }

    console.log(this.selectedFile);
  }
  
  publish() {
    const post: Article = {
        title: this.blogForm.value.title,
        category: this.blogForm.value.category,
        body: this.blogForm.value.content,
        image: this.selectedFile.name,
        readingTime: this.blogForm.value.readingTime,
      };

      console.log(post);
      
      
      // if (this.blogForm.valid) {
        // const formData = new FormData();
        // formData.append("title", this.blogForm.get("title")?.value);
        // formData.append("category", this.blogForm.get("category")?.value);
        // formData.append("content", this.blogForm.get("content")?.value);
        // formData.append("readingTime", this.blogForm.get("readingTime")?.value);
        
        // // Append the selected file
        // if (this.selectedFile) {
        //   formData.append("image", this.selectedFile, this.selectedFile.name);
        // }
        // console.log(this.blogForm);
    // }
    this.articleService.postArticle(post).subscribe({
      next: (res: any) => console.log(res),
      error: (error: any) => console.error(error),
    });
  }

  closeModal() {
    this.clickHandler.emit();
  }
}
