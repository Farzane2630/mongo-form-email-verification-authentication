import { Component, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ToatsComponent } from "../../../shared/components/toast/toast.component";
import { SubscribeToastMessageComponent } from "./message/message.component";

@Component({
  selector: "app-newsletter",
  imports: [ReactiveFormsModule],
  templateUrl: "./newsletter.component.html",
  // styleUrl: './newsletter.component.scss'
})
export class NewsletterComponent {
  newSubscriber: FormGroup = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.email,
      Validators.minLength(6),
    ]),
  });

  private _snackBar = inject(MatSnackBar);

  durationInSeconds = 5;

  openSnackBar() {
  }
  
  subscribe() {
    if (this.newSubscriber.valid) {
      this._snackBar.openFromComponent(SubscribeToastMessageComponent, {
        duration: this.durationInSeconds * 1000,
      });
      this.newSubscriber.reset();
    }
  }
}
