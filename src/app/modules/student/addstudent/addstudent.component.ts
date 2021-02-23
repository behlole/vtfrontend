import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-addstudent',
    templateUrl: './addstudent.component.html',
    styleUrls: ['./addstudent.component.scss']
})
export class AddstudentComponent implements OnInit {
    departments = [
        {id: 'software_engineering', value: 'Software Engineering'},
        {id: 'computer_science', value: 'Computer Science'},
        {id: 'electrical_engineering', value: 'Electrical Engineering'},
        {id: 'bba', value: 'Bachelors in Business and Administration'}
    ];
    addStudentForm: FormGroup = new FormGroup({
        $key: new FormControl(null, Validators.required),
        full_name: new FormControl('', Validators.required),
        last_name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone_number: new FormControl('', [Validators.minLength(11)]),
        city: new FormControl('', Validators.required),
        gender: new FormControl('male', Validators.required),
        department: new FormControl(''),
        date_of_birth: new FormControl(''),
    });
    private srcResult: any;

    constructor(
        private dialogRef: MatDialogRef<AddstudentComponent>
    ) {
        // this.dialogRef.close();
    }

    ngOnInit() {
    }


    onClear() {
        this.addStudentForm.reset();
    }

    close() {
        this.dialogRef.close();
    }


    addStudent() {
        console.log(this.addStudentForm.value);
    }
}
