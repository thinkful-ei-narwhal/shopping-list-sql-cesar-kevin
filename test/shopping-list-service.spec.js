const knex = require('knex');
const ShoppingListService = require('../src/shopping-list-service');

describe('shopping-list-service object',() =>{

  const testList = [
    {
      name:'Fish tricks',
      price: '13.10',
      category:'Main',
      checked: false,
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      item_id: 1
    },
    {
      name:'Not Dogs',
      price: '4.99',
      category:'Snack',
      checked: true,
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      item_id: 2
    },
    {
      name:'Bluffalo Wings',
      price: '5.50',
      category:'Snack',
      checked: false,
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      item_id: 3
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

 
  context('with data present', () => {
    beforeEach('insert test list', () =>
      db('shopping_list')
        .insert(testList)
    );

    it(`getAllArticles() resolves all articles from 'shopping_list' table`,()=>{
      return ShoppingListService
        .getAllShoppingList(db)
        .then(items => expect(items).to.eql(testList));
    });
  });


  context(`Given no data`, () => {
    it(`getAllShoppingList() resolves an empty array`, () => {
      return ShoppingListService
        .getAllShoppingList(db)
        .then(actual => {
          expect(actual).to.eql([])
        })
    })

    it(`insertShoppingList() inserts a new item and resolves the new item with an ID`, () => {
      const newItem = {
        name:'Fish tricks',
        price: '13.10',
        category:'Main',
        checked: false,
        date_added: new Date('2029-01-22T16:28:32.615Z'),
      }

      return ShoppingListService.insertShoppingList(db, newItem)
    })
  })
  //// getAllShoppingList() finished



});