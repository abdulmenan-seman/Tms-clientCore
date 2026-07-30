import { Component, input, effect, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [RouterLink], // Required for [routerLink] template navigation[cite: 4]
  templateUrl: './course-detail.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './course-detail.component.scss',
})
export class CourseDetailComponent {
  // Receives route parameter :id directly from URL via withComponentInputBinding()[cite: 4]
  readonly id = input.required<string>();

  constructor() {
    // Automatically logs/executes whenever the id() input signal value changes[cite: 4]
    effect(() => {
      console.log(`Loading course detail for ID: ${this.id()}`);
    });
  }
}
