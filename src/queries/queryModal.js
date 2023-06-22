module.exports = {
    Product: {
        createProductDetail: 'INSERT INTO Product'
            + '(name, description, unit, unit_price, stock, status, image, create_at, expired_at)'
            + 'VALUES (?,?,?,?,?,?,?,?,?)',
        getListProduct: 'SELECT * FROM Product ORDER BY expired_at ASC',

        updateProductByID: 'UPDATE Product SET ?  WHERE id =?',

        deleteProductByID: "UPDATE Product SET status = 'out of stock' WHERE id =?",

        getProductByID: 'SELECT * FROM Product WHERE id = ?',

        searchProductBy: (searchBy, keywords) => {
            return `SELECT * FROM Product WHERE ${searchBy} LIKE '%${keywords}%' ORDER BY expired_at ASC`
        }
    },
    Employee: {
        createEmployeeDetail: 'INSERT INTO Employee'
            + '(name, age, email_address, password, phone, base_salary, role, status)'
            + 'VALUES (?, ?, ?, ?, ?, ?, ?, ?)',

        getListEmployee: 'SELECT * FROM Employee',

        getEmployeeDetails: 'SELECT * FROM Employee WHERE id = ?',

        updateEmployeeDetail: "UPDATE Employee SET ? WHERE id = ?",

        deleteEmployeeDetail: "UPDATE Employee SET status = 'retired' WHERE id = ?",
    },

    Order: {
        createOrder: 'INSERT INTO `Order`'
            + '(employee_id, create_at, status)'
            + ' VALUES (?, ?, ?)',

        getListOrder: 'SELECT * FROM `Order`',

        deleteOrder: 'UPDATE `Order` SET status = `failed` WHERE id = ?',

        updateOrder: 'UPDATE `Order` SET ? WHERE id = ?',

        searchOrderBy: (searchBy, keywords) => {
            return `SELECT * FROM Product WHERE ${searchBy} LIKE '%${keywords}%' ORDER BY created_at ASC`;
        }
    },

    OrderProduct: {
        createListOrderProduct: 'INSERT INTO `OrderProduct` '
            + '(order_id, product_id, quantity, price)'
            + ' VALUES ?',

        getDetailListOrder: 'SELECT * FROM `OrderProduct` WHERE `order_id` = ?',

        updateOrderProduct: 'UPDATE `OrderProduct` SET ? WHERE `product_id` = ? and `order_id` = ?',

        deleteOrderProduct: 'DELETE FROM `OrderProduct` WHERE `product_id` = ? and `order_id` = ?',
    }
};
