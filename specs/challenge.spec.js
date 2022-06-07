import chai from 'chai';
import Challenger from '../services/challenger.service';
import Challenges from '../services/challenges.service';
import Todos from '../services/todos.service';
import Todo from '../services/todo.service';
import TodosId200 from '../services/todos{id}(200).service';
import TodosId404 from '../services/todos{id}(404).service';
import HeadTodos from '../services/headTodos(200).service';
import PostTodos201 from '../services/postTodos(201).service';
import TodosFilter from '../services/todosFilter(200).service';
import PostTodos400 from '../services/postTodos(400).service';
import PostTodosId200 from '../services/postTodos{id}200.service';
import DeleteTodosId200 from '../services/deleteTodos{id}(200).service';
import OptionsTodos from '../services/optionsTodos(200).service';
import Todos200XML from '../services/todos200XML.service';

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

    it ('Получить все todos + результат в формате JSON, 200', async () => {
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
        const r = await HeadTodos.head(token);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });

    it ('Создать todo, 201', async () => {
        const r = await PostTodos201.post(token);
        assert.strictEqual(r.statusCode, 201, 'statusCode не 201');
    });

    it ('Отфильтровать todos по doneStatus, 200', async () => {
        const r = await TodosFilter.get(token);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });

    it ('Получить ошибку по doneStatus на POST todos, 400', async () => {
        const r = await PostTodos400.post(token);
        assert.strictEqual(r.statusCode, 400, 'statusCode не 400');
    });

    it ('Обновить данные в todos/{id}, 200', async () => {
        const r = await PostTodosId200.post(token);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });

    it ('Удалить запись todos/{id}, 200', async () => {
        const r = await DeleteTodosId200.delete(token);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });

    it ('Получить OPTIONS /todos, 200', async () => {
        const r = await OptionsTodos.options(token);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });
    
    it ('Получить результат в формате XML /todos, 200', async () => {
        const r = await Todos200XML.get(token);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });
});