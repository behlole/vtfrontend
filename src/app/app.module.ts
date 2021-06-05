import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatIconModule} from '@angular/material/icon';
import {TranslateModule} from '@ngx-translate/core';
import 'hammerjs';

import {FuseModule} from '@fuse/fuse.module';
import {FuseSharedModule} from '@fuse/shared.module';
import {FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule} from '@fuse/components';

import {fuseConfig} from 'app/fuse-config';

import {AppComponent} from 'app/app.component';
import {LayoutModule} from 'app/layout/layout.module';
import {AuthenticationModule} from './modules/authentication/authentication.module';
import {FormsModule} from '@angular/forms';
import {SampleComponent} from './main/sample/sample.component';
import {SampleModule} from './main/sample/sample.module';
import {ToastrModule} from 'ngx-toastr';
import {ConferenceComponent} from './modules/conference/conference.component';
import {AuthGuard} from './modules/authentication/guards/auth-guard.guard';
import {StudentModule} from './modules/student/student.module';
import {CourseModule} from './modules/course/course.module';
import {TeachersModule} from './modules/teachers/teachers.module';
import {StudentCoursesComponent} from './modules/student-courses/student-courses.component';
import {StudentCoursesModule} from './modules/student-courses/student-courses.module';
import {MeetingModule} from './modules/meeting/meeting.module';
import {NgxSpinnerModule} from 'ngx-spinner';
import {MatAutocompleteModule, MatCheckboxModule, MatFormFieldModule, MatSelectModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';

const appRoutes: Routes = [
    {
        path: 'login',
        redirectTo: 'auth/login',
    },
    {
        path: 'register',
        redirectTo: 'auth/register'
    },

    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: SampleComponent,
            },


        ]
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'student-dashboard',
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: StudentCoursesComponent
            }
        ]
    },
    {
        path: 'conference',
        component: ConferenceComponent
    }
];

@NgModule({
    declarations: [
        AppComponent,
        ConferenceComponent,

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        FormsModule,

        // App modules
        LayoutModule,

        // Authentication Module
        AuthenticationModule,

        //Router Module
        RouterModule,

        //Datatable

        ToastrModule,
        //Toastr Module
        ToastrModule.forRoot(),
        SampleModule,
        StudentModule,
        CourseModule,
        TeachersModule,
        StudentCoursesModule,
        MeetingModule,
        NgxSpinnerModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        AuthGuard
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
