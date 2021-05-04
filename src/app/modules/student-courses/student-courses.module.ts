import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {StudentCoursesComponent} from './student-courses.component';
import {
    MatButtonModule,
    MatFormFieldModule, MatGridListModule,
    MatIconModule, MatInputModule,
    MatPaginatorModule, MatSortModule,
    MatTableModule, MatToolbarModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

const appRoutes: Routes = [
    {
        path: 'student-dashboard/courses',
        component: StudentCoursesComponent
    }
];

@NgModule({
    declarations: [StudentCoursesComponent],
    exports: [
        StudentCoursesComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(appRoutes),
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
    ]
})
export class StudentCoursesModule {

}
