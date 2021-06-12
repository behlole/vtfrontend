import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MeetingService} from '../services/meeting.service';
import {ToastrService} from 'ngx-toastr';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'app-meeting-detail',
    templateUrl: './meeting-detail.component.html',
    styleUrls: ['./meeting-detail.component.scss']
})
export class MeetingDetailComponent implements OnInit {
    // @ts-ignore
    @ViewChild(MatSort) sort: MatSort;
    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;
    dataSource: MatTableDataSource<any>;
    displayedColumns: string[] = ['id', 'first_name', 'last_name', 'gender', 'phone_number', 'department', 'city'];
    private meetingCode;
    data: any;

    constructor(
        private route: ActivatedRoute,
        private meetingService: MeetingService,
        private toaster: ToastrService,
        private spinner: NgxSpinnerService,
        private router: Router
    ) {
        this.route.queryParams.subscribe(params => {
            this.meetingCode = params['meeting_code'];
        });
    }

    ngOnInit() {
        this.spinner.show();
        this.dataSource = new MatTableDataSource(); // create new object
        this.patchDetails();
        setTimeout(() => {
            this.spinner.hide();
        }, 1000);
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    openStudentActivityDetail(id) {
        this.router.navigate(['dashboard/meetings/student-activity'], {
            queryParams: {
                'student_id': id,
                'meeting_id': this.data.meeting.id
            }
        });
    }

    private patchDetails() {
        this.meetingService.fetchMeetingDetail(this.meetingCode).subscribe(
            result => {
                this.data = result;
                this.dataSource.data = this.data.student; // on data receive populate dataSource.data array
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error => {
                this.toaster.error(error.message, 'Error');
            }
        );
    }
}
