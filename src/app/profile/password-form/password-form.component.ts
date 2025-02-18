import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.css'],
})
export class PasswordFormComponent {
  passwordForm: FormGroup;
  userId!:number;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private auth:AuthService,
    private dialogRef: MatDialogRef<PasswordFormComponent>
  ) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required]],
    });

    this.auth.userId$.subscribe((userId) => {
      this.userId = userId})
  }

  changePassword() {
    if (this.passwordForm.valid) {
      this.profileService.changePassword(this.userId, this.passwordForm.value).subscribe(() => {
        alert('Password updated successfully!');
        this.dialogRef.close();
      },
      (error)=>{
        alert('Current Password is Incorrect!');
        this.passwordForm.reset();
      }
    );
    }
  }
}
