import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-demo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './template-demo.html',
  styleUrl: './template-demo.css'
})
export class TemplateDemo {
  title = 'Template Driven Demo';

  // Variables to store form data
  username = '';
  email = '';
  password = '';
  role = '';
  gender = '';
  status = '';
  comments = '';

  onSubmit(form: NgForm) {
    if (form.valid) {
      // English Alert Message
      alert(`
        Success! Here are the details you submitted:
        -------------------------------------------
        Username: ${this.username}
        Email:    ${this.email}
        Role:     ${this.role}
        Gender:   ${this.gender}
        Status:   ${this.status}
        Comments: ${this.comments || 'No comments provided'}
      `);
      console.log('Form Submitted Successfully:', form.value);
    }
  }
}
