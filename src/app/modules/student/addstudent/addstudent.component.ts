import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {StudentServiceService} from '../services/student-service.service';
import moment from 'moment';

@Component({
    selector: 'app-addstudent',
    templateUrl: './addstudent.component.html',
    styleUrls: ['./addstudent.component.scss']
})
export class AddstudentComponent{
    departments = [
        {id: 'software_engineering', value: 'Software Engineering'},
        {id: 'computer_science', value: 'Computer Science'},
        {id: 'electrical_engineering', value: 'Electrical Engineering'},
        {id: 'bba', value: 'Bachelors in Business and Administration'}
    ];

    private srcResult: any;

    constructor(
        private dialogRef: MatDialogRef<AddstudentComponent>,
        private toastr: ToastrService,
        public studentService: StudentServiceService,
    ) {}


    onClear() {
        this.studentService.addStudentForm.reset();
    }

    close() {
        this.dialogRef.close();
    }


    addStudent() {
        if (this.studentService.addStudentForm.invalid) {
            this.toastr.error('', 'Please fill required details');
        } else {
            const momentDate = new Date(this.studentService.addStudentForm.value.date_of_birth); // Replace event.value with your date value
            this.studentService.addStudentForm.value.date_of_birth = moment(momentDate).format('YYYY/MM/DD');
            if (this.studentService.addStudentForm.controls['id'].value) {
                this.studentService.updateStudent(this.studentService.addStudentForm.value).subscribe(
                    (data) => {
                        this.toastr.success('', data['message']);
                        this.dialogRef.close(true);


                    }, (error) => {
                        this.toastr.error('', error['message']);
                    });
            } else {

                this.studentService.addStudent(this.studentService.addStudentForm.value).subscribe(
                    (data) => {
                        this.toastr.success('', data['message']);
                        this.dialogRef.close(true);



                    }, (error) => {
                        this.toastr.error('', error['message']);
                    });
            }

        }
    }
}
