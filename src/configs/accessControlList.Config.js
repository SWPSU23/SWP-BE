const accessControlList = {
    manager: {
        canCreate: ['employee', 'intern'],
        canRead: ['manager', 'employee', 'intern'],
        canUpdate: ['employee', 'intern'],
        canDelete: ['employee', 'intern'],
    },
    cashier: {
        canCreate: ['order', 'orderProduct'],
        canRead: ['order', 'orderProduct'],
        canUpdate: ['order', 'orderProduct'],
        canDelete: ['order', 'orderProduct'],
    },
    guard: {
        canCreate: ['checkInOut'],
        canRead: ['checkInOut'],
        canUpdate: ['checkInOut'],
        canDelete: ['checkInOut'],
    },
    authorizedUser: {
        canCreate: [
            'employee',
            'intern',
            'order',
            'orderProduct',
            'checkInOut',
        ],
        canRead: ['employee', 'intern', 'order', 'orderProduct', 'checkInOut'],
        canUpdate: [
            'employee',
            'intern',
            'order',
            'orderProduct',
            'checkInOut',
        ],
        canDelete: [
            'employee',
            'intern',
            'order',
            'orderProduct',
            'checkInOut',
        ],
    },
    unauthorizedUser: {
        canCreate: [],
        canRead: [],
        canUpdate: [],
        canDelete: [],
    },
}
module.exports = { accessControlList }
