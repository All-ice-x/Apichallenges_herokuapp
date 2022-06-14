import supertest from 'supertest';
import urls from '../config/urls';

const Todos = {
    get: async(token, path, format = 'application/json', accept = 'Accept') => {
        const response = await supertest(urls.challenge)
        .get(path)
        .set(accept, format)
        .set('X-CHALLENGER', token);
        return response;
    },

    post: async(body, path) => {
        const response = await supertest(urls.challenge)
        .post(path)
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
        return response;
    }
}; 


export default Todos;