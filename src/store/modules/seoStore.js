import {initializeCommonState, commonGetters, commonMutations, commonActions} from "./commonStore.js";
import SeoRepository from "../../repository/SeoRepository.js";
import router from "../../router/index.js";

const commonState = initializeCommonState();

const state = {
    ...commonState,
    params: {
        page: 1,
        limit:  10
    }
}

const getters = {
    ...commonGetters
}

const mutations = {
    ...commonMutations
}

const actions = {
    ...commonActions,
    async fetchItems({commit, getters}) {
        try {
            commit('SET_LOADING', true)

            const {data} = await SeoRepository.getAll(getters.params);

            commit('SET_ITEMS', data.data)
            commit('SET_TOTAL', data.meta.total)
        } catch (e) {

        } finally {
            commit('SET_LOADING', false)
        }
    },
    async fetchItem({commit}, id) {
        try {
            const {data} = await SeoRepository.findById(id)
            commit('SET_ITEM', data.data)
        } catch (e) {

        } finally {

        }
    },
    async createItem(ctx, payload) {
        try {
            await SeoRepository.store(payload)
            await router.push({name: 'seo.index'})
        } catch (e) {

        } finally {

        }
    },
    async updateItem(ctx, {payload, id}) {
        try {
            await SeoRepository.update(payload, id)
            await router.push({name: 'seo.index'})
        } catch (e) {

        } finally {

        }
    },
    async deleteItem({dispatch}, id) {
        try {
            await SeoRepository.destroy(id)
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