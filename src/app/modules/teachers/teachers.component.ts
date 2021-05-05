import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {TeacherService} from './services/teacher.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'app-teachers',
    templateUrl: './teachers.component.html',
    styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

    students;
    // @ts-ignore
    @ViewChild(MatSort) sort: MatSort;
    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;
    dataSource: MatTableDataSource<any>;
    displayedColumns: string[] = ['id', 'first_name', 'last_name', 'gender', 'phone_number', 'department'];

    constructor(
        private teacherService: TeacherService,
        private dialog: MatDialog,
        private toaster: ToastrService,
        private spinner: NgxSpinnerService
    ) {
    }

    // Get All Teachers of Student


    ngOnInit(): void {
        this.spinner.show();
        this.dataSource = new MatTableDataSource(); // create new object
        this.getTeachers();
        this.spinner.hide();


    }

    getTeachers() {
        this.teacherService.getAllTeachers().subscribe((data: []) => {
                this.dataSource.data = data; // on data receive populate dataSource.data array
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }
        );
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }


}
