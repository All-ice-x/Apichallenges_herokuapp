import supertest from 'supertest';
import urls from '../config/urls';

const Todo = {
    get: async(token, path, format = 'application/json', accept = 'Accept') => {
        const response = await supertest(urls.challenge)
        .get('/todo')
        .set('X-CHALLENGER', token);
        return response;
    }
};

export default Todo;