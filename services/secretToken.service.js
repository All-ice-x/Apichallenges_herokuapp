import { allure } from 'allure-mocha/dist/MochaAllureReporter';
import supertest from 'supertest';
import { urls } from '../config/index';
import { loadApiSpec, validate } from '../lib/validator';

const SecretToken = {
  post: async (authorization, token) => {
    const response = await supertest(urls.challenge)
      .post('/secret/token')
      .set('Authorization', authorization)
      .set('X-CHALLENGER', token);
    allure.attachment('response', JSON.stringify(response.body), 'application/json');

    const apiSpec = await loadApiSpec('https://apichallenges.herokuapp.com/docs/swagger');
    const schema = apiSpec.paths['/secret/token'].post.responses[201];
    validate(schema, response.body);

    return response;
  },
};

export default SecretToken;
