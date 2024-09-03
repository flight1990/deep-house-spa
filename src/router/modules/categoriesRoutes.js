export const categoriesRoutes = [
    {
        path: '/categories',
        name: 'categories.index',
        component: () => import("../../pages/categories/index.vue"),
        meta: {
            title: 'Categories',
            middleware: 'guest',
            showInMenu: true
        }
    },
    {
        path: '/categories/create',
        name: 'categories.create',
        component: () => import("../../pages/categories/modify.vue"),
        meta: {
            title: 'Create category',
            middleware: 'guest',
            showInMenu: false
        }
    },
    {
        path: '/categories/:id/edit',
        name: 'categories.edit',
        component: () => import("../../pages/categories/modify.vue"),
        props: true,
        meta: {
            title: 'Edit category',
            middleware: 'guest',
            showInMenu: false
        }
    },
];