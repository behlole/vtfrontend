import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MeetingService {

    constructor(private http: HttpClient) {
    }

    getAllMeetings() {
        return this.http.get(environment.url + 'teacher/meeting/get');
    }

    deleteMeeting(id) {
        return this.http.delete(environment.url + `teacher/meeting/delete/${id}`);
    }

    fetchMeetingDetail(meetingId) {
        return this.http.get(environment.url + `teacher/meeting/details/${meetingId}`);
    }

    patchValue(row) {

    }

    fetchStudentActivityRecord(student_id, meeting_id) {
        return this.http.get(environment.url + `teacher/meeting/details/${meeting_id}/${student_id}`);
    }

    fetchStudent(student_id) {
        return this.http.get(environment.url + `teacher/students/get/${student_id}`);
    }
}
