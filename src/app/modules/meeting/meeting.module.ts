import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AllMeetingsComponent} from './all-meetings/all-meetings.component';
import {AuthGuard} from '../authentication/guards/auth-guard.guard';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptorService} from '../authentication/services/token-interceptor.service';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {MeetingDetailComponent} from './meeting-detail/meeting-detail.component';
import {StudentModule} from '../student/student.module';
import {StudentActivityComponent} from './student-activity/student-activity.component';

const routes = [
    {
        path: 'dashboard/meetings',
        canActivate: [AuthGuard],
        component: AllMeetingsComponent
    },
    {
        path: 'dashboard/meeting-detail',
        canActivate: [AuthGuard],
        component: MeetingDetailComponent
    },
    {
        path: 'dashboard/meetings/student-activity',
        canActivate: [AuthGuard],
        component: StudentActivityComponent
    }
];

@NgModule({
    declarations: [AllMeetingsComponent, MeetingDetailComponent, StudentActivityComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatTableModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatGridListModule,
        MatSortModule,
        StudentModule,
    ],
    providers: [
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true,
        }
    ],
    exports: [
        AllMeetingsComponent
    ]
})
export class MeetingModule {
}
