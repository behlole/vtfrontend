import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {StudentServiceService} from './services/student-service.service';
import {MatFormField, MatInput, MatDialog, MatDialogConfig} from '@angular/material';
import {AddstudentComponent} from './addstudent/addstudent.component';
import {error} from 'util';
import {ToastrService} from 'ngx-toastr';
import {EnrollStudentComponent} from './enroll-student/enroll-student.component';

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

    students;
    // @ts-ignore
    @ViewChild(MatSort) sort: MatSort;
    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;
    dataSource: MatTableDataSource<any>;
    displayedColumns: string[] = ['id', 'first_name', 'last_name', 'gender', 'phone_number', 'department', 'city', 'actions'];

    constructor(
        private studentService: StudentServiceService,
        private dialog: MatDialog,
        private toaster:ToastrService
    ) {
    }

    // Get All Students of teacher


    ngOnInit(): void {

        this.dataSource = new MatTableDataSource(); // create new object
        this.getStudents(); // forgeted this line


    }

    getStudents() {
        this.studentService.getAllStudents().subscribe((data: []) => {
                this.dataSource.data = data; // on data receive populate dataSource.data array
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                return data;
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

    create() {
        this.studentService.initializeForm();
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '60%';
        this.dialog.open(AddstudentComponent, dialogConfig);
    }

    onEdit(row) {
        this.studentService.patchValues(row);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '60%';
        let dialoagRef = this.dialog.open(AddstudentComponent, dialogConfig);
        dialoagRef.afterClosed().subscribe((confirmed: boolean) => {
            if (confirmed) {
                this.getStudents();
            }
        });
    }
    onDelete(row)
    {
        this.studentService.deleteStudent(row.id).subscribe((data)=>{
            this.toaster.success("Student deleted successfully");
            this.getStudents();
        },(error)=>{
            console.log(error.message);
            this.toaster.error("Something bad happened");
        });
    }

    openEnrolDialog(row) {
        var studentService = this.studentService.courseForm.patchValue({
            student_id:row.id,
        })
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '60%';
        let dialoagRef = this.dialog.open(EnrollStudentComponent, dialogConfig);
        dialoagRef.afterClosed().subscribe((confirmed: boolean) => {
            if (confirmed) {
                this.getStudents();
            }
        });
    }
}

