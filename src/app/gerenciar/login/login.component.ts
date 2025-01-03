import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../service/security/authentication/authentication.service';


@Component({
  selector: 'app-login', templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
              private router: Router, private authenticationService: AuthenticationService) {
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required], password: ['', Validators.required],
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authenticationService.login(this.f.username.value, this.f.password.value).subscribe({
      next: (user) => {
        console.log('Login successful:', user);
        this.error = null;
        this.loading = false; // Reset loading state
        localStorage.setItem('currentUser', JSON.stringify(user)); // Optional: Store user data
        this.router.navigate([this.returnUrl]); // Navigate to the desired page
      },
      error: (error) => {
        console.error('Login failed:', error);

        // Handle error cases
        if (error.status === 401) {
          this.error = 'Invalid username or password';
        } else if (error.status === 500) {
          this.error = 'Server error, please try again later';
        } else {
          this.error = 'An unexpected error occurred';
        }

        this.loading = false;
      },
    });
  }

}
