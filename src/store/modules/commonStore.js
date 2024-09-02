const createState = () => ({
    total: 0,
    loading: false,
    items: [],
    params: {
        page: 1,
        limit: 10
    }
});

export const initializeCommonState = () => {
    return createState();
};

export const commonGetters = {
    total: (state) => state.total,
    loading: (state) => state.loading,
    items: (state) => state.items,
    params: (state) => state.params,
};

export const commonMutations = {
    SET_TOTAL(state, total) {
        state.total = total;
    },
    SET_LOADING(state, loading) {
        state.loading = loading;
    },
    SET_ITEMS(state, items) {
        state.items = items;
    },
    SET_PARAMS(state, params) {
        state.params = params;
    },
};

export const commonActions = {
    setParams({commit}, params) {
        commit('SET_PARAMS', params);
    },
};