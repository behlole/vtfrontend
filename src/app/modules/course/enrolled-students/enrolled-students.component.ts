import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialogRef} from '@angular/material/dialog';
import {CourseServiceService} from '../services/course-service.service';

@Component({
    selector: 'app-enrolled-students',
    templateUrl: './enrolled-students.component.html',
    styleUrls: ['./enrolled-students.component.scss']
})
export class EnrolledStudentsComponent implements OnInit {
// @ts-ignore
    @ViewChild(MatSort) sort: MatSort;
    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;
    dataSource: MatTableDataSource<any>;
    displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'phone_number', 'gender'];

    constructor(private dialogRef: MatDialogRef<EnrolledStudentsComponent>, private courseService: CourseServiceService) {
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource();
        this.getEnrolled();
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    getEnrolled() {
        this.courseService.getEnrolled(this.courseService.courseId).subscribe((data: []) => {
            this.dataSource.data = data;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            return data;
        });
    }

    close() {
        this.dialogRef.close();
    }
}
