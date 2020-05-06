const knex = require('knex');
const ShoppingListService = require('../src/shopping-list-service');

describe('shopping-list-service object',() =>{

  const testList = [
    {
      name:'Fish tricks',
      price: 13.10,
      category:'Main',
      checked: false,
      date_added: new Date('2029-01-22T16:28:32.615Z')
    },
    {
      name:'Not Dogs',
      price: 4.99,
      category:'Snack',
      checked: true,
      date_added: new Date('2029-01-22T16:28:32.615Z')
    },
    {
      name:'Bluffalo Wings',
      price: 5.50,
      category:'Snack',
      checked: false,
      date_added: new Date('2029-01-22T16:28:32.615Z')
    }
  ];

  let db;

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
  });

  before(() => db('shopping_list').truncate());

  afterEach(() => db('shopping_list').truncate());

  after(() => db.destroy());

});