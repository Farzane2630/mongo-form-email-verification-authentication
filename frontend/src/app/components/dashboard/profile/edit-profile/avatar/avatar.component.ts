import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-avatar",
  imports: [MatIconModule],
  templateUrl: "./avatar.component.html",
  styleUrl: "./avatar.component.scss",
})
export class AvatarComponent {
  @Input() avatar: string = "";
  @Input() backgroundImage: string = "";
  @Output() fileChange = new EventEmitter()
  onFileChange(event: any) {
    this.fileChange.emit(event)
    // const files: any = event?.target.files as FileList;

    // if (files.length) {
    //   const _file = URL.createObjectURL(files[0]);
    //   this.avatar = _file;
    //   this.backgroundImage = "backgroundImage: url(" + this.avatar + ")";

    //   console.log(this.avatar);
    // }
      
       this.resetInput();
  }

  resetInput() {
    const input = document.getElementById(
      "avatar-input-file"
    ) as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  }
}
