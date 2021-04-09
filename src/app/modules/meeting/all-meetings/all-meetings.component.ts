import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ToastrService} from 'ngx-toastr';
import {CourseServiceService} from '../../course/services/course-service.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {AddCourseComponent} from '../../course/add-course/add-course.component';
import {EnrolledStudentsComponent} from '../../course/enrolled-students/enrolled-students.component';
import {MeetingService} from '../services/meeting.service';

@Component({
  selector: 'app-all-meetings',
  templateUrl: './all-meetings.component.html',
  styleUrls: ['./all-meetings.component.scss']
})
export class AllMeetingsComponent implements OnInit {
    // @ts-ignore
    @ViewChild(MatSort) sort: MatSort;
    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;
    dataSource: MatTableDataSource<any>;

    displayedColumns: string[] = ['id','course_name','meeting_code','date'];
    roleType: String
    data: any;

    constructor(
        private toaster: ToastrService,
        private meetingService: MeetingService,
        private dialog: MatDialog,
    ) {
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource();
        this.getMeetings();
    }

    getMeetings() {
        this.meetingService.getAllMeetings().subscribe((data: []) => {
            this.dataSource.data = data;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            return data;
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    onOpen(row) {
        this.meetingService.patchValue(row);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '30%';
        let dialogRef = this.dialog.open(AddCourseComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((completed) => {
            if (completed == true) {
                this.getMeetings();
            }
        });
    }

    onDelete(row) {
        this.meetingService.deleteMeeting(row.id).subscribe((data) => {
            this.toaster.success('Course has been deleted successfully');
            this.getMeetings();
        });
    }
}
