const ShoppingListService = {
  getAllShoppingList(db) {
    return db('shopping_list')
      .select('*');
  },
  
  insertShoppingList(db, data) {
    return db('shopping_list')
      .insert(data)
      .returning('*')
      .then(rows => rows[0]);
  },
  
  getById(db, id) {
    return db('shopping_list')
      .select('*')
      .where({ id })
      .first();
  },
  
  deleteById(db, id) {
    return db('shopping_list')
      .where({ id })
      .delete();
  },
  
  updateById(db, id, data) {
    return db('shopping_list')
      .where({ id })
      .update(data);
  }
};
  
module.exports = ShoppingListService;