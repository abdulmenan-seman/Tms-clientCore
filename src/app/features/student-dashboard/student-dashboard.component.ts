import { Component, signal, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CourseCardComponent } from '../../ui/course-card/course-card.component';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CourseCardComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss',
})
export class StudentDashboardComponent {
  private readonly api = inject(CourseService);

  readonly studentName = signal<string>('Liya Kebede');
  readonly earnedCredits = signal<number>(45);

  readonly graduationStatus = computed<string>(() =>
    this.earnedCredits() >= 120 ? 'Eligible for Graduation' : 'In Progress'
  );

  readonly selectedCourse = signal<Course | null>(null);

  // rxResource manages the HTTP stream state as reactive signals[cite: 5]
  readonly coursesResource = rxResource({
    stream: () => this.api.getAll(),
  });

  registerForClass(): void {
    this.earnedCredits.update((c) => c + 3);
  }

  handleEnroll(course: Course): void {
    this.selectedCourse.set(course);
    console.log('Enrollment requested for:', course.title);
  }
}