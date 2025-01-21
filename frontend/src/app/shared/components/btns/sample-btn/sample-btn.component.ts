import { Component, Input, Output, EventEmitter } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-sample-btn",
  imports: [RouterLink],
  templateUrl: "./sample-btn.component.html",
  // styleUrl: './sample-btn.component.scss'
})
export class SampleBtnComponent {
  @Input() title: string = "";
  @Input() route: string = "";
  @Input() customClass: string = "";
  @Input() hasRoute: boolean= true;

  @Output() clickHandler = new EventEmitter();

  onClick() {
    this.clickHandler.emit();
  }
}
