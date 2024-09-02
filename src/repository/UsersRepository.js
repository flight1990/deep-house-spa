import BaseRepository from './BaseRepository.js';

const RESOURCE = '/admin/users';

class UsersRepository extends BaseRepository {
    constructor() {
        super(RESOURCE);
    }
}

export default new UsersRepository();