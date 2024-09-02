import BaseRepository from './BaseRepository.js';

const RESOURCE = '/admin/seo';

class SeoRepository extends BaseRepository {
    constructor() {
        super(RESOURCE);
    }
}

export default new SeoRepository();