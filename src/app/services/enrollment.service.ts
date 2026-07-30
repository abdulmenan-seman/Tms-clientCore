import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enrollment } from '../models/enrollment.model';

@Service() // Root singleton service decorator
export class EnrollmentService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/enrollments'; // Relative path targeting dev proxy

  /**
   * Retrieves all enrollment records from backend.
   */
  getAll(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.baseUrl);
  }

  /**
   * Submits approval command for a specific enrollment ID.
   */
  approve(id: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/approve`, {});
  }
}