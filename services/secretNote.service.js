import { allure } from 'allure-mocha/dist/MochaAllureReporter';
import supertest from 'supertest';
import { urls } from '../config/index';
import { loadApiSpec, validate } from '../lib/validator';

const SecretNote = {
  get: async (token, auth) => {
    const response = await supertest(urls.challenge)
      .get('/secret/note')
      .set('X-CHALLENGER', token)
      .set('X-AUTH-TOKEN', auth);
    allure.attachment('response', JSON.stringify(response.body), 'application/json');

    const apiSpec = await loadApiSpec('https://apichallenges.herokuapp.com/docs/swagger');
    const schema = apiSpec.paths['/secret/note'].get.responses[200];
    validate(schema, response.body);

    return response;
  },

  post: async (token, payload, auth) => {
    const response = await supertest(urls.challenge)
      .post('/secret/note')
      .set('X-AUTH-TOKEN', auth)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('X-CHALLENGER', token)
      .send(payload);
    allure.attachment('response', JSON.stringify(response.body), 'application/json');

    const apiSpec = await loadApiSpec('https://apichallenges.herokuapp.com/docs/swagger');
    const schema = apiSpec.paths['/secret/note'].post.responses[200];
    validate(schema, response.body);

    return response;
  },

  getNoAuth: async (token) => {
    const response = await supertest(urls.challenge)
      .get('/secret/note')
      .set('X-CHALLENGER', token);
    allure.attachment('response', JSON.stringify(response.body), 'application/json');

    const apiSpec = await loadApiSpec('https://apichallenges.herokuapp.com/docs/swagger');
    const schema = apiSpec.paths['/secret/note'].get.responses[401];
    validate(schema, response.body);

    return response;
  },

  postNoAuth: async (token, payload) => {
    const response = await supertest(urls.challenge)
      .post('/secret/note')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('X-CHALLENGER', token)
      .send(payload);
    allure.attachment('response', JSON.stringify(response.body), 'application/json');

    const apiSpec = await loadApiSpec('https://apichallenges.herokuapp.com/docs/swagger');
    const schema = apiSpec.paths['/secret/note'].post.responses[401];
    validate(schema, response.body);

    return response;
  },

  getBearer: async (token, auth) => {
    const response = await supertest(urls.challenge)
      .get('/secret/note')
      .set('X-CHALLENGER', token)
      .auth(auth, { type: 'bearer' });
    allure.attachment('response', JSON.stringify(response.body), 'application/json');

    const apiSpec = await loadApiSpec('https://apichallenges.herokuapp.com/docs/swagger');
    const schema = apiSpec.paths['/secret/note'].get.responses[200];
    validate(schema, response.body);

    return response;
  },

  postBearer: async (token, payload, auth) => {
    const response = await supertest(urls.challenge)
      .post('/secret/note')
      .auth(auth, { type: 'bearer' })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('X-CHALLENGER', token)
      .send(payload);
    allure.attachment('response', JSON.stringify(response.body), 'application/json');

    const apiSpec = await loadApiSpec('https://apichallenges.herokuapp.com/docs/swagger');
    const schema = apiSpec.paths['/secret/note'].post.responses[200];
    validate(schema, response.body);

    return response;
  },
};

export default SecretNote;
