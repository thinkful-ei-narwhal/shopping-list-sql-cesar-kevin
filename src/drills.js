require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

console.log('knex and driver installed correctly');

function paginateProducts(page) {
  const productsPerPage = 6 ;
  const offset = productsPerPage * (page - 1);
  knexInstance
    .select('item_id', 'name', 'price', 'category')
    .from('shopping_list')
    .limit(productsPerPage)
    .offset(offset)
    .then(result => {
      console.log(result);
    });
}
  
paginateProducts(2);

knexInstance
  .select('category')
  .sum('price')
  .from('shopping_list')
  .groupBy('category')
  .then(result => {
    console.log(result);
  });
