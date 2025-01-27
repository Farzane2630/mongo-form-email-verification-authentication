import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AvatarComponent } from "./avatar/avatar.component";
import { environment } from "../../../../../environments/environment";
import { AuthService } from "../../../../auth/services/auth.service";
import { User } from "../../../../shared/Types";

@Component({
  selector: "app-edit-profile",
  imports: [ReactiveFormsModule, AvatarComponent],
  templateUrl: "./edit-profile.component.html",
  styleUrl: "./edit-profile.component.scss",
})
export class EditProfileComponent {
  user!: User;
  infoForm!: FormGroup;
  isLoading = false;
  // avatar
  avatar: any = null;
  backgroundImage = "";
  environment = environment.IMAGE_BASE_URL;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.authService.getUser().subscribe((res: any) => {
      this.user = res.user;
      // set default avatar image
      this.backgroundImage = `backgroundImage:url('${this.environment}/${this.user.avatar}')`;
      // set default value for profile info form
      this.infoForm = this.fb.group({
        name: [this.user?.name, [Validators.required, Validators.minLength(3)]],
        mobile: [
          this.user?.mobile,
          [
            Validators.required,
            Validators.pattern(
              "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
            ),
          ],
        ],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmedPassword: ["", [Validators.required, Validators.minLength(6)]],
        avatar: [this.user.avatar],
      });
    });
  }

  uploadAvatar(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.avatar = input.files[0];

      // set bg for avatar to see preview
      const bgUrl = URL.createObjectURL(input.files[0]);
      this.backgroundImage = `backgroundImage:url('${bgUrl}')`;
    }
  }

  submitForm() {
    if (
      this.infoForm.value.password === this.infoForm.value.confirmedPassword
    ) {
      this.isLoading = true;
      const formData = new FormData();
      formData.append("name", this.infoForm.get("name")?.value);
      formData.append("mobile", this.infoForm.get("mobile")?.value);
      formData.append("password", this.infoForm.get("password")?.value);
      if (this.avatar) {
        formData.append("avatar", this.avatar, this.avatar.name);
      }

      this.authService.editProfile(formData).subscribe({
        next: (res) => alert(res.message),
        error: (error) => alert(error),
      });
      this.isLoading = false;

      // to sync profile info in sidebar
      this.authService.getUser().subscribe();
      window.location.reload();
      this.backgroundImage = `backgroundImage:url('${this.environment}/${this.user.avatar}')`;
    } else {
      alert("password is not idetical!");
    }
  }
}
