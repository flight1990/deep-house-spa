export const seoRoutes = [
    {
        path: '/seo',
        name: 'seo.index',
        component: () => import("../../pages/seo/index.vue"),
        meta: {
            title: 'SEO',
            middleware: 'guest',
            showInMenu: true
        }
    },
    {
        path: '/seo/create',
        name: 'seo.create',
        component: () => import("../../pages/seo/modify.vue"),
        meta: {
            title: 'Create seo',
            middleware: 'guest',
            showInMenu: false
        }
    },
    {
        path: '/seo/:id/edit',
        name: 'seo.edit',
        component: () => import("../../pages/seo/modify.vue"),
        meta: {
            title: 'Edit seo',
            middleware: 'guest',
            showInMenu: false
        }
    },
];