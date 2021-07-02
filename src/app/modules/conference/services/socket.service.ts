import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
const io=require('socket.io-client');
@Injectable({
    providedIn: 'root'
})
export class SocketService {
    socket:any;
}
