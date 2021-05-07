import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {FuseSharedModule} from '@fuse/shared.module';

import {ContentComponent} from 'app/layout/components/content/content.component';
import {NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
    declarations: [
        ContentComponent
    ],
    imports: [
        RouterModule,
        FuseSharedModule,
        NgxSpinnerModule
    ],
    exports: [
        ContentComponent
    ]
})
export class ContentModule {
}
