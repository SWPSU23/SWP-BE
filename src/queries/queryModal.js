module.exports = {
    createProductDetail: 'INSERT INTO Product'
        + '(name, description, unit, unit_price, stock, status, image, create_at, expired_at)'
        + 'VALUES (?,?,?,?,?,?,?,?,?)',
    getListProduct: 'SELECT * FROM Product',

    updateProductByID: 'UPDATE Product SET'
        + 'name =?, description =?, unit =?, unit_price =?, stock =?, status =?, image =?, expired_at =? WHERE id =?',

    deleteProductByID: 'DELETE FROM Product WHERE id =?',

    getProductByID: 'SELECT * FROM Product WHERE id = ?',

    createEmployeeDetail: 'INSERT INTO Employee'
        + '(name, age, email_address, password, phone, base_salary, role)'
        + 'VALUES (?, ?, ?, ?, ?, ?, ?)',

    getListEmployee: 'SELECT * FROM Employee',
};

