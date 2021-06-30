import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {SampleComponent} from './sample.component';
import {
    MatButtonModule, MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {CourseModule} from '../../modules/course/course.module';
import {MeetingModule} from '../../modules/meeting/meeting.module';
import {TeachersModule} from '../../modules/teachers/teachers.module';
import {StudentCoursesModule} from '../../modules/student-courses/student-courses.module';

const routes = [
    {
        path: 'sample',
        component: SampleComponent
    }
];

@NgModule({
    declarations: [
        SampleComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule,
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
        CourseModule,
        MeetingModule,
        TeachersModule,
        StudentCoursesModule,
        MatCardModule,
    ],
    exports: [
        SampleComponent
    ]
})

export class SampleModule {
}
