import {Component, ViewEncapsulation} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProfileComponent {
    first_name: any;
    last_name: any;

    /**
     * Constructor
     */
    constructor() {
        this.assignNme();
    }

    assignNme() {
        if (localStorage.getItem('user')) {
            let data = JSON.parse(localStorage.getItem('user'));
            this.first_name = data.user.first_name;
            this.last_name = data.user.last_name;
        }
    }
}
