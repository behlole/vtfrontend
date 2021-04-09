import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersComponent } from './teachers.component';
import {MatFormFieldModule, MatIconModule, MatPaginatorModule, MatTableModule} from '@angular/material';
import {AuthGuard} from '../authentication/guards/auth-guard.guard';
import {StudentServiceService} from '../student/services/student-service.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptorService} from '../authentication/services/token-interceptor.service';
import {RouterModule} from '@angular/router';
const routes=[
    {
        path: 'student-dashboard/teachers',
        component: TeachersComponent
    }
]
@NgModule({
  declarations: [TeachersComponent],
    imports: [
        CommonModule,
        MatIconModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatTableModule,
        RouterModule.forChild(routes)
    ],
    providers:[
        AuthGuard,StudentServiceService,
        {
            provide:HTTP_INTERCEPTORS,
            useClass:TokenInterceptorService,
            multi:true,
        },
    ],
})
export class TeachersModule { }