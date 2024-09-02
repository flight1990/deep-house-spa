export const menuRoutes = [
    {
        path: '/menu',
        name: 'menu.index',
        component: () => import("../../pages/menu/index.vue"),
        meta: {
            title: 'Menu',
            middleware: 'guest',
            showInMenu: true
        }
    },
    {
        path: '/menu/create',
        name: 'menu.create',
        component: () => import("../../pages/menu/modify.vue"),
        meta: {
            title: 'Create menu item',
            middleware: 'guest',
            showInMenu: false
        }
    },
    {
        path: '/menu/:id/edit',
        name: 'menu.edit',
        component: () => import("../../pages/menu/modify.vue"),
        meta: {
            title: 'Edit menu item',
            middleware: 'guest',
            showInMenu: false
        }
    },
];