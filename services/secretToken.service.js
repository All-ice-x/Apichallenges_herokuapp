import { allure } from 'allure-mocha/dist/MochaAllureReporter';
import supertest from 'supertest';
import { urls } from '../config/index';

const SecretToken = {
  post: async (auth, token) => {
    const response = await supertest(urls.challenge)
      .post('/secret/token')
      .set('Authorization', auth)
      .set('X-CHALLENGER', token);
    allure.attachment('response', JSON.stringify(response.body), 'application/json');

    return response;
  },
};

export default SecretToken;
