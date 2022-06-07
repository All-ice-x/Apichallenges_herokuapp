import supertest from 'supertest';
import urls from '../config/urls';

const OptionsTodos = {
    options: async(token) => {
        const response = await supertest(urls.challenge)
        .options('/todos')
        .set('Accept', 'application/json')
        .set('X-CHALLENGER', token);
        return response;
    }
}; 

export default OptionsTodos;