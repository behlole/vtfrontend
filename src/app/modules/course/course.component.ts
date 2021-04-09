import {Component, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {CourseServiceService} from './services/course-service.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {AddCourseComponent} from './add-course/add-course.component';
import {EnrolledStudentsComponent} from './enrolled-students/enrolled-students.component';

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
// @ts-ignore
    @ViewChild(MatSort) sort: MatSort;
    // @ts-ignore
    @ViewChild(MatPaginator) paginator: MatPaginator;
    dataSource: MatTableDataSource<any>;

    displayedColumns: string[] = ['id', 'name', 'students', 'actions'];
    roleType:String
    data:any;
    constructor(
        private toaster: ToastrService,
        private courseService: CourseServiceService,
        private dialog: MatDialog,
    ) {
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource();
        this.getCourses();
        this.data=JSON.parse(localStorage.getItem('user'));
        if(this.data.user.role_type==1)
        {
            this.roleType='teacher';
        }
        else
        {
            this.roleType='student';
        }
    }

    getCourses() {
        this.courseService.getAllCourses().subscribe((data: []) => {
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

    create() {
        this.courseService.initializeForm();
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '30%';
        let dialogRef = this.dialog.open(AddCourseComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((completed) => {
            this.getCourses();
        });
    }

    onEdit(row) {
        this.courseService.patchValue(row);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '30%';
        let dialogRef = this.dialog.open(AddCourseComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((completed) => {
            if (completed == true) {
                this.getCourses();
            }
        });
    }

    onDelete(row) {
        this.courseService.deleteCourse(row.id).subscribe((data) => {
            this.toaster.success('Course has been deleted successfully');
            this.getCourses();
        });
    }

    listEnrolled(row: any) {
        this.courseService.courseId = row.id;
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '60%';
        let dialogRef = this.dialog.open(EnrolledStudentsComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((completed) => {
            if (completed == true) {
                this.getCourses();
            }
        });
        // this.courseService.getEnrolled(row.id).subscribe((data:any)=>{
        //    if(data.error)
        //    {
        //        this.toaster.error(data.message)
        //    }
        //    else
        //    {
        //        const dialogConfig = new MatDialogConfig();
        //        dialogConfig.disableClose = true;
        //        dialogConfig.autoFocus = true;
        //        dialogConfig.width = '60%';
        //        let dialogRef=this.dialog.open(EnrolledStudentsComponent, dialogConfig);
        //        dialogRef.afterClosed().subscribe((completed)=>{
        //            if(completed==true)
        //            {
        //                this.getCourses();
        //            }
        //        })
        //    }
        // });
    }

    joinMeeting(row) {
        
    }
}
