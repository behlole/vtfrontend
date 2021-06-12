import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';
import {FuseNavigationService} from '../../../../@fuse/components/navigation/navigation.service';
import {GuestNavigation} from '../../../navigation/GuestNavigation';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    navigation:any;
    constructor(
        private _http: HttpClient,
        private router: Router,
        private fuseNavigation:FuseNavigationService
    ) {
    }
    login(data) {
        return this._http.post(environment.url + 'auth/login', data);
    }

    logout() {
        localStorage.removeItem('user');
        this.router.navigate((['/login']));
        this.fuseNavigation.unregister('main');

    }

    loggedIn() {
        return !!JSON.parse(localStorage.getItem('user'));
    }

    register(value: any) {
        return this._http.post(environment.url + 'auth/register', value);
    }
}
