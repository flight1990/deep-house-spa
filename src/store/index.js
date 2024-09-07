import {createStore} from "vuex";
import usersStore from "./modules/usersStore.js";
import pagesStore from "./modules/pagesStore.js";
import productsStore from "./modules/productsStore.js";
import categoriesStore from "./modules/categoriesStore.js";
import seoStore from "./modules/seoStore.js";
import menuStore from "./modules/menuStore.js";
import reviewsStore from "./modules/reviewsStore.js";

const store = createStore({
    modules: {
        usersStore,
        pagesStore,
        productsStore,
        categoriesStore,
        seoStore,
        menuStore,
        reviewsStore
    }
});

export default store;