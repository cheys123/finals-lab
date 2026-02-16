import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reactive-demo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reactive-demo.html',
  styleUrl: './reactive-demo.css'
})
export class ReactiveDemo {
  roles = ['Admin', 'User', 'Guest']; // Roles array para sa dropdown
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    // Step 2: Initialize FormGroup with Validators
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]{4,12}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]],
      role: ['Admin', Validators.required]
    });
  }

  // Helper function para sa validation checking
  isInvalid(name: string) {
    const control = this.form.get(name);
    return control?.touched && control?.invalid;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Ipakita ang errors kung invalid
    } else {
      console.log('Reactive Form Value:', this.form.value);
    }
  }
}
