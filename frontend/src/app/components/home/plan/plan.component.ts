import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { SampleBtnComponent } from "../../../shared/components/btns/sample-btn/sample-btn.component";

@Component({
  selector: 'app-plan',
  imports: [NgOptimizedImage, SampleBtnComponent],
  templateUrl: './plan.component.html',
  // styleUrl: './plan.component.scss'
})
export class PlanComponent {

}
