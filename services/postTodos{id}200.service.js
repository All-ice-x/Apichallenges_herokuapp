import supertest from 'supertest';
import urls from '../config/urls';


const PostTodosId200 = {
    post: async() => {
        const response = await supertest(urls.challenge)
        .post('/todos/950')
        .send({"description": "updating description"})
        .set('Accept', 'application/json');
        return response;
    }
}; 

export default PostTodosId200;