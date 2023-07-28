module.exports = {
    Product: {
        createProductDetail:
            'INSERT INTO Product' +
            '(name, description, unit, cost_price, stock, retail_price, revenue_price, category, status, image, create_at, expired_at)' +
            'VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',

        getListProduct: (page_index) => {
            return (
                `SELECT *, (SELECT COUNT(*) FROM Product) AS page` +
                ` FROM Product` +
                ` ORDER BY status ASC,expired_at ASC` +
                ` LIMIT 10 OFFSET ${(page_index - 1) * 10}`
            )
        },

        updateProductByID: 'UPDATE Product SET ?  WHERE id =?',

        deleteProductByID: "UPDATE Product SET status = 'unavailable' WHERE id =?",

        getProductByID: 'SELECT * FROM Product WHERE id = ?',

        searchProductBy: (searchBy, keywords) => {
            return `SELECT * FROM Product WHERE ${searchBy} LIKE '%${keywords}%' `
                + ` ORDER BY status ASC, expired_at ASC`
        },
    },

    Category: {
        createCategory: 'INSERT INTO Category (name) VALUES (?)',

        getListCategory: 'SELECT * FROM Category',

        updateCategory: 'UPDATE Category SET ? WHERE name = ?',

        deleteCategory: 'DELETE FROM Category WHERE name = ?',
    },

    Employee: {
        createEmployeeDetail:
            'INSERT INTO Employee' +
            '(name, age, email_address, password, phone, base_salary, role, status, leave_day_of_year)' +
            'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',

        getListEmployee: (page_index) => {
            return (
                `SELECT *, (SELECT COUNT(*) FROM Employee) AS page` +
                ` FROM Employee` +
                ` ORDER BY status ASC, role ASC` +
                ` LIMIT 10 OFFSET ${(page_index - 1) * 10}`
            )
        },

        getEmployeeDetails: 'SELECT * FROM Employee WHERE id = ?',

        updateEmployeeDetail: 'UPDATE Employee SET ? WHERE id = ?',

        deleteEmployeeDetail: "UPDATE Employee SET status = 'retired' WHERE id = ?",

        searchEmployeeBy: (searchBy, keywords) => {
            return `SELECT * FROM Employee WHERE ${searchBy} LIKE '%${keywords}%' ` +
                `ORDER BY status ASC`
        },
    },

    Order: {
        createOrder:
            'INSERT INTO `Order`' +
            '(employee_id, product_quantity, total_price, create_at, status)' +
            ' VALUES (?, ?, ?, ?, ?)',

        getListOrder: (page_index) => {
            return (
                `SELECT o.*, e.name AS cashier_name, (SELECT COUNT(*) FROM \`Order\`) AS page` +
                ` FROM \`Order\` o JOIN Employee e ON o.employee_id = e.id ` +
                `ORDER BY o.status ASC, o.create_at ASC ` +
                `LIMIT 10 OFFSET ${(page_index - 1) * 10}`
            )
        },

        getDetailOrder:
            'SELECT o.id,e.id, e.name, o.total_price  FROM `Order` o ' +
            ' JOIN Employee e ON o.employee_id = e.id' +
            ' WHERE `id` = ?',

        deleteOrder: "UPDATE `Order` SET status = 'failed' WHERE id = ?",

        updateOrder: 'UPDATE `Order` SET ? WHERE id = ?',

        searchOrderBy: (searchBy, keywords) => {
            return `SELECT * FROM 'Order' WHERE ${searchBy} LIKE '%${keywords}%' ORDER BY created_at ASC`
        },
    },

    OrderProduct: {
        createOrderProduct:
            'INSERT INTO `OrderProduct` ' +
            '(order_id, product_id, quantity, unit_price, total)' +
            ' VALUE (?, ?, ?, ?, ?)',

        getListDetailOrder:
            'SELECT op.id, p.id AS product_id, p.name, p.unit, op.unit_price, op.quantity, op.total' +
            ', o.id AS order_id, e.id AS employee_id, e.name AS employee_name, o.total_price' +
            ' FROM `OrderProduct` op ' +
            ' JOIN Product p ON op.product_id = p.id' +
            ' JOIN `Order` o ON op.order_id = o.id' +
            ' JOIN Employee e ON o.employee_id = e.id' +
            ' WHERE `order_id` = ?',

        updateStockProduct:
            `SELECT op.product_id, op.quantity, p.stock` +
            ` FROM \`OrderProduct\` op JOIN Product p ON op.product_id = p.id `,

        updateOrderProduct: 'UPDATE `OrderProduct` SET ? WHERE `id` = ?',

        deleteOrderProduct: 'DELETE FROM `OrderProduct` WHERE `id` = ?',
    },

    Sheet: {
        createSheet:
            'INSERT INTO `Sheet` (start_time, end_time, coefficient) VALUES (?, ?, ?)',

        getListSheet: 'SELECT * FROM `Sheet`',

        updateSheet: 'UPDATE `Sheet` SET ? WHERE `id` = ?',

        deleteSheet: 'DELETE FROM `Sheet` WHERE `id` = ?',

        getSheetDetail: 'SELECT * FROM `Sheet` WHERE `id` = ?',
    },

    Worksheet: {
        createWorksheet:
            'INSERT INTO `Worksheet` (employee_id, sheet_id, date, status) VALUES (?, ?, ?, ?)',

        getWorkSheetOfWeek: (start_day, end_day, role) => {
            return (
                `SELECT ws.*, e.name AS employee_name , e.role AS employee_role` +
                ` FROM Worksheet ws ` +
                ` JOIN Employee e ON ws.employee_id = e.id ` +
                ` WHERE ws.date BETWEEN '${start_day}' AND '${end_day}' AND e.role = '${role}' ` +
                ` ORDER BY ws.date ASC`
            )
        },

        getWorkSheetOfWeekEmployee: (start_day, end_day, employee_id) => {
            return (
                `SELECT ws.* FROM Worksheet ws` +
                ` JOIN Employee e ON ws.employee_id = e.id ` +
                ` WHERE date BETWEEN '${start_day}' AND '${end_day}' AND e.id = ${employee_id}`
            )
        },

        getWorkSheetByDateAndEmployee: (employee_id, date) => {
            return (
                `SELECT ws.*, s.start_time, s.end_time, c.check_in_at, c.check_out_at FROM Worksheet ws` +
                ` JOIN Sheet s ON s.id = ws.sheet_id ` +
                ` JOIN Employee E on ws.employee_id = E.id AND E.role = s.role` +
                ` JOIN CheckInOut c ON ws.id = c.worksheet_id` +
                ` WHERE ws.date = '${date} 00:00:00' AND ws.employee_id = ${employee_id}`
            )
        },

        updateWorksheet: 'UPDATE `Worksheet` SET ? WHERE `id` = ?',

        deleteWorksheet: 'DELETE FROM `Worksheet` WHERE `id` = ?',

        getWorksheetDetail:
            'SELECT ws.*, e.name AS employee_name, e.base_salary, c.check_in_at, c.check_out_at ' +
            ' FROM `Worksheet` ws' +
            ' JOIN `CheckInOut` c ON ws.id = c.worksheet_id' +
            ' JOIN `Employee` e ON ws.employee_id = e.id' +
            ' WHERE ws.id = ?',

        getCoefficient:
            'SELECT s.coefficient, c.isSpecialDay ' +
            ' FROM `Worksheet` ws ' +
            ' JOIN `Sheet` s on ws.sheet_id = s.id' +
            ' Join Calendar c on ws.date = c.date' +
            ' WHERE ws.sheet_id = ? AND ws.id = ? AND s.role = ? ',

        checkRoleHasWorksheetInSheet:
            `SELECT * FROM Worksheet` +
            ` Join Employee E on Worksheet.employee_id = E.id` +
            ` WHERE E.role = ? AND Worksheet.date = ? AND Worksheet.sheet_id = ?`
        ,

        checkEmployeeHasWorksheetInSheet:
            `SELECT * FROM Worksheet` +
            ` Join Employee E on Worksheet.employee_id = E.id` +
            ` WHERE E.id = ? AND Worksheet.date = ? AND Worksheet.sheet_id = ?`,


    },

    CheckInOut: {
        createCheckInOut:
            'INSERT INTO `CheckInOut` ' +
            '(employee_id, worksheet_id) VALUES (?, ?)',

        getListCheckInOut: 'SELECT * FROM `CheckInOut`',

        updateCheckInOut: 'UPDATE `CheckInOut` SET ? WHERE `worksheet_id` = ?',

        deleteCheckInOut: 'DELETE FROM `CheckInOut` WHERE `worksheet_id` = ?',

        getCheckInOutDetail:
            'SELECT * FROM `CheckInOut` WHERE `employee_id` = ?',

        searchCheckInOutBy: (searchBy, keywords) => {
            return `SELECT * FROM 'CheckInOut' WHERE ${searchBy} LIKE '%${keywords}%'`
        },
    },

    Salary: {
        createSalary:
            ' INSERT INTO `Salary`' +
            ' (worksheet_id, base_salary, tax, date, hours, total, status)' +
            ' VALUES (?, ?, ?, ?, ?, ?, ?)',

        getPayRoll: (start_day, end_day) => {
            return `Select e.id as employee_id, e.name, e.role, s.base_salary, s.tax, s.hours, s.total, s.date, s.status` +
                ` FROM Salary s ` +
                ` JOIN Worksheet ws ON s.worksheet_id = ws.id` +
                ` JOIN Employee e ON ws.employee_id = e.id` +
                ` WHERE s.date BETWEEN '${start_day}' AND '${end_day}' ` +
                ` ORDER BY s.date ASC`
        },

        getPaySlipDetails: (employee_id, start_day, end_day) => {
            return `Select e.id as employee_id, ws.coefficient, e.name, e.role, s.base_salary, s.tax, s.hours, s.total, s.date, s.status` +
                ` FROM Salary s ` +
                ` JOIN Worksheet ws ON s.worksheet_id = ws.id` +
                ` JOIN Employee e ON ws.employee_id = e.id` +
                ` WHERE ws.employee_id = ${employee_id} ` +
                ` AND s.date BETWEEN '${start_day}' AND '${end_day}' ` +
                ` ORDER BY s.date ASC`
        }
    },

    LeaveManagement: {
        createLeaveForm:
            'INSERT INTO `LeaveManagement`' +
            '(employee_id, number_of_leave_days_used, start_date_of_leave, end_date_of_leave, reason_leave, status, manager_replied)' +
            'VALUES (?, ?, ?, ?, ?, ?, ?)',

        getListLeaveForm: (page_index) => {
            return (
                `SELECT *, (SELECT COUNT(*) FROM LeaveManagement) AS page` +
                ` FROM LeaveManagement` +
                ` ORDER BY status ASC, start_date_of_leave ASC` +
                ` LIMIT 10 OFFSET ${(page_index - 1) * 10} `
            )
        },

        updateLeaveForm: 'UPDATE `LeaveManagement` SET ? WHERE `id` = ?',

        getLeaveFormByEmployee:
            'SELECT * FROM `LeaveManagement` WHERE `employee_id` = ?',

        getLeaveFormById: 'SELECT * FROM `LeaveManagement` WHERE `id` = ?',
    },

    Calendar: {
        createCalendar:
            'INSERT INTO `Calendar` (date, isSpecialDay) VALUES (?, ?)',

        getDayCalendar: (start_day, end_day) => {
            return `SELECT * FROM Calendar WHERE date BETWEEN '${start_day}' AND '${end_day}' `
        },

        updateCalendar: 'UPDATE `Calendar` SET ? WHERE `date` = ?',

        getCalendar: 'SELECT * FROM `Calendar`',

        getListMonthOfYear: "SELECT DATE_FORMAT(date, '%Y-%m') AS month_year" +
            " FROM Calendar" +
            " GROUP BY DATE_FORMAT(date, '%Y-%m')" +
            " ORDER BY DATE_FORMAT(date, '%Y-%m') ASC",

        getListDayOfMonthYear: (month_year) => {
            return (
                `SELECT * FROM Calendar` +
                ` WHERE DATE_FORMAT(date, '%Y-%m') = '${month_year}'` +
                ` ORDER BY date ASC`
            )
        }
    },

    Auth: {
        login: 'SELECT * FROM Employee WHERE phone = ?',
    },

    Validate: {
        checkEmail: 'SELECT * FROM Employee WHERE email_address = ?',

        checkPhone: 'SELECT * FROM Employee WHERE phone = ?',
    },

    Schedule: {
        getWorkSheetOfDayByRole: (role, date, sheet_id) => {
            return ` SELECT ws.*, s.start_time, s.end_time, c.check_in_at, c.check_out_at FROM Worksheet ws` +
                ` JOIN Sheet s ON ws.sheet_id = s.id` +
                ` JOIN CheckInOut c ON ws.id = c.worksheet_id` +
                ` WHERE ws.date = '${date} 00:00:00' AND s.role = '${role}' AND ws.sheet_id = ${sheet_id} `
        },

        getListProduct: `SELECT * FROM Product WHERE status = 'available' AND stock > 0`,
    }
}