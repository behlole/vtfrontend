import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  constructor(
      private http:HttpClient,
  ) { }
    addStudentForm: FormGroup = new FormGroup({
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
  getAllStudents()
  {
      const header = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
      return this.http.get(environment.url+'teacher/students/')
  }

    addStudent(student: any) {
        const header = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
        return this.http.post(environment.url+'teacher/students/add',student,)
    }

    patchValues(row) {
        this.addStudentForm.patchValue({
            id:row.id,
            first_name:row.first_name,
            last_name:row.last_name,
            email:row.email,
            phone_number:row.phone_number,
            city:row.city,
            gender:row.gender,
            department:row.department,
            date_of_birth:row.date_of_birth,
        })
    }
    initializeForm() {
        this.addStudentForm.patchValue({
            id: null,
            first_name: '',
            last_name: '',
            email: '',
            phone_number: '',
            city: '',
            gender: '',
            department: '',
            date_of_birth: '',
        });
    }

    updateStudent(student: any) {

        return this.http.post(environment.url+'teacher/students/update',student,)
    }
}
