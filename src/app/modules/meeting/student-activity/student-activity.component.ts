import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MeetingService} from '../services/meeting.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-student-activity',
    templateUrl: './student-activity.component.html',
    styleUrls: ['./student-activity.component.scss']
})
export class StudentActivityComponent implements OnInit {
    // @ts-ignore
    @ViewChild(MatSort) sort: MatSort;
    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;
    dataSource: MatTableDataSource<any>;
    displayedColumns: string[] = ['id', 'activity_type', 'time', 'date'];
    meeting_id;
    student_id;
    data: any;
    studentData: any;

    constructor(
        private route: ActivatedRoute,
        private meetingService: MeetingService,
        private spinner: NgxSpinnerService,
        private toaster: ToastrService
    ) {
        this.route.queryParams.subscribe(params => {
            this.meeting_id = params['meeting_id'];
            this.student_id = params['student_id'];
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

    private patchDetails() {
        this.meetingService.fetchStudentActivityRecord(this.student_id, this.meeting_id).subscribe(
            result => {
                this.data = result;
                // let arr=[];
                // console.log(result);
                // Object.keys(result).map(function(key){
                //     arr.push({[key]:result[key]})
                //     return arr;
                // });
                // console.log(arr);
                let data=[];
                for (const key in result) {
                    data.push({ key, value: result[key] });
                }
                this.dataSource.data =data; // on data receive populate dataSource.data array
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;

            },
            error => {
                this.toaster.error(error.message, 'Error');
            }
        );

        this.meetingService.fetchStudent(this.student_id).subscribe(
            result => {
                this.studentData = result;
            }
        );
    }
}
