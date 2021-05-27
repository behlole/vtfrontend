import {Component, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material';
import {CourseServiceService} from '../course/services/course-service.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'app-student-courses',
    templateUrl: './student-courses.component.html',
    styleUrls: ['./student-courses.component.scss']
})
export class StudentCoursesComponent implements OnInit {
// @ts-ignore
    @ViewChild(MatSort) sort: MatSort;
    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;
    dataSource: MatTableDataSource<any>;

    displayedColumns: string[] = ['id', 'name', 'actions'];
    roleType: String;
    data: any;

    constructor(
        private toaster: ToastrService,
        private courseService: CourseServiceService,
        private dialog: MatDialog,
        private spinner: NgxSpinnerService
    ) {
    }

    ngOnInit() {
        this.spinner.show();
        this.dataSource = new MatTableDataSource();
        this.getCourses();
        this.data = JSON.parse(localStorage.getItem('user'));
        if (this.data.user.role_type == 1) {
            this.roleType = 'teacher';
        } else {
            this.roleType = 'student';
        }
        setTimeout(() => {
            this.spinner.hide();
        }, 1000);
    }

    getCourses() {
        this.courseService.getAllCoursesForStudent().subscribe((data: []) => {
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

    joinMeeting(row) {

    }
}
