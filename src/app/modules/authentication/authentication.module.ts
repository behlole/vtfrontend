import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {RouterModule} from '@angular/router';
import {FuseSharedModule} from '../../../@fuse/shared.module';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import {ToastrModule} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';


const routes = [
    {
        path: 'auth/login',
        component: LoginComponent
    },
    {
        path:'auth/register',
        component:RegisterComponent
    }
];
@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
      CommonModule,
      BrowserAnimationsModule,
      RouterModule.forChild(routes),
      FuseSharedModule,
      MatFormFieldModule,
      MatButtonModule,
      MatCheckboxModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      ToastrModule,
  ]
})
export class AuthenticationModule { }
