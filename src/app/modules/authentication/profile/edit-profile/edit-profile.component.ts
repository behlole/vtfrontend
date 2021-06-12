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
    userData: any;
    role_type: any;
    role_id: any;
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
        this.patchData();
    }

    editProfile() {
        this.profileService.submitEditUserData(this.editProfileForm.value).subscribe((response: any) => {

                this.toaster.success(response.message);
        });
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

    patchData() {
        this.profileService.getUserDetail().subscribe(({
                                                           city,
                                                           date_of_birth,
                                                           department,
                                                           email,
                                                           first_name,
                                                           gender,
                                                           id,
                                                           last_name,
                                                           phone_number
                                                       }: any) => {
            this.editProfileForm.patchValue({
                'id': id,
                'first_name': first_name,
                'last_name': last_name,
                'email': email,
                'phone_number': phone_number,
                'city': city,
                'gender': gender,
                'department': department,
                'date_of_birth': date_of_birth,
            });
        });

    }
}
