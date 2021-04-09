import {FuseNavigation} from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id: 'All Students',
                title: 'Students',
                translate: 'NAV.STUDENTS.TITLE',
                type: 'item',
                icon: 'school',
                url: 'dashboard/students',
            },
            {
                id: 'All Courses',
                title: 'Courses',
                translate: 'COURSES.TITLE',
                type: 'item',
                icon: 'book',
                url: 'dashboard/courses',
            },
            {
                id: 'All Meetings',
                title: 'Meetings',
                translate: 'MEETINGS.TITLE',
                type: 'item',
                icon: 'stars',
                url: 'dashboard/meetings',
            }
        ]
    }
];
