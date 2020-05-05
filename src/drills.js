require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

console.log('knex and driver installed correctly');

const searchTerm = 'fish';

knexInstance
  .from('shopping_list')
  .select('name')
  .where('name', 'ILIKE', `%${searchTerm}%`)
  .then(results => {
    console.log(results);
  });