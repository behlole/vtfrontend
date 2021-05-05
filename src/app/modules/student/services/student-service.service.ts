import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class StudentServiceService {

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
    courseForm: FormGroup = new FormGroup({
        id: new FormControl(''),
        course_id: new FormControl('', Validators.required),
        student_id: new FormControl('')
    });

    constructor(
        private http: HttpClient,
    ) {
    }

    getAllStudents() {

        return this.http.get(environment.url + 'teacher/students/');
    }

    addStudent(student: any) {

        return this.http.post(environment.url + 'teacher/students/add', student,);
    }

    patchValues(row) {
        this.addStudentForm.patchValue({
            id: row.id,
            first_name: row.first_name,
            last_name: row.last_name,
            email: row.email,
            phone_number: row.phone_number,
            city: row.city,
            gender: row.gender,
            department: row.department,
            date_of_birth: row.date_of_birth,
        });
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

        return this.http.put(environment.url + 'teacher/students/update', student);
    }

    deleteStudent(id) {
        return this.http.delete(environment.url + `teacher/students/delete/${id}`);
    }

    enrolStudent(value: any) {
        return this.http.post(environment.url + 'teacher/courses/enrol', value);
    }
}
