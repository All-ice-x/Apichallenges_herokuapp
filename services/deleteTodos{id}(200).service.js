import supertest from 'supertest';
import urls from '../config/urls';


const DeleteTodosId200 = {
    delete: async() => {
        const response = await supertest(urls.challenge)
        .delete('/todos/946')
        .set('Accept', 'application/json')
        return response;
    }
}; 

export default DeleteTodosId200;