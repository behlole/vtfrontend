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

    fetchStudentDevicesInfo(options: any) {
        return this.http.get(environment.url + `teacher/meeting/student-info/${options}`);
    }

    fetchStudentChecks(roleId) {
        return this.http.get(environment.url + `student/meeting/student-info/${roleId}`);

    }

    changeMicStatus(audio: any, studentEmailToCheck: string) {
        return this.http.post(environment.url + '/teacher/meeting/student-audio-update', {
            audio: audio,
            email: studentEmailToCheck
        });
    }

    changeScreenStatus(screen: any, studentEmailToCheck: string) {
        return this.http.post(environment.url + '/teacher/meeting/student-screen-update', {
            screen: screen,
            email: studentEmailToCheck
        });

    }

    changeCameraStatus(video: any, studentEmailToCheck: string) {
        return this.http.post(environment.url + '/teacher/meeting/student-video-update', {
            video: video,
            email: studentEmailToCheck
        });

    }
}
