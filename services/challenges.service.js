import { allure } from 'allure-mocha/dist/MochaAllureReporter';
import supertest from 'supertest';
import urls from '../config/urls';

const Challenges = {
    get: async(token) => {
        const response = await supertest(urls.challenge)
        .get('/challenges')
        .set('Accept', 'application/json')
        .set('X-CHALLENGER', token);
        allure.attachment('response', JSON.stringify(response.body), 'application/json');
        return response;
    }
}; 

export default Challenges;