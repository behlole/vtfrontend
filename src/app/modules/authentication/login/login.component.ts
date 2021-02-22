import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import {AuthenticationService} from '../services/authentication.service';
import { Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private authenticationService:AuthenticationService,
        private router:Router,
        private toaster:ToastrService
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }
    login(){
        var route=this.router;
        var toaster=this.toaster;
        let data={
            'email':this.loginForm.getRawValue().email,
            'password':this.loginForm.getRawValue().password
        }
        this.authenticationService.login(data).subscribe({
            next(data){
                localStorage.setItem('token',data['token'],);
                localStorage.setItem('email',data['user'].email);
                localStorage.setItem('user_id',data['user'].id);
                localStorage.setItem('role_type',data['user'].role_type);
                localStorage.setItem('role_id',data['user'].role_id);
                localStorage.setItem('first_name',data['user'].first_name);
                localStorage.setItem('last_name',data['user'].last_name);
                localStorage.setItem('profile_pic',data['user'].profile_pic);
                route.navigate(['dashboard'])
                toaster.success("Success","Logged in Successfully!")

            },
            error(message){
                console.log(message);
                toaster.error("Error",message.message);
            }
        });



    }
}
