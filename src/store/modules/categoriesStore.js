import {initializeCommonState, commonGetters, commonMutations, commonActions} from "./commonStore.js";
import CategoriesRepository from "../../repository/CategoriesRepository.js";
import router from "../../router/index.js";

const commonState = initializeCommonState();

const state = {
    ...commonState,
}

const getters = {
    ...commonGetters
}

const mutations = {
    ...commonMutations
}

const actions = {
    ...commonActions,
    async fetchItems({commit, getters}, params = {}) {
        try {
            commit('SET_LOADING', true)
            commit('SET_PARAMS', params)

            const {data} = await CategoriesRepository.getAll(getters.params);
            commit('SET_ITEMS', data.data)
        } catch (e) {

        } finally {
            commit('SET_LOADING', false)
        }
    },
    async fetchItem({commit}, id) {
        try {
            const {data} = await CategoriesRepository.findById(id)
            commit('SET_ITEM', data.data)
        } catch (e) {

        } finally {

        }
    },
    async createItem(ctx, payload) {
        try {
            await CategoriesRepository.store(payload)
            await router.push({name: 'categories.index'})
        } catch (e) {

        } finally {

        }
    },
    async updateItem(ctx, {payload, id}) {
        try {
            await CategoriesRepository.update(payload, id)
            await router.push({name: 'categories.index'})
        } catch (e) {

        } finally {

        }
    },
    async deleteItem({dispatch}, id) {
        try {
            await CategoriesRepository.destroy(id)
            dispatch('fetchItems')
        } catch (e) {

        } finally {

        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}