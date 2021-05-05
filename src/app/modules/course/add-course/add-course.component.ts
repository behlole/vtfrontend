import {Component, OnInit} from '@angular/core';
import {CourseServiceService} from '../services/course-service.service';
import {MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-add-course',
    templateUrl: './add-course.component.html',
    styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

    constructor(
        public courseService: CourseServiceService,
        private dialogRef: MatDialogRef<AddCourseComponent>,
        private toaster: ToastrService
    ) {
    }

    ngOnInit() {
    }

    addCourse() {

        if (this.courseService.addCourseForm.invalid) {
            this.toaster.error('', 'Please fill required details');
        } else {
            if (this.courseService.addCourseForm.controls['id'].value) {
                this.courseService.updateCourse(this.courseService.addCourseForm.value).subscribe(
                    (data: any) => {
                        if (data.error) {
                            this.toaster.error(data['message']);
                        } else {
                            this.toaster.success('', data['message']);
                            this.dialogRef.close(true);
                        }


                    }, (error) => {
                        this.toaster.error('', error['message']);
                    });
            } else {

                this.courseService.addCourse(this.courseService.addCourseForm.value).subscribe(
                    (data: any) => {
                        if (data.error) {
                            this.toaster.error(data['message']);
                        } else {
                            this.toaster.success('', data['message']);
                            this.dialogRef.close(true);
                        }


                    }, (error) => {
                        this.toaster.error('', error['message']);
                    });
            }
        }
    }

    close() {
        this.dialogRef.close(true);

    }

    onClear() {
        this.courseService.initializeForm();
    }
}
