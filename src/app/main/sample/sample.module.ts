import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { SampleComponent } from './sample.component';
import {
    MatButtonModule,
    MatFormFieldModule, MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule, MatSortModule, MatTableModule, MatToolbarModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {CourseModule} from '../../modules/course/course.module';
import {MeetingModule} from '../../modules/meeting/meeting.module';

const routes = [
    {
        path     : 'sample',
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
    ],
    exports     : [
        SampleComponent
    ]
})

export class SampleModule
{
}
