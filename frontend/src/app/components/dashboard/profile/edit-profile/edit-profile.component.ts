import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AvatarComponent } from "./avatar/avatar.component";

@Component({
  selector: "app-edit-profile",
  imports: [ReactiveFormsModule, AvatarComponent],
  templateUrl: "./edit-profile.component.html",
  styleUrl: "./edit-profile.component.scss",
})
export class EditProfileComponent {
  infoForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    mobile: new FormControl("", [
      Validators.required,
      Validators.pattern(
        "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
      ),
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmedPassword: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  submitForm() {
    if (
      this.infoForm.value.password === this.infoForm.value.confirmedPassword
    ) {
      console.log(this.infoForm.value);
    } else {
      alert("password is not idetical!");
    }
  }
}
