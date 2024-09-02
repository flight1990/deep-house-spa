import { computed } from 'vue';
import { useStore } from 'vuex';

export function useStoreModule(moduleName) {
    const store = useStore();

    const getState = (getter) => computed(() => store.getters[`${moduleName}/${getter}`]);
    const commitMutation = (mutation, payload) => store.commit(`${moduleName}/${mutation}`, payload);
    const dispatchAction = (action, payload) => store.dispatch(`${moduleName}/${action}`, payload);

    return {
        getState,
        commitMutation,
        dispatchAction
    };
}