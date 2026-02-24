import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reactive-demo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reactive-demo.html',
  styleUrl: './reactive-demo.css'
})
export class ReactiveDemoComponent {

  // ── Step 1: Roles for select dropdown ────────────────────────────────────
  roles = ['Admin', 'User', 'Guest'];

  // ── Step 2: FormGroup instance ────────────────────────────────────────────
  form: FormGroup;

  submitted = false;

  constructor(private fb: FormBuilder) {

    // ── Step 3: Build FormGroup with FormBuilder ────────────────────────────
    this.form = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9_]{4,12}$/)
        ]
      ],
      email: [
        '',
        [Validators.required, Validators.email]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
        ]
      ],
      role: ['Admin', Validators.required],

      // ── Additional Fields ─────────────────────────────────────────────────
      gender:   ['', Validators.required],
      status:   ['', Validators.required],
      comments: ['']
    });
  }

  // ── Helper: check if a control is touched & invalid ──────────────────────
  isInvalid(name: string): boolean {
    const control = this.form.get(name);
    return !!(control?.touched && control?.invalid);
  }

  // ── onSubmit ──────────────────────────────────────────────────────────────
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      this.submitted = true;
      console.log(this.form.value);
    }
  }

  reset() {
    this.form.reset({ role: 'Admin' });
    this.submitted = false;
  }
}
