import {Component} from '@angular/core';

import {FuseTranslationLoaderService} from '@fuse/services/translation-loader.service';

import {locale as english} from './i18n/en';
import {locale as turkish} from './i18n/tr';
import {FuseNavigationService} from '../../../@fuse/components/navigation/navigation.service';
import {CourseServiceService} from '../../modules/course/services/course-service.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'sample',
    templateUrl: './sample.component.html',
    styleUrls: ['./sample.component.scss']
})
export class SampleComponent {
    roleType: String;
    data: any;
    private course: any;
    courseForStudent: any;

    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private fuseNavigation: FuseNavigationService,
        private courseService: CourseServiceService,
        private toaster: ToastrService
    ) {
        let nav:any=this.fuseNavigation.getNavigation('main')[0];
        if (nav.children.length>1)
        {
        }
        else
        {
            window.location.reload();
        }
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
    }

    ngOnInit() {

        this.data = JSON.parse(localStorage.getItem('user'));
        if (this.data.user.role_type == 1) {
            this.roleType = 'teacher';
            this.getCourses();

        } else {
            this.roleType = 'student';
            this.getCoursesForStudent();
        }
    }

    getCourses() {
        this.courseService.getAllCourses().subscribe((data: []) => {
            this.course = data;
            return data;
        });
    }

    onDelete(courseSingle: any) {
        this.courseService.deleteCourse(courseSingle.id).subscribe((data) => {
            this.toaster.success('Course has been deleted successfully');
            this.getCourses();
        });
    }

    getCoursesForStudent() {
        this.courseService.getAllCoursesForStudent().subscribe((data: []) => {
            this.courseForStudent=data;
        });
    }
}
