import {initializeCommonState, commonGetters, commonMutations, commonActions} from "./commonStore.js";
import PagesRepository from "../../repository/PagesRepository.js";

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

            const {data} = await PagesRepository.getAll(getters.params);

            commit('SET_ITEMS', data.data)
            commit('SET_TOTAL', data.meta.total)
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