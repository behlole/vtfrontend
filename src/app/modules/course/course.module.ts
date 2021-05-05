import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CourseComponent} from './course.component';
import {AuthGuard} from '../authentication/guards/auth-guard.guard';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptorService} from '../authentication/services/token-interceptor.service';
import {AddCourseComponent} from './add-course/add-course.component';
import {CourseServiceService} from './services/course-service.service';
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
import {EnrolledStudentsComponent} from './enrolled-students/enrolled-students.component';

const routes = [
    {
        path: 'dashboard/courses',
        canActivate: [AuthGuard],
        component: CourseComponent
    },
];

@NgModule({
    declarations: [CourseComponent, AddCourseComponent, EnrolledStudentsComponent],
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
    ],
    providers: [
        AuthGuard, CourseServiceService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true,
        }
    ],
    exports: [
        CourseComponent
    ],
    entryComponents: [
        AddCourseComponent,
        EnrolledStudentsComponent
    ]

})
export class CourseModule {
}
