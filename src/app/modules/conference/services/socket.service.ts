import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
const io=require('socket.io-client');
@Injectable({
    providedIn: 'root'
})
export class SocketService {
    socket:any;
    constructor() {
        this.socket=io(environment.socketServer);
    }
    fetchStudent(email: string) {
        this.socket.htt
    }
    listen(eventName:string){
        return new Observable((subscriber => {
            this.socket.on(eventName,(data)=>{
                subscriber.next(data);
            })
        }))
    }
    emit(eventName:String,data:any)
    {
        this.socket.emit(eventName,data);
    }
}
