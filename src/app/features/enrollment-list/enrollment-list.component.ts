import { Component, viewChild, effect, inject } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { EnrollmentStore } from '../../store/enrollment.store';
import { Enrollment } from '../../models/enrollment.model';

@Component({
  selector: 'tms-enrollment-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './enrollment-list.component.html',
  styleUrl: './enrollment-list.component.scss'
})
export class EnrollmentListComponent {
  readonly store = inject(EnrollmentStore);
  readonly displayedColumns = ['studentName', 'courseName', 'status', 'actions'];

  // Material Data Source wrapper
  readonly dataSource = new MatTableDataSource<Enrollment>();

  // Angular 22 Signal-based View Queries
  readonly paginator = viewChild.required(MatPaginator);
  readonly sort = viewChild.required(MatSort);

  constructor() {
    // Effect 1: Push store entity updates into MatTableDataSource
    effect(() => {
      this.dataSource.data = this.store.entities();
    });

    // Effect 2: Attach paginator and sort once resolved by template queries
    effect(() => {
      this.dataSource.paginator = this.paginator();
      this.dataSource.sort = this.sort();
    });

    // Load entities on creation
    this.store.loadEnrollments();
  }
}