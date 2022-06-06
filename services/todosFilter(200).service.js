import supertest from 'supertest';
import urls from '../config/urls';

const todosFilter = {
    get: async(token) => {
        const response = await supertest(urls.challenge)
        .get('/todos?doneStatus=true')
        .set('Accept', 'application/json')
        .set('X-CHALLENGER', token);
        return response;
    }
}; 

export default todosFilter;