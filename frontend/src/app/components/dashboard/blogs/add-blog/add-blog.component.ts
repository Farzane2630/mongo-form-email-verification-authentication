import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-add-blog",
  imports: [],
  templateUrl: "./add-blog.component.html",
  styleUrl: "./add-blog.component.scss",
})
export class AddBlogComponent {
  @Input() style: string = "visibility: hidden";
  @Output() clickHandler = new EventEmitter();

  closeModal() {
    this.clickHandler.emit();
  }
}
