import { allure } from 'allure-mocha/dist/MochaAllureReporter';
import supertest from 'supertest';
import { urls } from '../config/index';
import { loadApiSpec, validate } from '../lib/validator';

const Todos = {
  get: async (token, format = 'application/json', accept = 'Accept') => {
    const response = await supertest(urls.challenge)
      .get('/todos')
      .set(accept, format)
      .set('X-CHALLENGER', token);
    allure.attachment('response', JSON.stringify(response.body), 'application/json');

    // eslint-disable-next-line max-len
    // const apiSpec = await loadApiSpec('../apichallenges.herokuapp/lib/Simple-Todo-List-swagger.json');

    const apiSpec = await loadApiSpec('https://apichallenges.herokuapp.com/docs/swagger');
    const schema = apiSpec.paths['/todos'].get.responses[200];
    validate(schema, response.body);

    return response;
  },

  status: async (token, status, format = 'application/json', accept = 'Accept') => {
    const response = await supertest(urls.challenge)
      .get(`/todos${status}`)
      .set(accept, format)
      .set('X-CHALLENGER', token);
    allure.attachment('response', JSON.stringify(response.body), 'application/json');

    const apiSpec = await loadApiSpec('https://apichallenges.herokuapp.com/docs/swagger');
    const schema = apiSpec.paths['/todos'].get.responses[200];
    validate(schema, response.body);

    return response;
  },

  post: async (body, token, format = 'application/json', contentType = 'application/json') => {
    const response = await supertest(urls.challenge)
      .post('/todos')
      .set('Content-Type', contentType)
      .set('Accept', format)
      .set('X-CHALLENGER', token)
      .send(body);
    allure.attachment('response', JSON.stringify(response.body), 'application/json');

    const apiSpec = await loadApiSpec('https://apichallenges.herokuapp.com/docs/swagger');
    const schema = apiSpec.paths['/todos'].post.responses[201];
    validate(schema, response.body);

    return response;
  },

  head: async (token) => {
    const response = await supertest(urls.challenge)
      .head('/todos')
      .set('X-CHALLENGER', token);
    allure.attachment('response', JSON.stringify(response.body), 'application/json');

    const apiSpec = await loadApiSpec('https://apichallenges.herokuapp.com/docs/swagger');
    const schema = apiSpec.paths['/todos'].head.responses[200];
    validate(schema, response.body);

    return response;
  },

  options: async (token) => {
    const response = await supertest(urls.challenge)
      .options('/todos')
      .set('X-CHALLENGER', token);
    allure.attachment('response', JSON.stringify(response.body), 'application/json');

    const apiSpec = await loadApiSpec('https://apichallenges.herokuapp.com/docs/swagger');
    const schema = apiSpec.paths['/todos'].options.responses[200];
    validate(schema, response.body);

    return response;
  },

};

export default Todos;
