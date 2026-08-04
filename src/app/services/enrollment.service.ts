import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Observable } from 'rxjs';
import { Enrollment } from '../models/enrollment.model';

interface EnrollmentApiResponse {
  id: number;
  courseId: number;
  studentId: number;
  courseTitle: string;
  courseCode: string;
  enrolledAt: string;
  status?: string | null;
}

@Injectable({ providedIn: 'root' }) // Root singleton service decorator
export class EnrollmentService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:5000/api/v2/enrollments';

  /**
   * Retrieves all enrollment records from backend.
   */
  getAll(): Observable<Enrollment[]> {
    return this.http
      .get<EnrollmentApiResponse[]>(this.baseUrl)
      .pipe(
        map((rows) =>
          rows.map((row) => ({
            id: row.id.toString(),
            studentId: row.studentId,
            studentName: `Student #${row.studentId}`,
            courseId: row.courseId,
            courseName: `${row.courseTitle} (${row.courseCode})`,
            status: (row.status === 'Approved' ? 'Approved' : 'Pending') as 'Pending' | 'Approved' | 'Rejected',
            enrolledAt: row.enrolledAt,
          }))
        )
      );
  }

  /**
   * Submits approval command for a specific enrollment ID.
   */
  approve(id: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/approve`, {});
  }
}