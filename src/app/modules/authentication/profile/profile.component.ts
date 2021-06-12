import {Component, ViewEncapsulation} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {AddCourseComponent} from '../../course/add-course/add-course.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {ProfileService} from '../profile.service';
import {ChangePasswordComponent} from './change-password/change-password.component';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProfileComponent {
    first_name: any;
    last_name: any;
    designation: any;
    user_id: any;

    /**
     * Constructor
     */
    constructor(private dialog:MatDialog,private profileService:ProfileService) {
        this.assignNme();
    }

    assignNme() {
        if (localStorage.getItem('user')) {
            let data = JSON.parse(localStorage.getItem('user'));
            this.user_id = data.user.id;
            this.first_name = data.user.first_name;
            this.last_name = data.user.last_name;
            this.profileService.id=data.user.id;
            if (data.user.role_type == 1) {
                this.designation = 'Teacher';
            } else {
                this.designation = 'Student';
            }
        }
    }

    onEdit() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.width = '60%';
        let dialogRef = this.dialog.open(EditProfileComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((completed) => {
            if (completed == true) {
                window.location.reload();
            }
        });
    }

    changePasswordForm() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.width = '60%';
        let dialogRef = this.dialog.open(ChangePasswordComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((completed) => {
            if (completed == true) {
                window.location.reload();
            }
        });
    }
}
