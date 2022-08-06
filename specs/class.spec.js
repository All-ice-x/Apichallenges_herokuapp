/* eslint-disable max-classes-per-file */
import chai from 'chai';
import NewTodo from '../fixtures/builder/todoByClass';

const { assert } = chai;

describe('Это демо сьют', () => {
  it('Калькулятор', () => {
    class Animal {
      constructor(name, age) {
        this.age = age;
        this.color = 'black&white';
        this.name = name;
      }

      // eslint-disable-next-line indent, class-methods-use-this
    getSound() {
        console.log('Мрррр');
      }
    }
    const Cat = new Animal('Murl', 7);
    Cat.getSound();
    console.log(Cat);

    // eslint-disable-next-line no-unused-vars
    const Snake = new Animal('Caa', 33);

    class Casino {
      _win = 10;

      getBet(bet) {
        // eslint-disable-next-line no-underscore-dangle
        this._win += bet;
        // eslint-disable-next-line no-underscore-dangle
        console.log(this._win);
      }
    }

    const winner = new Casino();
    winner.getBet(100);
    const newTodo = new NewTodo(false);
    console.log(newTodo);

    class Hedgehog extends Animal {
      constructor(name, age) {
        super(name, age);
        this.legs = 4;
        this.color = 'blue';
      }
    }
    const hedgehog = new Hedgehog('Sonic', 10);
    console.log(hedgehog);

    // arrange
    const numberA = 1;

    // act + assert
    assert.strictEqual(numberA + 1, 2, 'a+1 не равно 2');
  });
});
