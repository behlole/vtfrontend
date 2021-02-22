import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course.component';
import {AuthGuard} from '../authentication/guards/auth-guard.guard';
import {RouterModule} from '@angular/router';
const routes=[
    {
        path:'dashboard/courses',
        canActivate:[AuthGuard],
        component:CourseComponent

    }
]
@NgModule({
  declarations: [CourseComponent],
  imports: [
    CommonModule,
      RouterModule.forChild(routes),
  ],
    providers:[
        AuthGuard
    ]
})
export class CourseModule { }
