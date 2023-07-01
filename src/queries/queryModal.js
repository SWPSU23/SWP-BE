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
        createSheet: 'INSERT INTO `Sheet` (start_time, end_time, coefficient) VALUES (?, ?, ?)',

        getListSheet: 'SELECT * FROM `Sheet`',

        updateSheet: 'UPDATE `Sheet` SET ? WHERE `id` = ?',

        deleteSheet: 'DELETE FROM `Sheet` WHERE `id` = ?',

        getSheetDetail: 'SELECT * FROM `Sheet` WHERE `id` = ?'
    },
    Worksheet: {
        createWorksheet: 'INSERT INTO `Worksheet` WHERE (employee_id, sheet_id, day, status) VALUES (?, ?, ?, ?)',

        getListWorksheet: 'SELECT * FROM `Worksheet` WHERE day like %?%',

        updateWorksheet: 'UPDATE `Worksheet` SET ? WHERE `id` = ?',

        deleteWorksheet: 'DELETE FROM `Worksheet` WHERE `id` = ?',

        getWorksheetDetail: 'SELECT * FROM `Worksheet` WHERE `id` = ?'
    },

    CheckInOut: {
        createCheckInOut: 'INSERT INTO `CheckInOut` WHERE (employee_id, check_int_at, check_out_at, sheet_id) VALUES (?, ?, ?, ?)',

        getListCheckInOut: 'SELECT * FROM `CheckInOut`',

        updateCheckInOut: 'UPDATE `CheckInOut` SET ? WHERE `id` = ?',

        deleteCheckInOut: 'DELETE FROM `CheckInOut` WHERE `id` = ?',

        getCheckInOutDetail: 'SELECT * FROM `CheckInOut` WHERE `employee_id` = ?'
    },

    PayRoll: {
        createPayRoll: 'INSERT INTO `PayRoll` WHERE ' +
            '(employee_id, gross_pay, insurance, tax, net_pay, start_date, end_date, create_at, status)' +
            'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',

        getListPayRoll: 'SELECT * FROM `PayRoll`',

        updatePayRoll: 'UPDATE `PayRoll` SET ? WHERE `id` = ?',

        getPaySlip: 'SELECT * FROM `PayRoll` WHERE `employee_id` = ?'

    },

    LeaveManagement: {
        createLeaveForm: 'INSERT INTO `LeaveManagement` WHERE '
            + '(employee_id, number_of_leave_days_used, start_date_of_leave, end_date_of_leave, reason_leave, status)'
            + 'VALUES (?, ?, ?, ?, ?, ?)',

        getListLeaveForm: 'SELECT * FROM `LeaveManagement`',

        updateLeaveForm: 'UPDATE `LeaveManagement` SET ? WHERE `id` = ?',

        getDetailLeaveForm: 'SELECT * FROM `LeaveManagement` WHERE `employee_id` = ?'
    }
};
