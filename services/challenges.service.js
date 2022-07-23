import { allure } from 'allure-mocha/dist/MochaAllureReporter';
import supertest from 'supertest';
import urls from '../config/urls';
import { loadApiSpec, validate } from '../lib/validator';

const Challenges = {
  get: async (token) => {
    const response = await supertest(urls.challenge)
      .get('/challenges')
      .set('Accept', 'application/json')
      .set('X-CHALLENGER', token);
    allure.attachment('response', JSON.stringify(response.body), 'application/json');

    const apiSpec = await loadApiSpec('https://apichallenges.herokuapp.com/docs/swagger');
    const schema = apiSpec.paths['/challenges'].get.responses[200];
    validate(schema, response.body);

    return response;
  },
};

export default Challenges;
