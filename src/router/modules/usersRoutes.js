export const usersRoutes = [
    {
        path: '/users',
        name: 'users.index',
        component: () => import("../../pages/users/index.vue"),
        meta: {
            title: 'Users',
            middleware: 'guest',
            showInMenu: true
        }
    },
    {
        path: '/users/create',
        name: 'users.create',
        component: () => import("../../pages/users/modify.vue"),
        meta: {
            title: 'Create user',
            middleware: 'guest',
            showInMenu: false
        }
    },
    {
        path: '/users/:id/edit',
        name: 'users.edit',
        component: () => import("../../pages/users/modify.vue"),
        props: true,
        meta: {
            title: 'Edit user',
            middleware: 'guest',
            showInMenu: false
        }
    },
];