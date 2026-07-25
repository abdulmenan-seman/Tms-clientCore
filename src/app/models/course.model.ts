/**
 * List row from the TMS API mirroring CourseResponseDto on GET /api/v2/courses.
 */
export interface Course {
  id: number;
  code: string;
  title: string;
  maxCapacity: number;
  enrollmentCount: number;
}

/**
 * Standard envelope for paginated TMS API contracts.
 */
export interface PagedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

/**
 * HATEOAS Link contract for GET /api/v2/courses/{id}.
 */
export interface CourseLink {
  href: string;
  rel: string;
  method: string;
}

/**
 * Detailed payload mirroring CourseDetailDto.
 */
export interface CourseDetail extends Course {
  links: readonly CourseLink[];
}