import {Component} from '@angular/core';

import {FuseTranslationLoaderService} from '@fuse/services/translation-loader.service';

import {locale as english} from './i18n/en';
import {locale as turkish} from './i18n/tr';
import {FuseNavigationService} from '../../../@fuse/components/navigation/navigation.service';

@Component({
    selector: 'sample',
    templateUrl: './sample.component.html',
    styleUrls: ['./sample.component.scss']
})
export class SampleComponent {
    roleType: String;
    data: any;

    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private fuseNavigation: FuseNavigationService
    ) {
        let nav:any=this.fuseNavigation.getNavigation('main')[0];
        if (nav.children.length>1)
        {
        }
        else
        {
            window.location.reload();
        }
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
