export const reviewsRoutes = [
    {
        path: '/reviews',
        name: 'reviews.index',
        component: () => import("../../pages/reviews/index.vue"),
        meta: {
            title: 'Reviews',
            middleware: 'guest',
            showInMenu: true
        }
    },
    {
        path: '/reviews/create',
        name: 'reviews.create',
        component: () => import("../../pages/reviews/modify.vue"),
        meta: {
            title: 'Create review',
            middleware: 'guest',
            showInMenu: false
        }
    },
    {
        path: '/reviews/:id/edit',
        name: 'reviews.edit',
        component: () => import("../../pages/reviews/modify.vue"),
        props: true,
        meta: {
            title: 'Edit review',
            middleware: 'guest',
            showInMenu: false
        }
    },
];