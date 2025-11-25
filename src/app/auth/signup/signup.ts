import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'; 
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule], 
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  passwordsDontMatch = false;
  

  constructor(private fb: FormBuilder, private http: HttpClient,  private router: Router) {
    
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    const { email, password, confirmPassword } = this.signupForm.value;

    if (password !== confirmPassword) {
      this.passwordsDontMatch = true;
      return;
    }

    this.passwordsDontMatch = false;

    this.http.post('http://127.0.0.1:5000/api/user/signup', { email, password }).subscribe({
     next: () => {
       alert('User registered successfully!');
           this.signupForm.reset();
           this.router.navigate(['/login']);
                  }
                ,
      error: (err) => {
        alert('Error: ' + (err.error?.error || 'Something went wrong'));
      }
    });
  }
}
