import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../../profile.service';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
    userData:any;
    departments = [
        {id: 'software_engineering', value: 'Software Engineering'},
        {id: 'computer_science', value: 'Computer Science'},
        {id: 'electrical_engineering', value: 'Electrical Engineering'},
        {id: 'bba', value: 'Bachelors in Business and Administration'}
    ];

    constructor(
        private dialogRef: MatDialogRef<EditProfileComponent>,
        private toaster: ToastrService,
        private profileService:ProfileService
    ) {
    }

    editProfileForm: FormGroup = new FormGroup({
        id: new FormControl(null),
        first_name: new FormControl('', Validators.required),
        last_name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone_number: new FormControl('', [Validators.minLength(11)]),
        city: new FormControl('', Validators.required),
        gender: new FormControl('male', Validators.required),
        department: new FormControl(''),
        date_of_birth: new FormControl(''),
    });

    ngOnInit() {
        this.profileService.getUserData();
    }

    editProfile() {

    }

    close() {
        this.dialogRef.close(true);

    }

    onClear() {
        this.editProfileForm.patchValue({
            id: null,
            course_name: '',
        });
    }
}
