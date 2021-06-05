import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FuseConfigService} from '../../../@fuse/services/config.service';
import {environment} from '../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {ConferenceService} from './services/conference.service';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {stat} from 'fs';

declare var JitsiMeetExternalAPI: any;

@Component({
    selector: 'app-conference',
    templateUrl: './conference.component.html',
    styleUrls: ['./conference.component.scss']
})
export class ConferenceComponent implements AfterViewInit, OnInit {

    myControl = new FormControl();
    options: string[] = [];
    filteredOptions: Observable<string[]>;

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        console.log(this.options);
        return this.options.filter(option => this.options.indexOf(filterValue) === 0);
    }
    meetingCode = Math.random().toString(36).substring(2);
    title = 'Meeting';
    domain: string = environment.videoServer;
    studentOptions: any;
    teacherOptions: any;
    api: any;
    course: any;
    courseId: any;
    roleType: any;
    mute:null;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private route: ActivatedRoute,
        private router: Router,
        private conferenceService: ConferenceService,
        private toaster: ToastrService,
        private spinner: NgxSpinnerService) {
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                },
            }
        };
    }

    ngOnInit(): void {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
        this.route.queryParams.subscribe(params => {
            this.course = params['course_name'];
            this.courseId = params['course_id'];
            this.meetingCode = this.meetingCode + '-' + this.course;

            if (params['course_code']) {
                this.meetingCode = params['course_code'];
            }
        });
    }

    ngAfterViewInit() {
        this.spinner.show();
        this.startMeeting();
        this.spinner.hide();
        if (this.roleType == 1) {
            this.api = new JitsiMeetExternalAPI(this.domain, this.teacherOptions);
        } else if (this.roleType == 2) {
            this.api = new JitsiMeetExternalAPI(this.domain, this.studentOptions);
        }

        if (this.roleType == 1) {
            this.api.addEventListeners({
                participantJoined: (result) => {
                    this.options.push(result.displayName);
                    console.log("options are ",this.options);
                    this.toaster.success(result.displayName + ' Joined Successfully', 'Success');
                },
                videoConferenceLeft: () => this.endMeeting().subscribe(data => {
                    this.toaster.success('Meeting ended successfully');
                    this.api.executeCommand('hangup');
                    this.router.navigate(['dashboard']);
                }),
                videoConferenceJoined: () => this.informStudents().subscribe(result => {
                        if (result['error']) {
                            this.toaster.error(result['message']);
                        } else {
                            this.toaster.success(result['message']);
                        }
                    },
                    error => {
                        this.toaster.error(error);
                    }),
            });
        } else if (this.roleType == 2) {
            this.api.addEventListeners({

                videoConferenceLeft: () => this.recordActivity('Left-Meeting').subscribe(data => {
                    this.router.navigate(['dashboard']);
                    this.toaster.success('Meeting Left Successfully ');
                }),
                videoConferenceJoined: () => {
                    this.recordActivity('Joined-Meeting').subscribe(result => {
                            if (result['error']) {
                                this.toaster.error(result['message']);
                            } else {
                                this.toaster.success(result['message']);
                            }
                        },
                        error => {
                            this.toaster.error(error);
                        });
                },
                audioMuteStatusChanged: (status) => {
                    if (this.mute!=status.muted) {
                        this.mute = status.muted;

                        if (this.mute) {
                            this.recordActivity('Audio-Turned-Off').subscribe(
                                data => {
                                },
                                error => {
                                }
                            );
                        } else {
                            this.recordActivity('Audio-Turned-On').subscribe(
                                data => {
                                },
                                error => {
                                }
                            );
                        }
                    }
                },
                screenSharingStatusChanged: (status) => {
                    if (status.muted) {
                        this.recordActivity('Screen-Sharing-Turned-Off').subscribe(
                            data => {
                            },
                            error => {

                            }
                        );
                    }
                    else
                    {
                        this.recordActivity('Screen-Sharing-Turned-On').subscribe(
                            data => {
                            },
                            error => {

                            }
                        );
                    }
                },
                videoMuteStatusChanged: (status) => {
                    if (status.muted)
                    {
                        this.recordActivity('Video-Turned-Off').subscribe(
                            data => {
                            }
                        );
                    }
                    else
                    {
                        this.recordActivity('Video-Turned-On').subscribe(
                            data => {
                            }
                        );
                    }

                },
            });
        }
    }

    endMeeting() {

        return this.conferenceService.endMeeting(this.meetingCode);

    }

    startMeeting() {
        let data = JSON.parse(localStorage.getItem('user'));
        let first_name = data.user.first_name;
        let last_name = data.user.last_name;
        let email = data.user.email;
        this.roleType = data.user.role_type;
        this.studentOptions = {
            roomName: this.meetingCode,
            userInfo: {
                email: email,
                displayName: first_name + ' ' + last_name
            },
            configOverwrite:
                {
                    remoteVideoMenu: {
                        disableKick: true
                    },
                    enableWelcomePage: false,
                    prejoinPageEnabled: true,
                },
            interfaceConfigOverwrite: {
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
                TOOLBAR_BUTTONS: ['microphone', 'camera', 'tileview', 'hangup', 'chat', 'profile', 'help'],
            },

            parentNode: document.querySelector('#meet')
        };
        this.teacherOptions = {
            roomName: this.meetingCode,
            userInfo: {
                email: email,
                displayName: first_name + ' ' + last_name
            },
            configOverwrite:
                {
                    remoteVideoMenu: {
                        disableKick: true
                    },
                    enableWelcomePage: false,
                    prejoinPageEnabled: true,
                },
            interfaceConfigOverwrite: {
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
            },

            parentNode: document.querySelector('#meet')
        };

    }

    informStudents() {
        return this.conferenceService.informStudents(this.courseId, this.meetingCode);
    }

    recordActivity(activity) {
        return this.conferenceService.recordActivity(this.meetingCode, activity);
    }
}

