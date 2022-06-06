import supertest from 'supertest';
import urls from '../config/urls';

const TodosId404 = {
    get: async(token) => {
        const response = await supertest(urls.challenge)
        .get('/todos/0')
        .set('Accept', 'application/json')
        .set('X-CHALLENGER', token);
        return response;
    }
}; 

export default TodosId404;