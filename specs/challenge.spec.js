import chai from 'chai';
import Challenger from '../services/challenger.service';
import Challenges from '../services/challenges.service';
import Todos from '../services/todos.service';
import Todo from '../services/todo.service';
import TodosId200 from '../services/todos{id}(200).service';
import TodosId404 from '../services/todos{id}(404).service';
import headTodos from '../services/headTodos(200).service';
import postTodos201 from '../services/postTodos(201).service';
import todosFilter from '../services/todosFilter(200).service';
import postTodos400 from '../services/postTodos(400).service';




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
    it ('Получить список заданий, 200', async () => {
        const r = await Challenges.get(token);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });

    it ('Получить все todos, 200', async () => {
        const r = await Todos.get(token);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });

    it ('Вызвать /todo, 404', async () => {
        const r = await Todo.get(token);
        assert.strictEqual(r.statusCode, 404, 'statusCode не 404');
    });

    it ('Получить todos по ID, 200', async () => {
        const r = await TodosId200.get(token);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });

    it ('Получить todos по ID, 404', async () => {
        const r = await TodosId404.get(token);
        assert.strictEqual(r.statusCode, 404, 'statusCode не 404');
    });

    it ('Получить HEAD /todos, 200', async () => {
        const r = await headTodos.head(token);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });

    it ('Создать todo, 201', async () => {
        const r = await postTodos201.post(token);
        assert.strictEqual(r.statusCode, 201, 'statusCode не 201');
    });

    it ('Отфильтровать todos по doneStatus, 200', async () => {
        const r = await todosFilter.get(token);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });

    it ('Получить ошибку по doneStatus на POST todos, 400', async () => {
        const r = await postTodos400.post(token);
        assert.strictEqual(r.statusCode, 400, 'statusCode не 400');
    });

});