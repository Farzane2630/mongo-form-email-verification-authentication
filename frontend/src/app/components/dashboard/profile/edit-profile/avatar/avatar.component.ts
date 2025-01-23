import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-avatar",
  imports: [MatIconModule],
  templateUrl: "./avatar.component.html",
  styleUrl: "./avatar.component.scss",
})
export class AvatarComponent {
  avatar: string = "";
  backgroundImage: string = "";
  onFileChange(event: any) {
    const files: any = event?.target.files as FileList;

    if (files.length) {
      const _file = URL.createObjectURL(files[0]);
      this.avatar = _file;
      this.backgroundImage = "backgroundImage: url(" + this.avatar + ")";

      // this.resetInput();
    }
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
