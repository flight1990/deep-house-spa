import BaseRepository from './BaseRepository.js';

const RESOURCE = '/admin/reviews';

class ReviewsRepository extends BaseRepository {
    constructor() {
        super(RESOURCE);
    }
}

export default new ReviewsRepository();