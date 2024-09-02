import BaseRepository from './BaseRepository.js';

const RESOURCE = '/admin/products';

class ProductsRepository extends BaseRepository {
    constructor() {
        super(RESOURCE);
    }
}

export default new ProductsRepository();