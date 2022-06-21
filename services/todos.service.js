import supertest from 'supertest';
import urls from '../config/urls';

const Todos = {
    get: async(token, format = 'application/json', accept = 'Accept') => {
        const response = await supertest(urls.challenge)
        .get('/todos')
        .set(accept, format)
        .set('X-CHALLENGER', token);
        return response;
    },

    status: async(token, status, format = 'application/json', accept = 'Accept') => {
        const response = await supertest(urls.challenge)
        .get(`/todos${status}`)
        .set(accept, format)
        .set('X-CHALLENGER', token);
        return response;
    },

    post: async(body, token, format = 'application/json', contentType = 'application/json') => {
        const response = await supertest(urls.challenge)
        .post('/todos')
        .set('Content-Type', contentType)
        .set('Accept', format)
        .set('X-CHALLENGER', token)
        .send(body);
        return response;
    },

    head: async(token) => {
        const response = await supertest(urls.challenge)
        .head('/todos')
        .set('X-CHALLENGER', token);
        return response;
    },

    options: async(token) => {
        const response = await supertest(urls.challenge)
        .options('/todos')
        .set('X-CHALLENGER', token);
        return response;
    },

    delete: async(path) => {
        const response = await supertest(urls.challenge)
        .delete(path)
        .set('X-CHALLENGER', token);
        return response;
    }
}; 


export default Todos;