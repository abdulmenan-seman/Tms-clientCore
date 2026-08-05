import { Component, signal, computed, inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CourseCardComponent } from '../../ui/course-card/course-card.component';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { EnrollmentListComponent } from '../enrollment-list/enrollment-list.component';
import { EnrollmentStore } from '../../store/enrollment.store';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CourseCardComponent, EnrollmentListComponent],
  templateUrl: './student-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './student-dashboard.component.scss',
})
export class StudentDashboardComponent implements OnInit {
  private readonly api = inject(CourseService);
  private readonly enrollmentStore = inject(EnrollmentStore);

  readonly studentName = signal<string>('Liya Kebede');
  readonly earnedCredits = signal<number>(45);

  readonly graduationStatus = computed<string>(() =>
    this.earnedCredits() >= 120 ? 'Eligible for Graduation' : 'In Progress',
  );

  readonly selectedCourse = signal<Course | null>(null);
  readonly pendingEnrollments = computed(() =>
    this.enrollmentStore.entities().filter((enrollment) => enrollment.status === 'Pending'),
  );

  // rxResource manages the HTTP stream state as reactive signals[cite: 5]
  readonly coursesResource = rxResource({
    stream: () => this.api.getAll(),
  });

  ngOnInit(): void {
    this.enrollmentStore.loadEnrollments();
  }

  registerForClass(): void {
    this.earnedCredits.update((c) => c + 3);
  }

  handleEnroll(course: Course): void {
    this.selectedCourse.set(course);
    console.log('Enrollment requested for:', course.title);
  }
}
