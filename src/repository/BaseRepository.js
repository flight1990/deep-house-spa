import axios from 'axios';

export default class BaseRepository {
    constructor(resource) {
        if (!resource) {
            throw new Error('Resource is required');
        }

        this.baseURL = import.meta.env.VITE_API_BASE_URL;
        this.baseHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }

        this.apiClient = axios.create({
            baseURL: this.baseURL,
            headers: this.baseHeaders
        });

        this.RESOURCE = resource;
    }

    getAll(params) {
        return this.apiClient.get(this.RESOURCE, { params });
    }

    findById(id) {
        return this.apiClient.get(`${this.RESOURCE}/${id}`);
    }

    store(payload) {
        return this.apiClient.post(this.RESOURCE, payload);
    }

    update(payload, id) {
        return this.apiClient.patch(`${this.RESOURCE}/${id}`, payload);
    }

    destroy(id) {
        return this.apiClient.delete(`${this.RESOURCE}/${id}`);
    }
}