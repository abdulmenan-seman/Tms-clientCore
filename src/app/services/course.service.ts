import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Course, CourseApiResponse, CourseDetail, PagedResponse } from '../models/course.model';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:5000/api/v2/courses';

  /**
   * Fetches paginated courses and maps the envelope.
   */
  getAll(page = 1, pageSize = 50): Observable<Course[]> {
    return this.http
      .get<CourseApiResponse<Course>>(this.baseUrl, {
        params: { page: page.toString(), pageSize: pageSize.toString() },
      })
      .pipe(map((response) => response.items));
  }

  /**
   * Fetches full detail payload by course ID.
   */
  getById(id: string): Observable<CourseDetail> {
    return this.http.get<CourseDetail>(`${this.baseUrl}/${id}`);
  }
}
