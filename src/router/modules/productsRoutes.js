export const productsRoutes = [
    {
        path: '/products',
        name: 'products.index',
        component: () => import("../../pages/products/index.vue"),
        meta: {
            title: 'Products',
            middleware: 'guest',
            showInMenu: true
        }
    },
    {
        path: '/products/create',
        name: 'products.create',
        component: () => import("../../pages/products/modify.vue"),
        meta: {
            title: 'Create product',
            middleware: 'guest',
            showInMenu: false
        }
    },
    {
        path: '/products/:id/edit',
        name: 'products.edit',
        component: () => import("../../pages/products/modify.vue"),
        meta: {
            title: 'Edit product',
            middleware: 'guest',
            showInMenu: false
        }
    },
];