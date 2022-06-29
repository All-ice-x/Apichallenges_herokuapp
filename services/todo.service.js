import { allure } from 'allure-mocha/dist/MochaAllureReporter';
import supertest from 'supertest';
import urls from '../config/urls';

const Todo = {
    get: async(token, path, format = 'application/json', accept = 'Accept') => {
        const response = await supertest(urls.challenge)
        .get('/todo')
        .set('X-CHALLENGER', token);
        allure.attachment('response', JSON.stringify(response.body), 'application/json');


        return response;
    }
};

export default Todo;