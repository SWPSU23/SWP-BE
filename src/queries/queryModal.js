module.exports = {
    Product: {
        createProductDetail: 'INSERT INTO Product'
            + '(name, description, unit, unit_price, stock, status, image, create_at, expired_at)'
            + 'VALUES (?,?,?,?,?,?,?,?,?)',

        getListProduct: (page_index) => {
            return `SELECT * FROM Product LIMIT 10 OFFSET ${(page_index - 1) * 10}`
        },

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

        getListEmployee: (page_index) => {
            return `SELECT * FROM Employee LIMIT 10 OFFSET ${(page_index - 1) * 10}`
        },

        getEmployeeDetails: 'SELECT * FROM Employee WHERE id = ?',

        updateEmployeeDetail: "UPDATE Employee SET ? WHERE id = ?",

        deleteEmployeeDetail: "UPDATE Employee SET status = 'retired' WHERE id = ?",

        searchEmployeeBy: (searchBy, keywords) => {
            return `SELECT * FROM Employee WHERE ${searchBy} LIKE '%${keywords}%'`
        }
    },

    Order: {
        createOrder: 'INSERT INTO `Order`'
            + '(employee_id, create_at, status)'
            + ' VALUES (?, ?, ?)',

        getListOrder: 'SELECT * FROM `Order`',

        deleteOrder: 'UPDATE `Order` SET status = `failed` WHERE id = ?',

        updateOrder: 'UPDATE `Order` SET ? WHERE id = ?',

        searchOrderBy: (searchBy, keywords) => {
            return `SELECT * FROM 'Order' WHERE ${searchBy} LIKE '%${keywords}%' ORDER BY created_at ASC`;
        }
    },

    OrderProduct: {
        createListOrderProduct: 'INSERT INTO `OrderProduct` '
            + '(order_id, product_id, quantity, price)'
            + ' VALUE ?',

        getListDetailOrder: 'SELECT * FROM `OrderProduct` WHERE `order_id` = ?',

        updateOrderProduct: 'UPDATE `OrderProduct` SET ? WHERE `id` = ?',

        deleteOrderProduct: 'DELETE FROM `OrderProduct` WHERE `id` = ?',
    },

    Sheet: {
        createSheet: 'INSERT INTO `Sheet` WHERE (start_time, end_time, coficient) VALUES (?, ?, ?)',

        getListSheet: 'SELECT * FROM `Sheet`',

        updateSheet: 'UPDATE `Sheet` SET ? WHERE `id` = ?',

        deleteSheet: 'DELETE FROM `Sheet` WHERE `id` = ?',

        getSheetDetail: 'SELECT * FROM `Sheet` WHERE `id` = ?'
    }
};
