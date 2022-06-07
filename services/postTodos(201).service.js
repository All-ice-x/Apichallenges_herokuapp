import supertest from 'supertest';
import urls from '../config/urls';


const PostTodos201 = {
    post: async() => {
        const response = await supertest(urls.challenge)
        .post('/todos')
        .send({"title": "some test todo","doneStatus": true,"description": "some test todo"})
        .set('Accept', 'application/json');
        return response;
    }
}; 

export default PostTodos201;