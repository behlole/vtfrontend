import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TeacherService {

    constructor(private http: HttpClient) {
    }

    getAllTeachers() {
        return this.http.get(environment.url + 'student/teachers');
    }
}
