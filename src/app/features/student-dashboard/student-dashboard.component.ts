import { Component, signal, computed } from '@angular/core';
import { CourseCardComponent } from '../../ui/course-card/course-card.component';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CourseCardComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss',
})
export class StudentDashboardComponent {
  readonly studentName = signal<string>('Liya Kebede');
  readonly earnedCredits = signal<number>(45);

  readonly graduationStatus = computed<string>(() =>
    this.earnedCredits() >= 120 ? 'Eligible for Graduation' : 'In Progress'
  );

  readonly selectedCourse = signal<Course | null>(null);

  // Array signal backing catalog loop
  readonly availableCourses = signal<Course[]>([
    {
      id: 1,
      title: 'Advanced Java Services',
      code: 'CSE-101',
      maxCapacity: 30,
      enrollmentCount: 10,
    },
    {
      id: 2,
      title: 'Angular UI Lab',
      code: 'CSE-210',
      maxCapacity: 25,
      enrollmentCount: 25,
    },
    {
      id: 3,
      title: 'Database Design',
      code: 'CSE-305',
      maxCapacity: 20,
      enrollmentCount: 18,
    },
    {
      id: 4,
      title: 'API Security Workshop',
      code: 'CSE-420',
      maxCapacity: 40,
      enrollmentCount: 15,
    },
  ]);

  registerForClass(): void {
    this.earnedCredits.update((c) => c + 3);
  }

  handleEnroll(course: Course): void {
    this.selectedCourse.set(course);
    console.log('Enrollment requested for:', course.title);
  }
}