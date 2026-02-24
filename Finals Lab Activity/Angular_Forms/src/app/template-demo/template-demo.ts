import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-template-demo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './template-demo.html',
  styleUrl: './template-demo.css'
})
export class TemplateDemoComponent {

  // ── Step 2: Define Bound Properties ──────────────────────────────────────
  title    = 'Template Driven Demo';
  username = '';
  email    = '';
  password = '';
  role     = '';
  gender   = '';
  status   = '';
  comments = '';

  submitted = false;

  // ── onSubmit handler ─────────────────────────────────────────────────────
  onSubmit() {
    this.submitted = true;
  }

  reset() {
    this.username  = '';
    this.email     = '';
    this.password  = '';
    this.role      = '';
    this.gender    = '';
    this.status    = '';
    this.comments  = '';
    this.submitted = false;
  }
}
