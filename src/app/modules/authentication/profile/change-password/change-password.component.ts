import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {ProfileService} from '../../profile.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
    constructor(
        private dialogRef: MatDialogRef<ChangePasswordComponent>,
        private toaster: ToastrService,
        private profileService:ProfileService
    ) {
    }

    changePasswordForm: FormGroup = new FormGroup({
        new_password:new FormControl(null),
        confirm_password:new FormControl(null)
    });
    close() {
        this.dialogRef.close(true);

    }

    changePassword()
    {
        let passwordsData = this.changePasswordForm.value;
        if (passwordsData.new_password==passwordsData.confirm_password)
        {
            console.log(passwordsData.new_password);
            this.profileService.changePassword(passwordsData).subscribe(({message}: any)=>{
                this.toaster.success(message);
                // this.dialogRef.close();
            },
                (error)=>{
                this.toaster.error(error.message);
                })
        }
        else
        {
            this.toaster.error("Password Confirmation not matched","OOPS");
        }
    }

    onClear() {
        this.changePasswordForm.patchValue({
            new_password: null,
            confirm_password: null,
        });
    }
}
