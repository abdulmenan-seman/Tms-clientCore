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
    path: 'courses/:id', // Param variable :id binds to input('id')[cite: 4]
    loadComponent: () =>
      import('./features/course-detail/course-detail.component').then(
        (m) => m.CourseDetailComponent
      ),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];