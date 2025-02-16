import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.css'],
})
export class PasswordFormComponent {
  passwordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    // private profileService: ProfileService,
    private dialogRef: MatDialogRef<PasswordFormComponent>
  ) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  changePassword() {
    if (this.passwordForm.valid) {
      // this.profileService.changePassword(this.passwordForm.value).subscribe(() => {
      //   alert('Password updated successfully!');
      //   this.dialogRef.close();
      // });
    }
  }
}
