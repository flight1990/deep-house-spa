import BaseRepository from './BaseRepository.js';

const RESOURCE = '/admin/menu';

class MenuRepository extends BaseRepository {
    constructor() {
        super(RESOURCE);
    }
}

export default new MenuRepository();