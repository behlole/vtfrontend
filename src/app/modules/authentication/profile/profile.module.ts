import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';

import {FuseSharedModule} from '@fuse/shared.module';
import {ProfileComponent} from './profile.component';
import {ProfileService} from '../profile.service';
import {ProfileTimelineComponent} from './tabs/timeline/timeline.component';
import {ProfileAboutComponent} from './tabs/about/about.component';
import {ProfilePhotosVideosComponent} from './tabs/photos-videos/photos-videos.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import {
    MatFormFieldModule,
    MatGridListModule,
    MatToolbarModule,
    MatInputModule,
    MatDatepickerModule, MatRadioModule, MatSelectModule
} from '@angular/material';


const routes = [
    {
        path: 'profile',
        component: ProfileComponent,
        resolve: {
            profile: ProfileService
        }
    }
];

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileTimelineComponent,
        ProfileAboutComponent,
        ProfilePhotosVideosComponent,
        EditProfileComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,

        FuseSharedModule,
        MatToolbarModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatRadioModule,
        MatSelectModule
    ],
    providers: [
        ProfileService
    ],
    entryComponents:[
        EditProfileComponent
    ]
})
export class ProfileModule {
}
