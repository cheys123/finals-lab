import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Student {
  _id?: string;
  name: string;
  studentId: string;
  course: string;
  year: string;
  email: string;
  contact: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  apiUrl = 'http://localhost:3000/students';
  students: Student[] = [];
  isEditing = false;
  editingId: string | null = null;
  showForm = false;
  successMessage = '';
  errorMessage = '';

  formData: Student = {
    name: '', studentId: '', course: '', year: '', email: '', contact: ''
  };

  yearOptions = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  courseOptions = ['BSIT', 'BSCS', 'BSIS', 'BSCpE', 'BSECE', 'BSEd', 'BSN', 'BSBA', 'Other'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void { this.loadStudents(); }

  loadStudents(): void {
    this.http.get<Student[]>(this.apiUrl).subscribe({
      next: (data) => this.students = data,
      error: () => this.showError('Failed to load students. Make sure API is running.')
    });
  }

  openAddForm(): void {
    this.isEditing = false;
    this.editingId = null;
    this.resetForm();
    this.showForm = true;
  }

  openEditForm(student: Student): void {
    this.isEditing = true;
    this.editingId = student._id!;
    this.formData = {
      name: student.name,
      studentId: student.studentId,
      course: student.course,
      year: student.year,
      email: student.email,
      contact: student.contact
    };
    this.showForm = true;
  }

  closeForm(): void { this.showForm = false; this.resetForm(); }

  submitForm(): void {
    if (!this.formData.name || !this.formData.studentId || !this.formData.course || !this.formData.year) {
      this.showError('Please fill in all required fields.');
      return;
    }
    if (this.isEditing && this.editingId) {
      this.http.put(`${this.apiUrl}/${this.editingId}`, this.formData).subscribe({
        next: () => { this.showSuccess('Student updated successfully!'); this.loadStudents(); this.closeForm(); },
        error: () => this.showError('Failed to update student.')
      });
    } else {
      this.http.post<Student>(this.apiUrl, this.formData).subscribe({
        next: () => { this.showSuccess('Student added successfully!'); this.loadStudents(); this.closeForm(); },
        error: () => this.showError('Failed to add student.')
      });
    }
  }

  deleteStudent(id: string): void {
    if (!confirm('Are you sure you want to delete this student?')) return;
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => { this.showSuccess('Student deleted successfully!'); this.loadStudents(); },
      error: () => this.showError('Failed to delete student.')
    });
  }

  resetForm(): void {
    this.formData = { name: '', studentId: '', course: '', year: '', email: '', contact: '' };
  }

  showSuccess(msg: string): void {
    this.successMessage = msg; this.errorMessage = '';
    setTimeout(() => this.successMessage = '', 3000);
  }

  showError(msg: string): void {
    this.errorMessage = msg; this.successMessage = '';
    setTimeout(() => this.errorMessage = '', 4000);
  }
}
