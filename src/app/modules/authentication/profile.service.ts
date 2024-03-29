import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class ProfileService {
    timeline: any;
    about: any;
    photosVideos: any;

    timelineOnChanged: BehaviorSubject<any>;
    aboutOnChanged: BehaviorSubject<any>;
    photosVideosOnChanged: BehaviorSubject<any>;
    id: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {
        // Set the defaults
        // this.timelineOnChanged = new BehaviorSubject({});
        this.aboutOnChanged = new BehaviorSubject({});
        // this.photosVideosOnChanged = new BehaviorSubject({});
    }

    getUserDetail() {
        return this._httpClient.get(environment.url + '/user/get-user');
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    // {
    //     return new Promise((resolve, reject) => {
    //         Promise.all([
    //             // this.getTimeline(),
    //             this.getAbout(),
    //             // this.getPhotosVideos()
    //         ]).then(
    //             () => {
    //                 resolve();
    //             },
    //             reject
    //         );
    //     });
    // }
    //
    // /**
    //  * Get timeline
    //  */
    // getTimeline(): Promise<any[]>
    // {
    //     return new Promise((resolve, reject) => {
    //
    //         this._httpClient.get('teacher/profile')
    //             .subscribe((timeline: any) => {
    //                 this.timeline = timeline;
    //                 this.timelineOnChanged.next(this.timeline);
    //                 resolve(this.timeline);
    //             }, reject);
    //     });
    // }

    /**
     * Get about
     */
    getAbout() {

        return this._httpClient.get(environment.url + 'profile');
    }

    /**
     * Get photos & videos
     */
    getPhotosVideos(): Promise<any[]> {
        return new Promise((resolve, reject) => {

            this._httpClient.get('teacher/profile')
                .subscribe((photosVideos: any) => {
                    this.photosVideos = photosVideos;
                    this.photosVideosOnChanged.next(this.photosVideos);
                    resolve(this.photosVideos);
                }, reject);
        });
    }

    submitEditUserData(userData:any) {
        var role_type=JSON.parse(localStorage.getItem('user')).user.role_type;
        return this._httpClient.post(environment.url+`/user/submit-edit/${role_type}`,userData)
    }

    changePassword(new_password) {
        return this._httpClient.post(environment.url+'/user/change-password',new_password);

    }
}
