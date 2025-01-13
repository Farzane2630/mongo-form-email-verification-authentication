import { Component } from "@angular/core";
import { ToatsComponent } from "../../../../shared/components/toast/toast.component";


@Component({
  selector: "sunscribe-toast-message",
  templateUrl: "./message.component.html",
  imports: [ToatsComponent],
  standalone: true,
})
export class SubscribeToastMessageComponent {
  title = "Subscribed successfully ;)";
}