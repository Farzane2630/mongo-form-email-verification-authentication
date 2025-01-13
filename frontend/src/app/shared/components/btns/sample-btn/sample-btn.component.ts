import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sample-btn',
  imports: [],
  templateUrl: './sample-btn.component.html',
  // styleUrl: './sample-btn.component.scss'
})
export class SampleBtnComponent {
@Input() title: string = ""
}
