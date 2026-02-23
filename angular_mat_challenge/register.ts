import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Angular Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';

// Karagdagang Components para sa Activity 5
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule,
    MatInputModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule,
    MatSliderModule, MatSlideToggleModule, MatIconModule, MatSelectModule
  ],
  providers: [DatePipe],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  userName = ''; email = ''; password = ''; gender = '';
  address = ''; birthDate!: Date; angularSkillLevel = 5;
  submitted = false;
  isDarkMode = false; // Para sa theme toggle

  // Requirement: Tanggapin lamang ang users na ipinanganak noong 2006 pababa
  maxDate = new Date(2006, 11, 31);

  formdata = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    // Password Requirement: Alphanumeric, starts with a letter, min 8 chars
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z][a-zA-Z0-9]{7,}$/)
    ]),
    gender: new FormControl('', [Validators.required]),
    birthDate: new FormControl(null, [Validators.required]),
    address: new FormControl(''),
    angularSkillLevel: new FormControl(5)
  });

  // Function para sa switching ng mode
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }

  onClickSubmit(data: any) {
    this.submitted = true;
    this.userName = data.userName;
    this.email = data.email;
    this.password = data.password;
    this.gender = data.gender;
    this.address = data.address;
    this.angularSkillLevel = data.angularSkillLevel;
    this.birthDate = data.birthDate;

    if (this.formdata.valid) {
      console.log("Form Submitted!", this.formdata.value);
    }
  }
}
