import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [ReactiveFormsModule], // Required for formGroup and formControlName directives
  templateUrl: './enrollment-form.component.html',
  styleUrl: './enrollment-form.component.scss',
})
export class EnrollmentFormComponent {
  // Inject dependency using Angular's functional inject() pattern
  private readonly fb = inject(FormBuilder);

  // Writable signal tracking submission completion
  readonly submitted = signal<boolean>(false);

  // Define form using nonNullable builder to prevent null states on control resets
  readonly form = this.fb.nonNullable.group({
    studentId: [
      'STU-1001',
      [Validators.required, Validators.pattern('^STU-[0-9]{4}$')],
    ],
    courseId: ['', Validators.required],
    term: ['Fall 2026', Validators.required],
    notes: [''],
    backupCourses: this.fb.array<FormControl<string>>([]), // Dynamic form array container
  });

  // Getter accessor for typed FormArray reference
  get backups() {
    return this.form.controls.backupCourses;
  }

  /**
   * Appends a new FormControl row into the FormArray container.
   */
  addBackup(): void {
    this.backups.push(
      this.fb.control('', {
        nonNullable: true,
        validators: Validators.required,
      })
    );
  }

  /**
   * Removes a targeted FormControl row from the FormArray container by index.
   */
  removeBackup(index: number): void {
    this.backups.removeAt(index);
  }

  /**
   * Validates and submits the form payload.
   */
  submit(): void {
    if (this.form.valid) {
      // getRawValue() captures disabled fields along with active fields
      const payload = this.form.getRawValue();
      console.log('Enrollment payload:', payload);
      this.submitted.set(true);
    } else {
      // Mark all controls as touched to trigger validation messages in the template
      this.form.markAllAsTouched();
    }
  }
}