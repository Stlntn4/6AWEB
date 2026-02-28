import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Angular Material Imports
import { MatCardModule }           from '@angular/material/card';
import { MatFormFieldModule }      from '@angular/material/form-field';
import { MatInputModule }          from '@angular/material/input';
import { MatButtonModule }         from '@angular/material/button';
import { MatIconModule }           from '@angular/material/icon';
import { MatRadioModule }          from '@angular/material/radio';
import { MatDatepickerModule }     from '@angular/material/datepicker';
import { MatNativeDateModule }     from '@angular/material/core';
import { MatSliderModule }         from '@angular/material/slider';
import { MatBadgeModule }          from '@angular/material/badge';
import { MatCheckboxModule }       from '@angular/material/checkbox';
import { MatChipsModule }          from '@angular/material/chips';
import { MatDividerModule }        from '@angular/material/divider';
import { MatTooltipModule }        from '@angular/material/tooltip';
import { MatSlideToggleModule }    from '@angular/material/slide-toggle'; // ADDED

// ─── Custom Validators ─────────────────────────────────────────────────────

/** Password: alphanumeric only, must start with a letter */
function alphanumericPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const val: string = control.value || '';
  if (!val) return null;
  if (!/^[A-Za-z]/.test(val))      return { startsWithLetter: true };
  if (!/^[A-Za-z0-9]+$/.test(val)) return { alphanumericOnly: true };
  return null;
}

/** Birth date: user must be born in 2006 or earlier */
function birthYearValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const year = new Date(control.value).getFullYear();
  if (year > 2006) return { tooYoung: true };
  return null;
}

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatTooltipModule,
    MatSlideToggleModule, // ADDED
  ],
  templateUrl: './profile-form.html',
  styleUrls: ['./profile-form.css']
})
export class ProfileFormComponent implements OnInit {

  profileForm!: FormGroup;
  hidePassword = true;
  submitted     = false;
  submittedData: any = null;  // ADDED: stores form data for display
  darkMode      = true; // ADDED

  /** Max selectable date: Dec 31, 2006 */
  readonly maxBirthDate = new Date(2006, 11, 31); // ADDED

  techOptions = [
    { label: 'Angular',      value: 'angular',      selected: true  },
    { label: 'TypeScript',   value: 'typescript',   selected: false },
    { label: 'RxJS',         value: 'rxjs',         selected: true  },
    { label: 'NgRx',         value: 'ngrx',         selected: false },
    { label: 'TailwindCSS',  value: 'tailwind',     selected: false },
    { label: 'Node.js',      value: 'nodejs',       selected: false },
    { label: 'GraphQL',      value: 'graphql',      selected: true  },
    { label: 'Docker',       value: 'docker',       selected: false },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      username:   [''],
      email:      ['', [Validators.required, Validators.email]],
      password:   ['', [Validators.required, Validators.minLength(8), alphanumericPasswordValidator]], // UPDATED
      gender:     [''],
      address:    [''],
      birthDate:  ['', [Validators.required, birthYearValidator]], // UPDATED
      skillLevel: [5],
      newsletter: [true],
      twoFactor:  [false],
      agreeTerms: [true],
      techStack:  [['angular', 'rxjs', 'graphql']],
      bio:        [''],
    });
  }

  // ADDED
  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
  }

  // ADDED: consolidated password error getter
  get passwordErrors(): string | null {
    const ctrl = this.profileForm.get('password');
    if (!ctrl?.touched || !ctrl.errors) return null;
    if (ctrl.errors['required'])         return 'Password is required';
    if (ctrl.errors['startsWithLetter']) return 'Password must start with a letter';
    if (ctrl.errors['alphanumericOnly']) return 'Only letters and numbers are allowed';
    if (ctrl.errors['minlength'])        return 'Minimum 8 characters required';
    return null;
  }

  // ADDED: birth date error getter
  get birthDateError(): string | null {
    const ctrl = this.profileForm.get('birthDate');
    if (!ctrl?.touched || !ctrl.errors) return null;
    if (ctrl.errors['required'])  return 'Birth date is required';
    if (ctrl.errors['tooYoung'])  return 'You must be born in 2006 or earlier';
    return null;
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.submitted     = true;
      this.submittedData = { ...this.profileForm.value }; // ADDED: capture data
      console.log('Form submitted:', this.profileForm.value);
    } else {
      this.profileForm.markAllAsTouched();
    }
  }

  // ADDED: reset form and go back
  resetForm(): void {
    this.submitted     = false;
    this.submittedData = null;
    this.profileForm.reset({
      skillLevel: 5,
      newsletter: true,
      twoFactor:  false,
      agreeTerms: true,
      techStack:  ['angular', 'rxjs', 'graphql'],
    });
  }
}