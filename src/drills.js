require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

console.log('knex and driver installed correctly');



function searchItems(searchTerm) {
  return knexInstance
    .select('name')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(results => {
      console.log(results);
    });
}

function paginateProducts(page) {
  const productsPerPage = 6;
  const offset = productsPerPage * (page - 1);
  return knexInstance
    .select('item_id', 'name', 'price', 'category')
    .from('shopping_list')
    .limit(productsPerPage)
    .offset(offset)
    .then(result => {
      console.log(result);
    });
} 

function addedAfter(daysAgo) {

  knexInstance
    .from('shopping_list')
    .select('item_id', 'name', 'price', 'category', 'date_added')
    .where(
      'date_added',
      '>',
      knexInstance.raw('now() - \'?? days\':: INTERVAL', daysAgo)
    )
    .then(results => {
      console.log('addedDaysAgo:', results);
    });
}

function categoryTotal() {
  return knexInstance
    .select('category')
    .sum('price')
    .from('shopping_list')
    .groupBy('category')
    .then(result => {
      console.log(result);
    });
}

searchItems('fish')
  .then(()=>paginateProducts(2))
  .then(()=>addedAfter(2))
  .then(()=>categoryTotal());

// dfknmsdf