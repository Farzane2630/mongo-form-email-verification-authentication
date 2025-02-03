import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ArticleService } from "../../../../shared/services/article.service";
import { EditorComponent } from "../../../../shared/components/editor/editor.component";

@Component({
  selector: "app-add-blog",
  imports: [ReactiveFormsModule, EditorComponent],
  templateUrl: "./add-blog.component.html",
  styleUrl: "./add-blog.component.scss",
})
export class AddBlogComponent {
  @Input() style: string = "visibility: hidden";
  @Output() clickHandler = new EventEmitter();

  blogForm: FormGroup;
  content!: FormGroup;
  selectedImage: File | null = null;

  constructor(
    private articleService: ArticleService,
    private fb: FormBuilder
  ) {
    this.blogForm = this.fb.group({
      title: ["", Validators.required],
      category: ["", Validators.required],
      readingTime: ["", Validators.required],
      image: [null],
    });
    this.content = this.fb.group({
      content: ["", Validators.required],
    });
  }

  closeModal() {
    this.clickHandler.emit();
  }

  uploadFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    }
  }

  submitForm() {
    // console.log(this.content);
    
    if (this.blogForm.valid && this.content.valid) {
      const formData: any = new FormData();

      formData.append("title", this.blogForm.get("title")?.value);
      formData.append("category", this.blogForm.get("category")?.value);
      formData.append("body", this.content.get("content")?.value);
      formData.append("readingTime", this.blogForm.get("readingTime")?.value);
      if (this.selectedImage) {
        formData.append("image", this.selectedImage, this.selectedImage.name);

        this.articleService.postArticle(formData).subscribe({
          next: (res: any) => alert(res.message),
          error: (error: any) => alert(error.error.message),
        });
      }
      this.closeModal();
    } else {
      alert("Form is not valid!");
    }
  }
}
