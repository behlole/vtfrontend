import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentComponent} from './student.component';
import {RouterModule} from '@angular/router';
import {AuthGuard} from '../authentication/guards/auth-guard.guard';
import {
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
} from '@angular/material';
import {AddstudentComponent} from './addstudent/addstudent.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FuseSharedModule} from '../../../@fuse/shared.module';
import {StudentServiceService} from './services/student-service.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptorService} from '../authentication/services/token-interceptor.service';
import {EnrollStudentComponent} from './enroll-student/enroll-student.component';

const routes = [
    {
        path: 'dashboard/students',
        component: StudentComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    declarations: [StudentComponent, AddstudentComponent, EnrollStudentComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatCardModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatGridListModule,
        MatRadioModule,
        MatDatepickerModule,
        FuseSharedModule,
        MatToolbarModule

    ],
    providers: [
        AuthGuard, StudentServiceService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true,
        }
    ],
    exports: [
        AddstudentComponent,
        StudentComponent
    ],
    entryComponents: [
        AddstudentComponent,
        EnrollStudentComponent
    ]
})
export class StudentModule {
}
