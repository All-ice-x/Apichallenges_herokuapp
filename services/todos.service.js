import supertest from 'supertest';
import urls from '../config/urls';

const Todos = {
    get: async(token) => {
        const response = await supertest(urls.challenge)
        .get('/todos')
        .set('Accept', 'application/json')
        .set('X-CHALLENGER', token);
        return response;
    },

    post: async() => {
        const response = await supertest(urls.challenge)
        .post('/todos')
        .send({"title": "some test todo","doneStatus": true,"description": "some test todo"});
        return response;
    },

    get: async(token) => {
        const response = await supertest(urls.challenge)
        .get('/todos?doneStatus=true')
        .set('Accept', 'application/xml')
        .set('X-CHALLENGER', token);
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

    post: async() => {
        const response = await supertest(urls.challenge)
        .post('/todos')
        .send({"title": "some test todo","doneStatus": "ok","description": "some test todo"})
        return response;
    }


}; 

export default Todos;