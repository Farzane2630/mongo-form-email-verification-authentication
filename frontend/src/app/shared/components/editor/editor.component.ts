import { Component} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule,AngularEditorConfig } from "@kolkov/angular-editor";
// import { AngularEditorConfig } from '@kolkov/angular-editor';


@Component({
  selector: "app-editor",
  imports: [ReactiveFormsModule, AngularEditorModule],
  templateUrl: "./editor.component.html",
  styleUrl: "./editor.component.scss",
})
export class EditorComponent {
  name = "Angular 6";
  htmlContent = "";

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "15rem",
    minHeight: "5rem",
    placeholder: "Enter text here...",
    translate: "no",
    defaultParagraphSeparator: "p",
    defaultFontName: "Arial",
    toolbarHiddenButtons: [["bold"]],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: "redText",
        class: "redText",
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
  };
}
