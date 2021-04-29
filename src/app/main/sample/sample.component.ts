import {Component} from '@angular/core';

import {FuseTranslationLoaderService} from '@fuse/services/translation-loader.service';

import {locale as english} from './i18n/en';
import {locale as turkish} from './i18n/tr';

@Component({
    selector: 'sample',
    templateUrl: './sample.component.html',
    styleUrls: ['./sample.component.scss']
})
export class SampleComponent {
    roleType: String;
    data: any;

    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
    }

    ngOnInit() {

        this.data = JSON.parse(localStorage.getItem('user'));
        if (this.data.user.role_type == 1) {
            this.roleType = 'teacher';
        } else {
            this.roleType = 'student';
        }
    }


}
