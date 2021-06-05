import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class SocketService {

    private socket;

    constructor() {
    }

    connect() {
        // @ts-ignore
        this.socket = io(environment.socketServer);

        // We define our observable which will observe any incoming messages
        // from our socket.io server.
        let observable = new Observable(observer => {
            this.socket.on('message', (data) => {
                console.log('Received message from Websocket Server');
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        let observer = {
            next: (data: Object) => {
                this.socket.emit('message', JSON.stringify(data));
            },
        };

        // we return our Rx.Subject which is a combination
        // of both an observer and observable.
    }
}
