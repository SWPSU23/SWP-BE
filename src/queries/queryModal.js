const queryModal = {
    createProductDetail: 'INSERT INTO Product (name, description, unit, unit_price, stock, status, image, create_at, expired_at)'
        + 'VALUES (?,?,?,?,?,?,?,?,?)'
};

module.exports = queryModal;

