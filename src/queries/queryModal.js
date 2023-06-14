module.exports = {
    products: {
        Product: {
        createProductDetail:
            'INSERT INTO Product' +
                '(name, description, unit, unit_price, stock, status, image, create_at, expired_at)' +
                'VALUES (?,?,?,?,?,?,?,?,?)',
            getListProduct: 'SELECT * FROM Product ORDER BY expired_at ASC',

        updateProductByID: 'UPDATE Product SET ?  WHERE id =?',

        deleteProductByID: 'DELETE FROM Product WHERE id =?',

        getProductByID: 'SELECT * FROM Product WHERE id = ?',

    getProductValidate: "SELECT * FROM Product WHERE name = ? AND expired_at = ?",
    // Employee
    createEmployeeDetail: 'INSERT INTO Employee'
        + '(name, age, email_address, password, phone, base_salary, role)'
        + 'VALUES (?, ?, ?, ?, ?, ?, ?)',

        getListEmployee: 'SELECT * FROM Employee',

        getEmployeeDetails: 'SELECT * FROM Employee WHERE id = ?',

    updateEmployeeDetail: "UPDATE Employee SET ? WHERE id = ?",

    deleteEmployeeDetail: "DELETE FROM Employee WHERE id = ?",
};

