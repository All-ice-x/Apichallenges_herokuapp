import chai from 'chai';
import Challenger from '../services/challenger.service';
import Challenges from '../services/challenges.service';
import Todos from '../services/todos.service';

const assert = chai.assert;

describe.only ('Отправляем сетевые запросы', () => {
    let token;
    before ('Получить токен', async () => {
        const response = await Challenger.post();
        token = response.headers['x-challenger'];

        after ('Посмотреть результат', async () => {
            console.log('Результаты смотреть здесь');
            console.log(`https://apichallenges.herokuapp.com/gui/challenges/${token}`);
            });
    });

    /* 
    получаем {id} для последующего использования в методах:
    get todos/{id};
    post todos/{id}; 
    delete todos/{id}.
    */

    let id; 
    before ('Создать запись todo', async () => {
        let body = {
            "title": "some test todo",
            "doneStatus": true,
            "description": "some test todo 123"
        };
        let path = '/todos';
        const r = await Todos.post(body, path);
        id = r._body["id"];
    });


// тесты:

    it ('Получить список заданий, 200', async () => {
        const r = await Challenges.get(token);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });


    it ('Получить все todos (результат в формате JSON), 200', async () => {
        let path = '/todos';
        const r = await Todos.get(token, path);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });

    it ('Вызвать несуществующий endpoint /todo, 404', async () => {
        let path = '/todo';
        const r = await Todos.get(token, path);
        assert.strictEqual(r.statusCode, 404, 'statusCode не 404');
    });

    it ('Получить todo по ID, 200', async () => {
        let path = `/todos/${id}`;
        const r = await Todos.get(token, path);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });

    it ('Получить todo по ID, 404', async () => {
        let path = '/todos/0';
        const r = await Todos.get(token, path);
        assert.strictEqual(r.statusCode, 404, 'statusCode не 404');
    });

    it ('Получить HEAD /todos, 200', async () => {
        const r = await Todos.head(token);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });

    it ('Создать todo, 201', async () => {
        let body = {
            "title": "some test todo",
            "doneStatus": true,
            "description": "some test todo 123"
        };
        let path = '/todos';
        const r = await Todos.post(body, path);
        assert.strictEqual(r.statusCode, 201, 'statusCode не 201');
    });

    it ('Отфильтровать todos по doneStatus=true, 200', async () => {
        let path = '/todos?doneStatus=true';
        const r = await Todos.get(token, path);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });

    it ('Получить ошибку по doneStatus на POST todo, 400', async () => {
        let body = {
            "title": "some test todo",
            "doneStatus": "ok",
            "description": "some test todo 111"
        };
        let path = '/todos';
        const r = await Todos.post(body, path);
        assert.strictEqual(r.statusCode, 400, 'statusCode не 400');
    });

    it ('Обновить данные в todos/{id}, 200', async () => {
        let path = `/todos/${id}`;
        let body = {
            "title": "UPDATE some test todo",
            "doneStatus": true,
            "description": "some test todo update"
        };
        const r = await Todos.post(body, path);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });

    it ('Удалить запись todos/{id}, 200', async () => {
        let path = `/todos/${id}`;
        const r = await Todos.delete(path);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });

    it ('Получить OPTIONS /todos, 200', async () => {
        const r = await Todos.options(token);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });
    
    it ('Получить все todos (результат в формате XML), 200', async () => {
        let path = '/todos';
        let format = 'application/xml';
        const r = await Todos.get(token, path, format);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
       // console.log(r);
    });
    
    it ('Получить все todos (формат результата any), 200', async () => {
        let path = '/todos';
        let format = '*/*';
        const r = await Todos.get(token, path, format);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });

    it ('Получить все todos (предпочтительный формат результата XML), 200', async () => {
        let path = '/todos';
        let format = 'application/xml, application/json';
        const r = await Todos.get(token, path, format);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });

    it ('Получить все todos (no accept), 200', async () => {
        let path = '/todos';
        let accept = '';
        const r = await Todos.get(token, path, accept);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });

    it ('Получить все todos (некорректный header), 406', async () => {
        let path = '/todos';
        let format = 'application/gzip';
        const r = await Todos.get(token, path, format);
        assert.strictEqual(r.statusCode, 406, 'statusCode не 406');
    });

    it ('Создать todo (формат body XML), 201', async () => {
        let path = '/todos';
        let body = 
            '<todo><doneStatus>true</doneStatus><title>another test todo</title><description>Create Todo (body: XML)</description></todo>';
        let format = 'application/xml'
        let contentType = 'application/xml';
        const r = await Todos.post(body, path, format, contentType);
        assert.strictEqual(r.statusCode, 201, 'statusCode не 201');
    });

    it ('Создать todo (формат body JSON), 201', async () => {
        let path = '/todos';
        let body = {
            "title": "Create test todo (body: JSON)",
            "doneStatus": true,
            "description": "Create test todo (body: JSON)"
        };
        const r = await Todos.post(body, path);
        assert.strictEqual(r.statusCode, 201, 'statusCode не 201');
    });

    it ('Создать todo (формат body некорректен), 415', async () => {
        let path = '/todos';
        let body = '<todo><doneStatus>true</doneStatus><title>todo with unsupported content type</title></todo>';
        let format = 'application/xml'
        let contentType = 'application/qwe';
        const r = await Todos.post(body, path, format, contentType);
        assert.strictEqual(r.statusCode, 415, 'statusCode не 415');
    });

});