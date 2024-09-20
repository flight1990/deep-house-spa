import {initializeCommonState, commonGetters, commonMutations, commonActions} from "./commonStore.js";
import UsersRepository from "../../repository/UsersRepository.js";
import router from "../../router/index.js";

const commonState = initializeCommonState();

const state = {
    ...commonState,
    params: {
        page: 1,
        limit:  5
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
    async fetchItems({commit, getters}, params = null) {
        try {
            commit('SET_LOADING', true)

            if (params) {
                commit('SET_PARAMS', params)
            }

            const {data} = await UsersRepository.getAll(getters.params);

            commit('SET_ITEMS', data.data)
            commit('SET_TOTAL', data.meta.total)
        } catch (e) {

        } finally {
            commit('SET_LOADING', false)
        }
    },
    async fetchItem({commit}, id) {
        try {
            const {data} = await UsersRepository.findById(id)
            commit('SET_ITEM', data.data)
        } catch (e) {

        } finally {

        }
    },
    async createItem(ctx, payload) {
        try {
            await UsersRepository.store(payload)
            await router.push({name: 'users.index'})
        } catch (e) {

        } finally {

        }
    },
    async updateItem(ctx, {payload, id}) {
        try {
            await UsersRepository.update(payload, id)
            await router.push({name: 'users.index'})
        } catch (e) {

        } finally {

        }
    },
    async deleteItem({dispatch}, id) {
        try {
            await UsersRepository.destroy(id)
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