/* eslint-disable no-multiple-empty-lines */
import chai from 'chai';
import { api } from '../services/index';
import { TodoBuilder } from '../fixtures/builder/index';

const { assert } = chai;

// Getting Started
// 01
describe('Отправляем сетевые запросы', () => {
  let token;
  before('Получить токен', async () => {
    const { headers } = await api().Challenger().post();
    token = headers['x-challenger'];
  });
  after('Посмотреть результат', async () => {
    console.log('Результаты смотреть здесь');
    console.log(`https://apichallenges.herokuapp.com/gui/challenges/${token}`);
  });

  // Challenges:
  // 02
  it('Получить список заданий, 200', async () => {
    const r = await api().Challenges().get(token);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });



  // 03 & 15 тест сломан нарочно
  it.only('Получить все todos (результат в формате JSON), 200', async () => {
        // console.log(body);
    // arr.forEach(item, i, arr);
    let count = 0;
    body.todos.forEach((item) => {
      if (item.title.lengh >= 5) { count += 1; }
      console.log(item);
    });
    assert.isAbove(count, 0, 'Нет задач с именем >= 5 символов');
    assert.strictEqual(statusCode, 200, 'statusCode не 200');
  });
    const { body, statusCode }  = await api().Todos().get(token);
    assert.strictEqual(r.statusCode, 400, 'statusCode не 200');
  });



