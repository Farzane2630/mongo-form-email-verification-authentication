import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sample-btn',
  imports: [RouterLink],
  templateUrl: './sample-btn.component.html',
  // styleUrl: './sample-btn.component.scss'
})
export class SampleBtnComponent {
@Input() title: string = ""
@Input() route: string = ""
}
