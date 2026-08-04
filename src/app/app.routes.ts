import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/student-dashboard/student-dashboard.component').then(
        (m) => m.StudentDashboardComponent
      ),
  },
  {
    path: 'courses/:id', 
    loadComponent: () =>
      import('./features/course-detail/course-detail.component').then(
        (m) => m.CourseDetailComponent
      ),
  },
  {
    path: 'enroll', // Pathway to dynamic form view
    loadComponent: () =>
      import('./features/enrollment-form/enrollment-form.component').then(
        (m) => m.EnrollmentFormComponent
      ),
  },
  // Pathway to enrollment list view
  {
    path: 'enrollments',
    loadComponent: () =>
      import('./features/enrollment-list/enrollment-list.component').then(
        (m) => m.EnrollmentListComponent
      ),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];