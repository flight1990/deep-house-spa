import defaultLayout from "../layouts/default.vue";

import {usersRoutes} from "./modules/usersRoutes.js";
import {pagesRoutes} from "./modules/pagesRoutes.js";
import {categoriesRoutes} from "./modules/categoriesRoutes.js";
import {menuRoutes} from "./modules/menuRoutes.js";
import {seoRoutes} from "./modules/seoRoutes.js";
import {productsRoutes} from "./modules/productsRoutes.js";
import {reviewsRoutes} from "./modules/reviewsRoutes.js";

export const routes = [
    {
        path: '/',
        component: defaultLayout,
        children: [
            {
                path: '/',
                name: 'index',
                component: () => import("../pages/index.vue"),
                meta: {
                    title: 'Home',
                    middleware: 'guest',
                    showInMenu: true
                }
            },
            ...usersRoutes,
            ...pagesRoutes,
            ...categoriesRoutes,
            ...menuRoutes,
            ...seoRoutes,
            ...productsRoutes,
            ...reviewsRoutes
        ]
    }
];