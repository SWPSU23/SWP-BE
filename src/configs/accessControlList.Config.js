module.exports = {
    product: {
        'create': ['manager'],
        'update': ['manager'],
        'delete': ['manager'],
        'read': ['manager', 'cashier']
    },
    employee: {
        'create': ['manager'],
        'update': ['manager'],
        'delete': ['manager'],
        'read': ['manager', 'cashier'],
        'readDetail': ['manager', 'cashier', 'guard'],
    },
    order: {
        'create': ['cashier', 'manager'],
        'update': ['cashier', 'manager'],
        'delete': ['cashier', 'manager'],
        'read': ['cashier', 'manager']
    },
    orderProduct: {
        'read': ['cashier', 'manager'],
    },
    checkInOut: {
        'update': ['manager', 'cashier', 'guard'],
    },
    worksheet: {
        'create': ['manager'],
        'update': ['manager'],
        'delete': ['manager'],
        'read': ['manager'],
        'readDetail': ['manager', 'cashier', 'guard']
    },
    leaveForm: {
        'create': ['manager', 'cashier', 'guard'],
        'update': ['manager'],
        'delete': ['manager', 'cashier', 'guard'],
        'readAll': ['manager'],
        'readDetail': ['manager', 'cashier', 'guard']
    },
    asset: {
        'create': ['manager'],
        'read': ['manager']
    },
    salary: {
        'readPaySlip': ['manager', 'cashier', 'guard'],
        'readPayRoll': ['manager'],
    },
    category: {
        'read': ['manager', 'cashier', 'guard'],
        'create': ['manager'],
        'update': ['manager'],
        'delete': ['manager']
    }

}

