import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../core/services/event';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,HttpClientModule],
  templateUrl: './create-event.html',
  styleUrls: ['./create-event.css']
})
export class CreateEventComponent {
  eventForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private eventService: EventService, private router: Router) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      time: [''],
      location: [''],
      description: ['']
    });
  }

  submitForm() {
    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched();
      return;
    }

    this.errorMessage = '';
    const token = localStorage.getItem('token'); 

    this.eventService.createEvent(this.eventForm.value).subscribe({
      next: () => {
        this.submitted = true;
        this.successMessage = 'Event added successfully!';
        this.eventForm.reset();
        setTimeout(() => {
          this.submitted = false;
          this.router.navigate(['/events']); 
        }, 2000);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || 'Failed to create event.';
      }
    });
  }
}
