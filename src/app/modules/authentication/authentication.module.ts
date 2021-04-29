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
import {MatRadioModule, MatSelectModule, MatTabsModule} from '@angular/material';
import { ProfileComponent } from './profile/profile.component';
import {ProfileModule} from './profile/profile.module';


const routes = [
    {
        path: 'auth/login',
        component: LoginComponent
    },
    {
        path:'auth/register',
        component:RegisterComponent
    },
    {
        path:'auth/profile',
        component:ProfileComponent
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
        MatRadioModule,
        MatInputModule,
        MatSelectModule,
        ProfileModule,
        MatTabsModule,
    ]
})
export class AuthenticationModule { }
