import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class CourseServiceService {
    courseId: any;

    constructor(private http: HttpClient) {
    }

    addCourseForm: FormGroup = new FormGroup({
        id: new FormControl(null),
        course_name: new FormControl('', Validators.required),
    });

    getAllCourses() {
        return this.http.get(environment.url + 'teacher/courses/');
    }

    initializeForm() {

        this.addCourseForm.patchValue({
            id: null,
            course_name: '',
        });

    }

    addCourse(data) {
        return this.http.post(environment.url+'teacher/courses/add',data);
    }

    patchValue(row) {
        this.addCourseForm.patchValue({
            id: row.id,
            course_name: row.course_name,
        });
    }

    updateCourse(value: any) {
        return this.http.put(environment.url+'teacher/courses/update',value);

    }

    deleteCourse(id) {
        return this.http.delete(environment.url+`teacher/courses/delete/${id}`);
    }

    getEnrolled(id) {
        return this.http.get(environment.url+`teacher/courses/get-enrolled/${id}`);
    }

    getAllCoursesForStudent() {
        return this.http.get(environment.url + 'student/courses/');
    }
}
