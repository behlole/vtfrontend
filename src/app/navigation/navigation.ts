import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'All Students',
                title    : 'Students',
                translate: 'NAV.STUDENTS.TITLE',
                type     : 'item',
                icon     : 'book',
                url      : '/dashboard/students',
                badge    : {
                    title    : '25',
                    translate: 'NAV.STUDENTS.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                },
            },
            {
                id       : 'All Courses',
                title    : 'Courses',
                translate: 'COURSES.TITLE',
                type     : 'item',
                icon     : 'book',
                url      : 'dashboard/courses',
            }
        ]
    }
];
