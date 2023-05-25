module.exports = {
    createProductDetail: 'INSERT INTO Product (name, description, unit, unit_price, stock, status, image, create_at, expired_at)'
        + 'VALUES (?,?,?,?,?,?,?,?,?)',
    getListProduct: 'SELECT * FROM Product',
};

