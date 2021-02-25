import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpEvent,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {tap, catchError} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
    constructor(private router: Router, private toasterService: ToastrService) {
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let tokenizeReq = req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });
        return next.handle(tokenizeReq).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {
                    if (evt.body && evt.body.success) {
                        this.toasterService.success(evt.body.success.message, evt.body.success.title, {positionClass: 'toast-bottom-center'});
                    }
                }
            }),
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    try {
                        this.toasterService.error(err.error.message, err.error.title, {positionClass: 'toast-bottom-center'});
                    } catch (e) {
                        this.toasterService.error('An error occurred', '', {positionClass: 'toast-bottom-center'});
                    }
                    //log error
                }
                return of(err);
            }));

    }

}

