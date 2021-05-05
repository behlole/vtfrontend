import {
    HttpClient,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
    constructor(private router: Router, private toasterService: ToastrService, private http: HttpClient) {
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let tokenizeReq;

        if (localStorage.getItem('user')) {
            let token = JSON.parse(localStorage.getItem('user'));
            tokenizeReq = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token.token
                }
            });
        } else {
            tokenizeReq = req.clone({
                setHeaders: {
                    Authorization: ''
                }
            });
        }


        return next.handle(tokenizeReq).pipe(
            tap(evt => {
            }),
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status == 401) {
                        localStorage.removeItem('token');
                        this.toasterService.error('Please log in again !', 'Session Expired');
                        this.router.navigate(['/login']);
                    }
                    //log error
                }
                return of(err);
            }));

    }

}

