import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/internal/operators';

import {FuseConfigService} from '@fuse/services/config.service';
import {fuseAnimations} from '@fuse/animations';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class RegisterComponent implements OnInit, OnDestroy {
    registerForm: FormGroup;
    departments = [
        {id: 'software_engineering', value: 'Software Engineering'},
        {id: 'computer_science', value: 'Computer Science'},
        {id: 'electrical_engineering', value: 'Electrical Engineering'},
        {id: 'bba', value: 'Bachelors in Business and Administration'}
    ];
    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private authService: AuthenticationService,
        private router:Router,
        private toaster:ToastrService
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.registerForm = this._formBuilder.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            gender: ['male', Validators.required],
            phone_number: ['', Validators.required],
            city: ['', Validators.required],
            department: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]],
            role_type: [1, Validators.required]
        });

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.registerForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.registerForm.get('passwordConfirm').updateValueAndValidity();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    register() {
        var route=this.router;
        var toaster=this.toaster;
        this.authService.register(this.registerForm.value).subscribe((data) => {
                localStorage.setItem('user',JSON.stringify(data));
                console.log(data);
                // route.navigate(['dashboard'])
                route.navigateByUrl('/dashboard');
                toaster.success("Success","Logged in Successfully!")
            },
            (error) => {
                toaster.error("Error",error.message);
            });


    }
}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if ( !control.parent || !control )
    {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if ( !password || !passwordConfirm )
    {
        return null;
    }

    if ( passwordConfirm.value === '' )
    {
        return null;
    }

    if ( password.value === passwordConfirm.value )
    {
        return null;
    }

    return {passwordsNotMatching: true};
};
