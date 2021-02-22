import {Component, OnInit} from '@angular/core';
import Peer from 'peerjs';

@Component({
    selector: 'app-conference',
    templateUrl: './conference.component.html',
    styleUrls: ['./conference.component.scss']
})
export class ConferenceComponent implements OnInit {

    private peer: Peer;
    peerId: string;
    peerIdShare: string;
    private lazyStream: any;
    currentPeer: any;
    private peerList: Array<any> = [];

    constructor() {
        this.peer = new Peer();
    }

    ngOnInit() {
        this.getPeerId();
    }

    private getPeerId = () => {
        this.peer.on('open', (id) => {
            this.peerId = id;
        });
    };

    connectWithPeer() {
        this.callPeer(this.peerIdShare);
    }

    private callPeer(id: string): void {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then((stream) => {
            this.lazyStream = stream;

            const call = this.peer.call(id, stream);
            call.on('stream', (remoteStream) => {
                if (!this.peerList.includes(call.peer)) {
                    this.streamRemoteVideo(remoteStream);
                    this.currentPeer = call.peerConnection;
                    this.peerList.push(call.peer);
                }
            });
        }).catch(err => {
            console.log(err + 'Unable to connect');
        });
    }


    private streamRemoteVideo(stream) {
        const video = document.createElement('video');
        video.classList.add('video');
        video.srcObject = stream;
        video.play();
        document.getElementById('remote-video').append(video);
    }

    private screenShare() {
        // @ts-ignore
        navigator.mediaDevices.getDisplayMedia({
            video: {
                cursor: 'always'
            },
            audio: {
                echoCancellation: true,
                noiseSuppression: true
            }
        }).then(stream => {
            const videoTrack = stream.getVideoTracks()[0];
            videoTrack.onended = () => {
                this.stopScreenShare();
            };

            const sender = this.currentPeer.getSenders().find(s => s.track.kind === videoTrack.kind);
            sender.replaceTrack(videoTrack);
        }).catch(err => {
            console.log('Unable to get display media ' + err);
        });
    }

    private stopScreenShare() {
        const videoTrack = this.lazyStream.getVideoTracks()[0];
        const sender = this.currentPeer.getSenders().find(s => s.track.kind === videoTrack.kind);
        sender.replaceTrack(videoTrack);
    }
}
