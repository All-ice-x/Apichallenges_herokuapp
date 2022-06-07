import supertest from 'supertest';
import urls from '../config/urls';

const Todos200XML = {
    get: async(token) => {
        const response = await supertest(urls.challenge)
        .get('/todos')
        .set('Accept', 'application/xml')
        .set('X-CHALLENGER', token);
        return response;
    }
}; 

export default Todos200XML;