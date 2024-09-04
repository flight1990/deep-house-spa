const createState = () => ({
    total: 0,
    loading: false,
    items: [],
    item: {},
    params: {}
});

export const initializeCommonState = () => {
    return createState();
};

export const commonGetters = {
    total: (state) => state.total,
    loading: (state) => state.loading,
    items: (state) => state.items,
    item: (state) => state.item,
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
    SET_ITEM(state, item) {
        state.item = item;
    },
    SET_UPDATED_ITEM(state, updatedItem) {
        state.items = state.items.map(item => item.id === updatedItem.id ? updatedItem : item)
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