import BaseRepository from './BaseRepository.js';

const RESOURCE = '/admin/categories';

class CategoriesRepository extends BaseRepository {
    constructor() {
        super(RESOURCE);
    }
}

export default new CategoriesRepository();