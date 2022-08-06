import { allure } from 'allure-mocha/dist/MochaAllureReporter';
import supertest from 'supertest';
import { urls } from '../config/index';

const Challenger = {
  post: async () => {
    const response = await supertest(urls.challenge)
      .post('/challenger')
      .set('Accept', 'application/json');

    allure.attachment('response', JSON.stringify(response.body), 'application/json');

    return response;
  },
};

export default Challenger;
