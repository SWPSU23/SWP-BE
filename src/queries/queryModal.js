module.exports = {
    createProductDetail: 'INSERT INTO Product (name, description, unit, unit_price, stock, status, image, create_at, expired_at)'
        + 'VALUES (?,?,?,?,?,?,?,?,?)',
    getListProduct: 'SELECT * FROM Product',
    updateProduct: 'UPDATE Product SET name =?, description =?, unit =?, unit_price =?, stock =?, status =?, image =?, expired_at =? WHERE id =?',
    deleteProduct: 'DELETE FROM Product WHERE id =?',
    getProductDetail: 'SELECT * FROM Product WHERE id = ?',
};

