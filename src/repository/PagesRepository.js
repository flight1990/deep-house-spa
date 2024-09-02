import BaseRepository from './BaseRepository.js';

const RESOURCE = '/admin/pages';

class PagesRepository extends BaseRepository {
    constructor() {
        super(RESOURCE);
    }
}

export default new PagesRepository();