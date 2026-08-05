import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [ReactiveFormsModule], // Required for formGroup and formControlName directives
  templateUrl: './enrollment-form.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './enrollment-form.component.scss',
})
export class EnrollmentFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly courseService = inject(CourseService);
  private readonly http = inject(HttpClient);

  readonly submitted = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    studentRegistrationNumber: ['TMS-2026-0001', [Validators.required]],
    courseCode: ['CS-101', [Validators.required]],
    term: ['Fall 2026', Validators.required],
    notes: [''],
    backupCourses: this.fb.array<FormControl<string>>([]),
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
      }),
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
      this.errorMessage.set(null);

      const rawValue = this.form.getRawValue();
      const studentRegistrationNumber = rawValue.studentRegistrationNumber.trim();
      const courseCode = rawValue.courseCode.trim();

      this.courseService.getAll(1, 100).subscribe({
        next: (courses) => {
          const course = courses.find((item) => item.code.toLowerCase() === courseCode.toLowerCase());

          if (!course) {
            this.errorMessage.set(`Course code '${courseCode}' was not found.`);
            return;
          }

          const payload = {
            studentId: this.resolveStudentId(studentRegistrationNumber),
            courseCode: course.code,
          };

          this.http.post('http://localhost:5010/api/v2/enrollments', payload).subscribe({
            next: () => {
              this.submitted.set(true);
            },
            error: (err) => {
              this.errorMessage.set(err?.error?.detail ?? 'Enrollment failed.');
            },
          });
        },
        error: () => {
          this.errorMessage.set('Unable to load courses right now.');
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  private resolveStudentId(registrationNumber: string): number {
    const normalized = registrationNumber.toUpperCase();

    if (normalized === 'TMS-2026-0001') {
      return 1;
    }

    if (normalized === 'TMS-2026-0002') {
      return 2;
    }

    if (normalized === 'TMS-2026-0003') {
      return 3;
    }

    if (normalized === 'TMS-2026-0004') {
      return 4;
    }

    if (normalized === 'TMS-2026-0005') {
      return 5;
    }

    return 1;
  }
}
