import { FuseNavigation } from '@fuse/types';

export const GuestNavigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'Guest',
                title    : 'Guest',
                translate: 'NAV.GUEST.TITLE',
                type     : 'item',
                icon     : 'book',
                // url      : '/student-dashboard/teachers',

            },
            // {
            //     id       : 'All Courses',
            //     title    : 'Courses',
            //     translate: 'COURSES.TITLE',
            //     type     : 'item',
            //     icon     : 'book',
            //     // url      : 'student-dashboard/courses',
            // }
        ]
    }
];
