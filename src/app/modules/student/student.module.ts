import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import {LoginComponent} from '../authentication/login/login.component';
import {RegisterComponent} from '../authentication/register/register.component';
import {RouterModule} from '@angular/router';
import {AuthGuard} from '../authentication/guards/auth-guard.guard';
import {
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, MatIconModule
} from '@angular/material';
const routes = [
    {
        path: 'dashboard/students',
        component: StudentComponent,
        canActivate:[AuthGuard],
    },
];
@NgModule({
  declarations: [StudentComponent],
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
    ],
    providers:[
        AuthGuard
    ]
})
export class StudentModule { }
