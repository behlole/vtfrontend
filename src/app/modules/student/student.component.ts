import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {StudentServiceService} from './services/student-service.service';

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

    students;
    paginator: MatPaginator;
    dataSource: MatTableDataSource<any>;
    displayedColumns: string[] = ['id', 'first_name', 'last_name','actions'];
    @ViewChild(MatSort) sort:MatSort;
    @ViewChild(MatPaginator) paginator:MatPaginator;
    constructor(
        private studentService: StudentServiceService
    ) {
    }

    // Get All Students of teacher


    ngOnInit(): void {

        this.dataSource = new MatTableDataSource(); // create new object
        this.getStudents(); // forgeted this line


    }

    getStudents() {
        this.studentService.getAllStudents().subscribe((data: []) => {
                console.log(data);
                console.log('Laps');
                this.dataSource.data = data; // on data receive populate dataSource.data array
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
                return data;
            }
        );
    }
}



