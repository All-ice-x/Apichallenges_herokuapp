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
  // it('Получить список заданий, 200', async () => {
  // const r = await api().Challenges().get(token);
  // assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  // });

  // 03 & 15
  it('Получить все todos (результат в формате JSON), 200', async () => {
    const { body, statusCode } = await api().Todos().get(token);
    let count = 0;
    body.todos.forEach((item) => {
      if (item.title.length >= 5) { count += 1; }
    });

    body.todos.forEach((item, index, array) => {
      console.log(`${JSON.stringify(item)} имеет позицию ${index} в массиве ${JSON.stringify(array)}`);
      console.log('Здесь могла бы быть ваша рекалама');

      assert.strictEqual(item.doneStatus, false, 'Есть незавершённые задачи');
    });

    assert.isAbove(count, 0, 'Нет задач с именем >= 5 символов');
    assert.strictEqual(statusCode, 200, 'statusCode не 200');
  });

  it('Проверить, что в массиве нет чётных чисел', () => {
    const numbers = [1, 3, 5, 7, 9, 11, 12];
    const hasEvenNumber = numbers.some((item) => item % 2 === 0);
    assert.strictEqual(hasEvenNumber, false, 'В массиве есть чётные числа');
  });

  it('Проверить, что в челлендже нет 36 задачи', async () => {
    const { body } = await api().Challenges().get(token);
    console.log(body.challenges);
    const has40Number = body.challenges.some((item) => item.id === '36');
    assert.strictEqual(has40Number, false, 'В массиве есть 36 задача');
  });

  it('Проверить, что в массиве нет чётных чисел, вариант 2', () => {
    const numbers = [1, 3, 5, 7, 9, 11, 13, 14];
    assert.strictEqual(numbers.some((item) => item % 2 === 0), false, 'В массиве есть чётные числа');
  });

  it('Вывести имена животных', () => {
    // const pets = ['dog', 'cat', 'fish', 'cow', 'snake', 'hedgehog'];
    // const n = pets.map((item) => item.length);
    const pets = [
      {
        name: 'Boba',
        id: 'dog',
      },
      {
        name: 'Murl',
        id: 'cat',
      },
      {
        name: 'Goldy',
        id: 'fish',
      },
      {
        name: 'Buryonka',
        id: 'cow',
      },
      {
        name: 'Caa',
        id: 'snake',
      },
      {
        name: 'Pit',
        id: 'hedgehog',
      },
    ];
    const n = pets.map((item) => item.name);
    console.log(n);
    assert.strictEqual(1, 1, '1');
  });
});
