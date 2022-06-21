import supertest from 'supertest';
import urls from '../config/urls';

const TodosId = {
    get: async(id, token, format = 'application/json', accept = 'Accept') => {
        const response = await supertest(urls.challenge)
        .get(`/todos/${id}`)
        .set(accept, format)
        .set('X-CHALLENGER', token);
        return response;
    },

    post: async(id, body, token, format = 'application/json', contentType = 'application/json') => {
        const response = await supertest(urls.challenge)
        .post(`/todos/${id}`)
        .set('Content-Type', contentType)
        .set('Accept', format)
        .set('X-CHALLENGER', token)
        .send(body);
        return response;
    },

    delete: async(id, token) => {
        const response = await supertest(urls.challenge)
        .delete(`/todos/${id}`)
        .set('X-CHALLENGER', token);
        return response;
    }
}; 


export default TodosId;