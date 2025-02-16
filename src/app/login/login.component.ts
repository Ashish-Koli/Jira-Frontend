import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { pipe } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleResponse, TokenResponse } from '../dto/project';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  hide: boolean = true;
  token!: TokenResponse;

  roles!: RoleResponse[];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private snackbar:MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.registerForm = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });

    this.getRoles();
  }

  getRoles() {
    this.auth.getRoles().subscribe((data) => {
      this.roles = data;
    });
  }

  login() {
    const userName = this.loginForm.value.userName;
    const password = this.loginForm.value.password;
    let loginDTO = {
      userName: userName,
      password: password,
    };
    this.auth.login(loginDTO).subscribe(
      (data: TokenResponse) => {
        this.token = data;
        this.auth.setToken(data.token, data.role, data.userId);
        this.router.navigate(['/project']);
      },
      (error) => {
        this.snackbar.open(error.error.message, "cancel")
      }
    );
  }

  register() {
    const newUser = this.registerForm.value;
    this.auth.register(newUser).subscribe();
  }
}
