import supertest from 'supertest';
import urls from '../config/urls';

const Todos = {
    get: async(token) => {
        const response = await supertest(urls.challenge)
        .get('/todos')
        .set('Accept', 'application/json')
        .set('X-CHALLENGER', token);
        return response;
    }
}; 

export default Todos;