import { faker } from '@faker-js/faker';

export default class NewTodo {
  constructor(doneStatus) {
    this.description = faker.lorem.text();
    this.doneStatus = doneStatus;
    this.title = faker.internet.domainName();
  }
}
