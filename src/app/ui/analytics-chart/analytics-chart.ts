import { Component, computed, input } from '@angular/core';
import { Enrollment } from '../../models/enrollment.model';

@Component({
  selector: 'tms-analytics-chart',
  standalone: true,
  template: `
    <div class="chart-container">
      <h3>Enrollment Analytics</h3>
      <p>Total records: {{ data().length }}</p>
      <p>Approved: {{ approvedCount() }}</p>
      <p>Pending: {{ pendingCount() }}</p>
      <p>Rejected: {{ rejectedCount() }}</p>
    </div>
  `,
  styles: [
    '.chart-container { padding: 1rem; border: 1px solid #ddd; border-radius: 8px; }'
  ]
})
export class AnalyticsChartComponent {
  // Strongly-typed required signal input
  readonly data = input.required<Enrollment[]>();

  readonly approvedCount = computed(() => this.data().filter((e) => e.status === 'Approved').length);
  readonly pendingCount = computed(() => this.data().filter((e) => e.status === 'Pending').length);
  readonly rejectedCount = computed(() => this.data().filter((e) => e.status === 'Rejected').length);
}