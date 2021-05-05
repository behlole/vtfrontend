import {FuseNavigation} from '@fuse/types';

export const StudentNavigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'All Teachers',
                title: 'Teachers',
                translate: 'NAV.TEACHERS.TITLE',
                type: 'item',
                icon: 'book',
                url: '/student-dashboard/teachers',

            },
            {
                id: 'All Courses',
                title: 'Courses',
                translate: 'COURSES.TITLE',
                type: 'item',
                icon: 'book',
                url: '/student-dashboard/courses',
            }
        ]
    }
];
