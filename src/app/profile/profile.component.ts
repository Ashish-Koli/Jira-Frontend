import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PasswordFormComponent } from './password-form/password-form.component';
import { UpdateUser, UserResponse } from '../dto/project';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  profileForm!: FormGroup;
  user!: UserResponse;
  userId!: number;
  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private auth: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.auth.userId$.subscribe((userId) => {
      this.userId = userId;
    });
    this.loadUserProfile(this.userId);
  }

  loadUserProfile(id: number) {
    this.profileService.getUserById(id).subscribe((data) => {
      this.user = data;
      this.profileForm = this.fb.group({
        username: [this.user.userName, Validators.required],
        email: [this.user.email, [Validators.required, Validators.email]],
        role: [{ value: this.user.role.title, disabled: true }],
      });
    });
  }

  updateProfile() {
    if (this.profileForm.valid) {
      const updateUser: UpdateUser = {
        userName: this.profileForm.value.username,
        email: this.profileForm.value.email,
      };
      this.profileService
        .updateProfile(this.userId, updateUser)
        .subscribe(() => {
          alert('Profile updated successfully!');
        });
    }
  }

  openChangePasswordDialog() {
    this.dialog.open(PasswordFormComponent, {
      width: '500px',
    });
  }
}
