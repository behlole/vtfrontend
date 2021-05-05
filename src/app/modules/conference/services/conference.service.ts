import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ConferenceService {

    constructor(
        private http: HttpClient
    ) {
    }

    informStudents(courseId, meetingCode) {
        return this.http.get(environment.url + `teacher/meeting/start/${courseId}/${meetingCode}`);
    }

    endMeeting($meetingCode) {

        return this.http.get(environment.url + `teacher/meeting/end/${$meetingCode}`);
    }

    recordActivity(meetingCode: string, activity) {
        return this.http.get(environment.url + `student/meeting/activity/${meetingCode}/${activity}`);

    }
}
