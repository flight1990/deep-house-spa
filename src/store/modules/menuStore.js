import {initializeCommonState, commonGetters, commonMutations, commonActions} from "./commonStore.js";
import MenuRepository from "../../repository/MenuRepository.js";
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
    async fetchItems({commit, getters}) {
        try {
            commit('SET_LOADING', true)

            const {data} = await MenuRepository.getAll(getters.params);
            commit('SET_ITEMS', data.data)
        } catch (e) {

        } finally {
            commit('SET_LOADING', false)
        }
    },
    async fetchItem({commit}, id) {
        try {
            const {data} = await MenuRepository.findById(id)
            commit('SET_ITEM', data.data)
        } catch (e) {

        } finally {

        }
    },
    async createItem(ctx, payload) {
        try {
            await MenuRepository.store(payload)
            await router.push({name: 'menu.index'})
        } catch (e) {

        } finally {

        }
    },
    async updateItem(ctx, {payload, id}) {
        try {
            await MenuRepository.update(payload, id)
            await router.push({name: 'menu.index'})
        } catch (e) {

        } finally {

        }
    },
    async deleteItem({dispatch}, id) {
        try {
            await MenuRepository.destroy(id)
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