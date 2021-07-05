import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FuseConfigService} from '../../../@fuse/services/config.service';
import {environment} from '../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {ConferenceService} from './services/conference.service';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {FormControl} from '@angular/forms';
import {interval, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatCheckboxChange} from '@angular/material';

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
                    this.endMeetingToaster = false;
        const filterValue = value.toLowerCase();
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
    roleType: any = 0;
    mute: null;
    endMeetingToaster = false;
    joined = false;
    roleId;
    audio = 1;
    video = 1;
    screen = 1;
    studentEmailToCheck: string = '';

    constructor(
        private _fuseConfigService: FuseConfigService,
        private route: ActivatedRoute,
        private router: Router,
        private conferenceService: ConferenceService,
        private toaster: ToastrService,
        private spinner: NgxSpinnerService,) {
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
                    this.toaster.success(result.displayName + ' Joined Successfully', 'Success');
                },
                participantLeft: (result) => {
                    this.toaster.success(result.id + ' Participant Left', 'Success');

                },
                videoConferenceLeft: () => this.endMeeting().subscribe(data => {
                    if (this.endMeetingToaster == false) {
                        this.api.dispose();
                        this.toaster.success('Meeting ended successfully');
                        this.api.executeCommand('hangup');
                        this.router.navigate(['dashboard']);
                        this.endMeetingToaster = true;
                    }
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
            interval(1000).subscribe((func => {
                this.conferenceService.fetchStudentChecks(this.roleId).subscribe((data: any) => {
                    this.api.isAudioMuted().then(muted => {
                        if (muted == true && data.audio == 1) {
                            this.api.executeCommand('toggleAudio');
                        } else if (muted == false && data.audio == 0) {
                            this.api.executeCommand('toggleAudio');

                        }
                    });
                    this.api.isVideoMuted().then(muted => {
                        if (muted == true && data.video == 1) {
                            this.api.executeCommand('toggleVideo');
                        } else if (muted == false && data.video == 0) {
                            this.api.executeCommand('toggleVideo');

                        }
                    });
                });
            }));

            this.api.addEventListeners({

                videoConferenceLeft: () => this.recordActivity('Left-Meeting').subscribe(data => {
                    this.api.dispose();
                    this.router.navigate(['dashboard']);
                    this.toaster.success('Meeting Left Successfully ');

                }),
                videoConferenceJoined: (data = true) => {
                    if (this.joined != data) {

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
                        this.joined = true;
                    }
                },
                audioMuteStatusChanged: (status) => {
                    if (this.mute != status.muted) {
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
        this.roleId = data.user.role_id;
        this.studentOptions = {
            roomName: this.meetingCode,
            userInfo: {
                email: email,
                displayName: email
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
                TOOLBAR_BUTTONS: ['microphone', 'camera', 'desktop', 'fullscreen', 'sharedvideo', 'raisehand', 'tileview', 'hangup', 'chat'],
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
                TOOLBAR_BUTTONS: ['microphone', 'camera', 'desktop', 'fullscreen', 'hangup', 'profile', 'chat', 'recording',
                    , 'filmstrip','participant','disable-everyone-camera',
                    'tileview', 'mute-everyone'],
            },

            // TOOLBAR_BUTTONS: ['microphone', 'camera', 'desktop', 'fullscreen', 'fodeviceselection', 'hangup', 'profile', 'info', 'chat', 'recording',
            //     'livestreaming', 'etherpad', 'sharedvideo', 'settigns', 'raisehand', 'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
            //     'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone', 'e2ee'],

            parentNode: document.querySelector('#meet')
        };

    }

    informStudents() {
        return this.conferenceService.informStudents(this.courseId, this.meetingCode);
    }

    recordActivity(activity) {
        return this.conferenceService.recordActivity(this.meetingCode, activity);
    }


    changeAudio(audio: any, $event: MatCheckboxChange) {
        if ($event.checked) {
            audio = 1;
        } else {
            audio = 0;
        }
        this.conferenceService.changeMicStatus(audio, this.studentEmailToCheck).subscribe(() => {
            this.toaster.success(`Mic status of ${this.studentEmailToCheck} has been changed`);
        });
    }


    changeVideo(video: any, $event: MatCheckboxChange) {
        if ($event.checked) {
            video = 1;
        } else {
            video = 0;
        }
        this.conferenceService.changeCameraStatus(video, this.studentEmailToCheck).subscribe((data) => {
            this.toaster.success(`Mic status of ${this.studentEmailToCheck} has been changed`);

        });

    }

    fetchStudentStats(option: string) {
        this.studentEmailToCheck = option;
        option = option.replace('.com', '');
        this.conferenceService.fetchStudentDevicesInfo(option).subscribe((data: any) => {
            this.audio = data.audio;
            this.video = data.video;
            this.screen = data.screen;
        });
    }
}

