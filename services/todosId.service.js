import { allure } from 'allure-mocha/dist/MochaAllureReporter';
import supertest from 'supertest';
import urls from '../config/urls';
import { loadApiSpec, validate } from '../lib/validator';

const TodosId = {
    get: async(id, token, format = 'application/json', accept = 'Accept') => {
        const response = await supertest(urls.challenge)
        .get(`/todos/${id}`)
        .set(accept, format)
        .set('X-CHALLENGER', token);
        allure.attachment('response', JSON.stringify(response.body), 'application/json');
        
        const apiSpec = await loadApiSpec('https://apichallenges.herokuapp.com/docs/swagger');
        const schema = apiSpec.paths['/todos/:id'].get.responses[200];
        validate(schema, response.body);

        return response;
    },

    post: async(id, body, token, format = 'application/json', contentType = 'application/json') => {
        const response = await supertest(urls.challenge)
        .post(`/todos/${id}`)
        .set('Content-Type', contentType)
        .set('Accept', format)
        .set('X-CHALLENGER', token)
        .send(body);
        allure.attachment('response', JSON.stringify(response.body), 'application/json');

        const apiSpec = await loadApiSpec('https://apichallenges.herokuapp.com/docs/swagger');
        const schema = apiSpec.paths['/todos/:id'].post.responses[200];
        validate(schema, response.body);

        return response;
    },

    delete: async(id, token) => {
        const response = await supertest(urls.challenge)
        .delete(`/todos/${id}`)
        .set('X-CHALLENGER', token);
        allure.attachment('response', JSON.stringify(response.body), 'application/json');

        const apiSpec = await loadApiSpec('https://apichallenges.herokuapp.com/docs/swagger');
        const schema = apiSpec.paths['/todos/:id'].delete.responses[200];
        validate(schema, response.body);

        return response;
    }
}; 


export default TodosId;