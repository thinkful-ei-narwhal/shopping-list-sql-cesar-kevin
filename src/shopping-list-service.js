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
  
  getById(db, item_id) {
    return db('shopping_list')
      .select('*')
      .where({ item_id })
      .first();
  },
  
  deleteById(db, item_id) {
    return db('shopping_list')
      .where({ item_id })
      .delete();
  },
  
  updateById(db, item_id, data) {
    return db('shopping_list')
      .where({ item_id })
      .update(data);
  }
};
  
module.exports = ShoppingListService;