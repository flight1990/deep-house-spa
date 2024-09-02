import {initializeCommonState, commonGetters, commonMutations, commonActions} from "./commonStore.js";
import CategoriesRepository from "../../repository/CategoriesRepository.js";

const commonState = initializeCommonState();

const state = {
    ...commonState
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

            const {data} = await CategoriesRepository.getAll(getters.params);
            commit('SET_ITEMS', data.data)
        } catch (e) {

        } finally {
            commit('SET_LOADING', false)
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