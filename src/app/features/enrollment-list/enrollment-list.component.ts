import { Component, inject, OnInit } from '@angular/core';
import { EnrollmentStore } from '../../store/enrollment.store';

@Component({
  selector: 'tms-enrollment-list',
  standalone: true,
  templateUrl: './enrollment-list.component.html',
  styleUrl: './enrollment-list.component.scss',
})
export class EnrollmentListComponent implements OnInit {
  // Inject centralized singleton store instance[cite: 5]
  readonly store = inject(EnrollmentStore);

  ngOnInit(): void {
    // Trigger store entity hydration lifecycle[cite: 5]
    this.store.loadEnrollments();
  }

  onApprove(id: string): void {
    // Dispatch mutation action to store[cite: 5]
    this.store.approveEnrollment(id);
  }
}