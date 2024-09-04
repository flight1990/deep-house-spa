import { ref } from 'vue';

export function useTreeData() {
    const processedData = ref([]);

    const processHierarchy = (items, level = 0) => {
        return items.map(item => {
            const formattedItem = {
                id: item.id,
                name: `${'-'.repeat(level)} ${item.name}`,
            };

            if (item.children && item.children.length > 0) {
                return [formattedItem, ...processHierarchy(item.children, level + 1)];
            } else {
                return formattedItem;
            }
        }).flat();
    };

    const setTree = (data) => {
        processedData.value = processHierarchy(data);
    };

    return {
        processedData,
        setTree
    };
}
