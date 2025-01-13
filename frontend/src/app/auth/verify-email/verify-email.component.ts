import { CommonModule } from "@angular/common";
import { Component, ElementRef, QueryList, ViewChildren } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-verify-email",
  templateUrl: "./verify-email.component.html",
  styleUrls: ["./verify-email.component.scss"],
  imports: [ReactiveFormsModule, CommonModule],
})
export class VerifyEmailComponent {
  codeForm: FormGroup;
  @ViewChildren("codeInput") codeInputs!: QueryList<ElementRef>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    // Initialize the form with 6 controls
    this.codeForm = this.fb.group({
      code1: ["", [Validators.required, Validators.maxLength(1)]],
      code2: ["", [Validators.required, Validators.maxLength(1)]],
      code3: ["", [Validators.required, Validators.maxLength(1)]],
      code4: ["", [Validators.required, Validators.maxLength(1)]],
      code5: ["", [Validators.required, Validators.maxLength(1)]],
      code6: ["", [Validators.required, Validators.maxLength(1)]],
    });
  }

  get codeFormKeys() {
    return Object.keys(this.codeForm.controls);
  }

  handleChange(index: number, event: any): void {
    const value = event.target.value;

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      pastedCode.forEach((digit: string, i: number) => {
        if (this.codeFormKeys[i]) {
          this.codeForm.get(this.codeFormKeys[i])?.setValue(digit);
        }
      });

      // Focus on the last non-empty input or the first empty one
      const lastFilledIndex: number = pastedCode.findIndex(
        (digit: string) => digit === ""
      );
      const focusIndex = lastFilledIndex >= 0 ? lastFilledIndex : 5;
      this.focusNextInput(focusIndex);
    } else {
      this.codeForm.get(`code${index + 1}`)?.setValue(value);

      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        this.focusNextInput(index + 1);
      }
    }
  }

  handlePaste(event: ClipboardEvent): void {
    // Prevent the default paste behavior
    event.preventDefault();

    const pastedData = event.clipboardData?.getData("text") || "";

    // Ensure the pasted data is a valid 6-digit number
    if (pastedData.length > 6 || !/^\d+$/.test(pastedData)) {
      return;
    }

    // Distribute the pasted value into each input field
    const pastedDigits = pastedData.split("");
    pastedDigits.forEach((digit, index) => {
      if (this.codeFormKeys[index]) {
        this.codeForm.get(this.codeFormKeys[index])?.setValue(digit);
      }
    });

    // Focus the next empty input or the last input
    const firstEmptyIndex = pastedDigits.findIndex(
      (_, index) => !this.codeForm.get(this.codeFormKeys[index])?.value
    );
    const focusIndex = firstEmptyIndex !== -1 ? firstEmptyIndex : 5;
    this.focusNextInput(focusIndex);
  }

  focusNextInput(index: number): void {
    this.codeInputs.toArray()[index]?.nativeElement.focus();
  }

  async handleSubmit(): Promise<void> {
    if (this.codeForm.valid) {
      const verificationCode = this.codeFormKeys
        .map((key) => this.codeForm.get(key)?.value)
        .join("");

      // Call your email verification service

      console.log("Verification Code:", verificationCode);
      this.authService.verifyEmail(verificationCode).subscribe({
        next: (res: any) => {
          this.router.navigate(["/auth/login"]);
          alert("Email verified successfully");
        },
        error: (err: any) => alert(err.error.message),
      });
    }
  }
}
