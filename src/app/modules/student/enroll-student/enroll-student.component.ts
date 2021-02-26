import { Component, OnInit } from '@angular/core';
import {CourseServiceService} from '../../course/services/course-service.service';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentServiceService} from '../services/student-service.service';

@Component({
  selector: 'app-enroll-student',
  templateUrl: './enroll-student.component.html',
  styleUrls: ['./enroll-student.component.scss']
})
export class EnrollStudentComponent implements OnInit {

    courses: any;
  constructor(private courseService:CourseServiceService, private matDialogRef:MatDialogRef<EnrollStudentComponent>, public studentService:StudentServiceService) { }

  ngOnInit() {
        this.courseService.getAllCourses().subscribe((data)=>{
            this.courses=data;
        });
  }

    close() {
        this.matDialogRef.close(true);
    }

    enrollStudent() {
      if(!this.studentService.courseForm.invalid) {
          this.studentService.enrolStudent(this.studentService.courseForm.value).subscribe((data) => {
              this.close();
          });
      }
    }

    onClear() {
        this.initializeForm();
    }
    initializeForm()
    {
        this.studentService.courseForm.patchValue({
            course_id:'',
        })
    }
}
