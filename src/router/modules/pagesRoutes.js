export const pagesRoutes = [
    {
        path: '/pages',
        name: 'pages.index',
        component: () => import("../../pages/pages/index.vue"),
        meta: {
            title: 'Pages',
            middleware: 'guest',
            showInMenu: true
        }
    },
    {
        path: '/pages/create',
        name: 'pages.create',
        component: () => import("../../pages/pages/modify.vue"),
        meta: {
            title: 'Create page',
            middleware: 'guest',
            showInMenu: false
        }
    },
    {
        path: '/pages/:id/edit',
        name: 'pages.edit',
        component: () => import("../../pages/pages/modify.vue"),
        props: true,
        meta: {
            title: 'Edit page',
            middleware: 'guest',
            showInMenu: false
        }
    },
];