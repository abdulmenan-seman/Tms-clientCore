import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Course } from '../../models/course.model';

@Component({
  selector: 'tms-course-card',
  standalone: true,
  imports: [RouterLink], // Import RouterLink directly into standalone child[cite: 4]
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.scss',
})
export class CourseCardComponent {
  readonly course = input.required<Course>();
  readonly enrollClicked = output<Course>();
}