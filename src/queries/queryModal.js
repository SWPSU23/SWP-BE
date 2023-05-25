module.exports = {
    createProductDetail: 'INSERT INTO Product (name, description, unit, unit_price, stock, status, image, create_at, expired_at)'
        + 'VALUES (?,?,?,?,?,?,?,?,?)',
    getProductDetail: 'SELECT * FROM Product WHERE id = `?`',
};

