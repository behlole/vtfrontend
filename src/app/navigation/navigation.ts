import {FuseNavigation} from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'Dashboard',
                title: 'Dashboard',
                translate: 'Dashboard',
                type: 'item',
                icon: 'home',
                url: 'dashboard',
            },
            {
                id: 'All Students',
                title: 'Students',
                translate: 'NAV.Main.TITLE',
                type: 'collapsable',
                children:[
                    {
                        id: 'All Students',
                        title: 'All Students',
                        translate: 'NAV.STUDENTS.TITLE',
                        type: 'item',
                        icon: 'school',
                        url: 'dashboard/students',

                    },
                    {
                        id: 'All Students',
                        title: 'Enrolled Students',
                        translate: 'NAV.Enrolled.TITLE',
                        type: 'item',
                        icon: 'school',
                        url: 'dashboard/enrolled-students',

                    }
                ]
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
            },
            {
                id: 'Organize Quiz',
                title: 'Quizzes',
                translate: 'MEETINGS.Quiz',
                type: 'item',
                icon: 'stars',
                url: 'https://qms.qalamguru.com/',
            }
        ]
    }
];
