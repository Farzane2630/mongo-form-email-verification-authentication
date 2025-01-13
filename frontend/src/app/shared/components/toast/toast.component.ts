import { Component, Input } from "@angular/core";

@Component({
  selector: "app-toast",
  templateUrl: "./toast.component.html",
  styles: `
    .toast{
      color: bg-blue-500;
    }
  `,
})
export class ToatsComponent {
  @Input() title: string = ''
}
