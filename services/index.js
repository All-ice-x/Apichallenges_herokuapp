import Challenger from './challenger.service';
import Challenges from './challenges.service';
import Todo from './todo.service';
import Todos from './todos.service';
import TodosId from './todosId.service';
import Heartbeat from './heartbeat.service';
import SecretToken from './secretToken.service';
import SecretNote from './secretNote.service';

const api = () => ({
  Challenger: () => ({ ...Challenger }),
  Challenges: () => ({ ...Challenges }),
  Todo: () => ({ ...Todo }),
  Todos: () => ({ ...Todos }),
  TodosId: () => ({ ...TodosId }),
  Heartbeat: () => ({ ...Heartbeat }),
  SecretToken: () => ({ ...SecretToken }),
  SecretNote: () => ({ ...SecretNote }),
});

export { api };
