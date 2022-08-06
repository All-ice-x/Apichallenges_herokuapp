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
  it('Получить все todos (результат в формате JSON), 200', async () => {
    const r = await api().Todos().get(token);
    assert.strictEqual(r.statusCode, 400, 'statusCode не 200');
  });

  // 04
  it('Вызвать несуществующий endpoint /todo, 404', async () => {
    const r = await api().Todo().get(token);
    assert.strictEqual(r.statusCode, 404, 'statusCode не 404');
  });

  // 05
  it('Получить todo по ID, 200', async () => {
    const body = new TodoBuilder().setName().setDescription().setDoneStatus(false)
      .build();
    let r = await api().Todos().post(body, token);
    r = await api().TodosId().get(r.body.id, token);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  // 06
  it('Получить todo по ID, 404', async () => {
    const id = '0';
    const r = await api().TodosId().get(id, token);
    assert.strictEqual(r.statusCode, 404, 'statusCode не 404');
  });

  // 07
  it('Получить HEAD /todos, 200', async () => {
    const r = await api().Todos().head(token);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  // 08
  it('Создать todo, 201', async () => {
    const body = new TodoBuilder().setName().setDescription().setDoneStatus(true)
      .build();
    const r = await api().Todos().post(body, token);
    assert.strictEqual(r.statusCode, 201, 'statusCode не 201');
  });

  // 09
  it('Отфильтровать todos по doneStatus=true, 200', async () => {
    const status = '?doneStatus=true';
    const r = await api().Todos().status(token, status);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  // 10
  it('Получить ошибку по doneStatus на POST todo, 400', async () => {
    const body = new TodoBuilder().setName().setDescription().setDoneStatus('ok')
      .build();
    const r = await api().Todos().post(body, token);
    assert.strictEqual(r.statusCode, 400, 'statusCode не 400');
  });

  // 11
  it('Обновить данные в todos/{id}, 200', async () => {
    const body = new TodoBuilder().setName().setDescription().setDoneStatus(true)
      .build();
    let r = await api().Todos().post(body, token);
    r = await api().TodosId().post(r.body.id, body, token);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  // 12
  it('Удалить запись todos/{id}, 200', async () => {
    const body = new TodoBuilder().setName().setDescription().setDoneStatus(true)
      .build();
    let r = await api().Todos().post(body, token);
    r = await api().TodosId().delete(r.body.id, token);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  // 13
  it('Получить OPTIONS /todos, 200', async () => {
    const r = await api().Todos().options(token);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  // 14
  it('Получить все todos (результат в формате XML), 200', async () => {
    const format = 'application/xml';
    const r = await api().Todos().get(token, format);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    // console.log(r);
  });

  // 16
  it('Получить все todos (формат результата any), 200', async () => {
    const format = '*/*';
    const r = await api().Todos().get(token, format);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  // 17
  it('Получить все todos (предпочтительный формат результата XML), 200', async () => {
    const format = 'application/xml, application/json';
    const r = await api().Todos().get(token, format);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  // 18
  it('Получить все todos (no accept), 200', async () => {
    const accept = '';
    const r = await api().Todos().get(token, accept);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  // 19
  it('Получить все todos (некорректный header), 406', async () => {
    const format = 'application/gzip';
    const r = await api().Todos().get(token, format);
    assert.strictEqual(r.statusCode, 406, 'statusCode не 406');
  });

  // 20
  it('Создать todo (формат body XML), 201', async () => {
    const body = '<todo><doneStatus>true</doneStatus><title>another test todo</title><description>Create Todo (body: XML)</description></todo>';
    const format = 'application/xml';
    const contentType = 'application/xml';
    const r = await api().Todos().post(body, token, format, contentType);
    assert.strictEqual(r.statusCode, 201, 'statusCode не 201');
  });

  // 21
  it('Создать todo (формат body JSON), 201', async () => {
    const body = new TodoBuilder().setName().setDescription().setDoneStatus(true)
      .build();
    const r = await api().Todos().post(body, token);
    assert.strictEqual(r.statusCode, 201, 'statusCode не 201');
  });

  // 22
  it('Создать todo (формат contentType некорректен), 415', async () => {
    const body = '<todo><doneStatus>true</doneStatus><title>todo with unsupported content type</title></todo>';
    const format = 'application/xml';
    const contentType = 'application/qwe';
    const r = await api().Todos().post(body, token, format, contentType);
    assert.strictEqual(r.statusCode, 415, 'statusCode не 415');
  });

  // 23
  it('Создать todo c Content-Type "application/xml", но Accept "application/json", 400', async () => {
    const body = '<todo><doneStatus>true</doneStatus><title>todo with unsupported content type</title></todo>';
    const format = 'application/json';
    const contentType = 'application/xml';
    const r = await api().Todos().post(body, token, format, contentType);
    assert.strictEqual(r.statusCode, 201, 'statusCode не 201');
  });

  // 24
  it('Создать todo c Content-Type "application/json", но Accept "application/xml", 400', async () => {
    const body = new TodoBuilder().setName().setDescription().setDoneStatus(false)
      .build();
    const format = 'application/xml';
    const contentType = 'application/json';
    const r = await api().Todos().post(body, token, format, contentType);
    assert.strictEqual(r.statusCode, 201, 'statusCode не 201');
  });
});
