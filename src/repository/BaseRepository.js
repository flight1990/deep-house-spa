import apiClient from './index';

export default class BaseRepository {
    constructor(resource) {
        if (!resource) {
            throw new Error('Resource is required');
        }
        this.RESOURCE = resource;
    }

    getAll(params) {
        return apiClient.get(this.RESOURCE, { params });
    }

    findById(id) {
        return apiClient.get(`${this.RESOURCE}/${id}`);
    }

    store(payload) {
        return apiClient.post(this.RESOURCE, payload);
    }

    update(payload, id) {
        return apiClient.patch(`${this.RESOURCE}/${id}`, payload);
    }

    destroy(id) {
        return apiClient.delete(`${this.RESOURCE}/${id}`);
    }
}