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
  it('#02 - Получить список заданий, 200', async () => {
    const r = await api().Challenges().get(token);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  // 03&15
  it('#03&15 - Получить все todos (результат в формате JSON), 200', async () => {
    const r = await api().Todos().get(token);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  // 04
  it('#04 - Вызвать несуществующий endpoint /todo, 404', async () => {
    const r = await api().Todo().get(token);
    assert.strictEqual(r.statusCode, 404, 'statusCode не 404');
  });

  // 05
  it('#05 - Получить todo по ID, 200', async () => {
    const body = new TodoBuilder().setName().setDescription().setDoneStatus(false)
      .build();
    let r = await api().Todos().post(body, token);
    r = await api().TodosId().get(r.body.id, token);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  // 06
  it('#06 - Получить todo по ID, 404', async () => {
    const id = '0';
    const r = await api().TodosId().get(id, token);
    assert.strictEqual(r.statusCode, 404, 'statusCode не 404');
  });

  // 07
  it('#07 - Получить HEAD /todos, 200', async () => {
    const r = await api().Todos().head(token);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  // 08
  it('#08 - Создать todo, 201', async () => {
    const body = new TodoBuilder().setName().setDescription().setDoneStatus(true)
      .build();
    const r = await api().Todos().post(body, token);
    assert.strictEqual(r.statusCode, 201, 'statusCode не 201');
  });

  // 09
  it('#09 - Отфильтровать todos по doneStatus=true, 200', async () => {
    const status = '?doneStatus=true';
    const r = await api().Todos().status(token, status);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  // 10
  it('#10 - Получить ошибку по doneStatus на POST todo, 400', async () => {
    const body = new TodoBuilder().setName().setDescription().setDoneStatus('ok')
      .build();
    const r = await api().Todos().post(body, token);
    assert.strictEqual(r.statusCode, 400, 'statusCode не 400');
  });

  // 11
  it('#11 - Обновить данные в todos/{id}, 200', async () => {
    const body = new TodoBuilder().setName().setDescription().setDoneStatus(true)
      .build();
    let r = await api().Todos().post(body, token);
    r = await api().TodosId().post(r.body.id, body, token);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  // 12
  it('#12 - Удалить запись todos/{id}, 200', async () => {
    const body = new TodoBuilder().setName().setDescription().setDoneStatus(true)
      .build();
    let r = await api().Todos().post(body, token);
    r = await api().TodosId().delete(r.body.id, token);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  // 13
  it('#13 - Получить OPTIONS /todos, 200', async () => {
    const r = await api().Todos().options(token);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  // 14
  it('#14 - Получить все todos (результат в формате XML), 200', async () => {
    const format = 'application/xml';
    const r = await api().Todos().get(token, format);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  // 16
  it('#16 - Получить все todos (формат результата any), 200', async () => {
    const format = '*/*';
    const r = await api().Todos().get(token, format);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  // 17
  it('#17 - Получить все todos (предпочтительный формат результата XML), 200', async () => {
    const format = 'application/xml, application/json';
    const r = await api().Todos().get(token, format);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  // 18
  it('#18 - Получить все todos (no accept), 200', async () => {
    const accept = '';
    const r = await api().Todos().get(token, accept);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  // 19
  it('#19 - Получить все todos (некорректный header), 406', async () => {
    const format = 'application/gzip';
    const r = await api().Todos().get(token, format);
    assert.strictEqual(r.statusCode, 406, 'statusCode не 406');
  });

  // 20
  it('#20 - Создать todo (формат body XML), 201', async () => {
    const body = '<todo><doneStatus>true</doneStatus><title>another test todo</title><description>Create Todo (body: XML)</description></todo>';
    const format = 'application/xml';
    const contentType = 'application/xml';
    const r = await api().Todos().post(body, token, format, contentType);
    assert.strictEqual(r.statusCode, 201, 'statusCode не 201');
  });

  // 21
  it('#21 - Создать todo (формат body JSON), 201', async () => {
    const body = new TodoBuilder().setName().setDescription().setDoneStatus(true)
      .build();
    const r = await api().Todos().post(body, token);
    assert.strictEqual(r.statusCode, 201, 'statusCode не 201');
  });

  // 22
  it('#22 - Создать todo (формат contentType некорректен), 415', async () => {
    const body = '<todo><doneStatus>true</doneStatus><title>todo with unsupported content type</title></todo>';
    const format = 'application/xml';
    const contentType = 'application/qwe';
    const r = await api().Todos().post(body, token, format, contentType);
    assert.strictEqual(r.statusCode, 415, 'statusCode не 415');
  });

  // 23
  it('#23 - Создать todo c Content-Type "application/xml", но Accept "application/json", 400', async () => {
    const body = '<todo><doneStatus>true</doneStatus><title>todo with unsupported content type</title></todo>';
    const format = 'application/json';
    const contentType = 'application/xml';
    const r = await api().Todos().post(body, token, format, contentType);
    assert.strictEqual(r.statusCode, 201, 'statusCode не 201');
  });

  // 24
  it('#24 - Создать todo c Content-Type "application/json", но Accept "application/xml", 400', async () => {
    const body = new TodoBuilder().setName().setDescription().setDoneStatus(false)
      .build();
    const format = 'application/xml';
    const contentType = 'application/json';
    const r = await api().Todos().post(body, token, format, contentType);
    assert.strictEqual(r.statusCode, 201, 'statusCode не 201');
  });

  // 25
  it('#25 - Получить ошибку "405 Method Not Allowed" для метода DELETE в /heartbeat, 405', async () => {
    const r = await api().Heartbeat().delete(token);
    assert.strictEqual(r.statusCode, 405, 'statusCode не 405');
  });

  // 26
  it('#26 - Получить ошибку "500 Internal Server Error" для метода PATCH в /heartbeat, 500', async () => {
    const r = await api().Heartbeat().patch(token);
    assert.strictEqual(r.statusCode, 500, 'statusCode не 500');
  });

  // 27
  it('#27 - Получить ошибку "501 Not Implemented" для метода TRACE в /heartbeat, 501', async () => {
    const r = await api().Heartbeat().trace(token);
    assert.strictEqual(r.statusCode, 501, 'statusCode не 501');
  });

  // 28
  it('#28 - Получить ответ "204 No Content" для метода GET в /heartbeat, 204', async () => {
    const r = await api().Heartbeat().get(token);
    assert.strictEqual(r.statusCode, 204, 'statusCode не 204');
  });

  // 29
  it('#29 - Получить ошибку "401 Unauthorized" в /secret/token, 401', async () => {
    const authorization = 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=';
    const r = await api().SecretToken().post(authorization, token);
    assert.strictEqual(r.statusCode, 401, 'statusCode не 401');
  });

  // 30
  it('#30 - Успешная аутентификация  в /secret/token, 201', async () => {
    const authorization = 'Basic YWRtaW46cGFzc3dvcmQ=';
    const r = await api().SecretToken().post(authorization, token);
    assert.strictEqual(r.statusCode, 201, 'statusCode не 201');
  });

  // 31
  it('#31 - Получить ошибку "403 Forbidden" в GET /secret/note, 403', async () => {
    const auth = 'some token';
    const r = await api().SecretNote().get(token, auth);
    assert.strictEqual(r.statusCode, 403, 'statusCode не 403');
  });

  // 32
  it('#32 - Получить ошибку "401 Unauthorized" в GET /secret/note, 401', async () => {
    const r = await api().SecretNote().getNoAuth(token);
    assert.strictEqual(r.statusCode, 401, 'statusCode не 401');
  });

  // 33
  it('#33 - Получить данные в /secret/note, 200', async () => {
    const authorization = 'Basic YWRtaW46cGFzc3dvcmQ=';
    let r = await api().SecretToken().post(authorization, token);
    const auth = r.header['x-auth-token'];
    r = await api().SecretNote().get(token, auth);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  // 34
  it('#34 - Создать заметку в /secret/note, 200', async () => {
    const authorization = 'Basic YWRtaW46cGFzc3dvcmQ=';
    let r = await api().SecretToken().post(authorization, token);
    const auth = r.header['x-auth-token'];
    const payload = { note: 'my note' };
    r = await api().SecretNote().post(token, payload, auth);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  // 35
  it('#35 - Получить ошибку "401 Unauthorized" в POST /secret/note, 401', async () => {
    const payload = { note: 'my note' };
    const r = await api().SecretNote().postNoAuth(token, payload);
    assert.strictEqual(r.statusCode, 401, 'statusCode не 401');
  });

  // 36
  it('#36 - Получить ошибку "403 Forbidden" в POST /secret/note, 403', async () => {
    const auth = 'some token';
    const payload = { note: 'my note' };
    const r = await api().SecretNote().post(token, payload, auth);
    assert.strictEqual(r.statusCode, 403, 'statusCode не 403');
  });

  // 37
  it('#37 - Получить данные в /secret/note c Bearer token, 200', async () => {
    const authorization = 'Basic YWRtaW46cGFzc3dvcmQ=';
    let r = await api().SecretToken().post(authorization, token);
    const auth = r.header['x-auth-token'];
    r = await api().SecretNote().getBearer(token, auth);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  // 38
  it('#38 - Создать заметку в /secret/note c Bearer token, 200', async () => {
    const authorization = 'Basic YWRtaW46cGFzc3dvcmQ=';
    let r = await api().SecretToken().post(authorization, token);
    const auth = r.header['x-auth-token'];
    const payload = { note: 'my note' };
    r = await api().SecretNote().postBearer(token, payload, auth);
    assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
  });

  // 39
  it('#39 - Удалить ВСЕ записи todos/{id}, 200', async () => {
    let r = await api().Todos().get(token);
    r.body.todos.forEach((item) => {
      api().TodosId().delete(item.id, token);
    });
    r = await api().Todos().get(token);
    assert.isEmpty(r.body.todos, 'Есть неудалённые todo');
  });
});
